// src/services/scheduler.ts
import { Bot } from "grammy";
import cron from "node-cron";

import { REMINDER_MS, SCHEDULER_CRON } from "../config";
import { fetchUpcomingContests } from "./api";
import type { Contest } from "./api";
import { getSubscribers } from "./subscription";

interface Reminder {
    contestId: string;
    title: string;
    when: "24h" | "1h";
    timeToFire: Date;
}

// Чтобы не шлать дублирующие напоминания
const sentReminders = new Set<string>();

/**
 * Запускает cron‑задачу, которая каждые 30 минут
 * проверяет, есть ли контесты за 24h или 1h до старта,
 * и шлёт всем подписавшимся соответствующее уведомление.
 */
export function initScheduler(bot: Bot): void {
    cron.schedule(SCHEDULER_CRON, async () => {
        const now = new Date();
        const contests: Contest[] = await fetchUpcomingContests();
        const reminders: Reminder[] = [];

        for (const c of contests) {
            const diff = c.startTime.getTime() - now.getTime();

            // проверяем «окно» ±5 минут вокруг 24h и 1h
            if (Math.abs(diff - REMINDER_MS.DAY) <= 5 * 60 * 1000) {
                reminders.push({ contestId: c.id, title: c.title, when: "24h", timeToFire: c.startTime });
            }
            if (Math.abs(diff - REMINDER_MS.HOUR) <= 5 * 60 * 1000) {
                reminders.push({ contestId: c.id, title: c.title, when: "1h", timeToFire: c.startTime });
            }
        }

        for (const r of reminders) {
            const key = `${r.contestId}-${r.when}`;
            if (sentReminders.has(key)) continue;

            const subs = getSubscribers(r.contestId);
            const message =
                r.when === "24h"
                    ? `🔔 Напоминание: соревнование «${r.title}» стартует через 24 часа!`
                    : `⏰ Напоминание: соревнование «${r.title}» стартует через 1 час!`;

            for (const chatId of subs) {
                await bot.api.sendMessage(chatId, message);
            }

            sentReminders.add(key);
        }
    });
}
