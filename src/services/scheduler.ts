// import { Bot } from "grammy";
// import cron from "node-cron";
//
// import { REMINDER_MS, SCHEDULER_CRON } from "../config";
// import { logger } from "../utils/logger";
// import { type Contest, fetchUpcomingContests } from "./api";
// import { getSubscribers } from "./subscription";
//
// // Чтобы не шлать дублирующие напоминания
// const sentReminders = new Set<string>();
//
// export function initScheduler(bot: Bot): void {
//     cron.schedule(SCHEDULER_CRON, () => {
//         void (async () => {
//             try {
//                 const now = Date.now();
//                 const contests: Contest[] = await fetchUpcomingContests();
//
//                 for (const c of contests) {
//                     const diff = c.startTime.getTime() - now;
//
//                     for (const [when, ms] of Object.entries(REMINDER_MS) as (["DAY", number] | ["HOUR", number])[]) {
//                         if (Math.abs(diff - ms) <= 5 * 60 * 1000) {
//                             const key = `${c.id}-${when}`;
//                             if (sentReminders.has(key)) continue;
//
//                             const subs = getSubscribers(c.id);
//                             const text =
//                                 when === "DAY"
//                                     ? `🔔 Напоминание: соревнование «${c.title}» стартует через 24 часа!`
//                                     : `⏰ Напоминание: соревнование «${c.title}» стартует через 1 час!`;
//
//                             for (const chatId of subs) {
//                                 await bot.api.sendMessage(chatId, text);
//                             }
//
//                             sentReminders.add(key);
//                         }
//                     }
//                 }
//             } catch (err: unknown) {
//                 logger.error(`Ошибка в планировщике: ${String(err)}`);
//             }
//         })();
//     });
// }
