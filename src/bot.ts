import { Bot, GrammyError, HttpError } from "grammy";

import { registerContestsCallback } from "@/commands/contests-callback";

import { contestsCommand } from "./commands/contests";
import { startCommand } from "./commands/start";
import { subscribeCommand } from "./commands/subscribe";
import { BOT_TOKEN } from "./config";
import { initScheduler } from "./services/scheduler";
import { logger } from "./utils/logger";

async function main() {
    logger.info("🔄 Запускаем бот ФСП...");

    const bot = new Bot(BOT_TOKEN);

    // Команды
    bot.command("start", startCommand);
    bot.command("contests", contestsCommand);
    bot.command("subscribe", subscribeCommand);

    registerContestsCallback(bot);

    // Планировщик
    initScheduler(bot);

    // Глобальный обработчик ошибок
    bot.catch((err) => {
        const ctx = err.ctx;
        logger.error(`❌ Ошибка при обработке обновления ${ctx.update.update_id}:`);
        const e = err.error;

        if (e instanceof GrammyError) {
            logger.error(`Ошибка Telegram API: ${e.description}`);
        } else if (e instanceof HttpError) {
            logger.error(`Ошибка HTTP запроса к Telegram: ${e.message}`);
        } else if (e instanceof Error) {
            logger.error(`Неизвестная ошибка: ${e.message}`);
        } else {
            logger.error("Неизвестная ошибка неизвестного типа:", e);
        }
    });

    try {
        const me = await bot.api.getMe();
        logger.info(`✅ Бот успешно запущен как @${me.username} (id=${me.id})`);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Не удалось получить информацию о боте: ${err.message}`);
        } else {
            logger.error("❌ Не удалось получить информацию о боте: неизвестная ошибка", err);
        }
        process.exit(1);
    }

    await bot.start();
}

main().catch((err: unknown) => {
    if (err instanceof Error) {
        logger.error(`❌ Ошибка запуска в main(): ${err.message}`);
    } else {
        logger.error("❌ Ошибка запуска в main(): неизвестная ошибка", err);
    }
    process.exit(1);
});
