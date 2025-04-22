import { Bot } from "grammy";
import cron from "node-cron";

import { SCHEDULER_CRON } from "../config";
import { logger } from "../utils/logger";
import { fetchNotificationEvents } from "./api";

const NOTIFICATION_WINDOW = 15 * 60 * 1000;
const sentReminders = new Set<string>();

type ReminderType = "DAY" | "HOUR";

function getReminderKey(eventId: string, type: ReminderType): string {
    return `${eventId}-${type}`;
}

function shouldNotify(diff: number, targetMs: number): boolean {
    return Math.abs(diff - targetMs) <= NOTIFICATION_WINDOW;
}

export function initScheduler(bot: Bot): void {
    logger.info("🛠 Планировщик инициализирован");

    cron.schedule(SCHEDULER_CRON, () => {
        void (async () => {
            logger.info("⏰ Проверка событий для напоминаний...");

            try {
                const now = Date.now();
                const events = await fetchNotificationEvents();

                for (const event of events) {
                    const startTime = new Date(event.start).getTime();
                    const diff = startTime - now;

                    const typesToCheck: [ReminderType, string, number][] = [
                        [
                            "DAY",
                            `🔔 Напоминание: соревнование «${event.name}» начнётся через 24 часа.`,
                            24 * 60 * 60 * 1000,
                        ],
                        ["HOUR", `⏰ Напоминание: соревнование «${event.name}» начнётся через 1 час.`, 60 * 60 * 1000],
                    ];

                    for (const [type, message, targetMs] of typesToCheck) {
                        const key = getReminderKey(event.id, type);

                        if (shouldNotify(diff, targetMs) && !sentReminders.has(key)) {
                            logger.info(`📤 Отправляем ${type}‑напоминание о ${event.name} (${event.id})`);

                            for (const tgId of event.tgIds) {
                                try {
                                    await bot.api.sendMessage(tgId, message);
                                } catch (err) {
                                    logger.warn(`❌ Не удалось отправить сообщение ${tgId}: ${String(err)}`);
                                }
                            }

                            sentReminders.add(key);
                        }
                    }
                }

                logger.info("✅ Проверка уведомлений завершена.");
            } catch (err) {
                logger.error(`💥 Ошибка в планировщике: ${String(err)}`);
            }
        })();
    });
}
