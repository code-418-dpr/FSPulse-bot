import { Bot } from "grammy";

import { registerContestsCommand } from "./commands/contests";
import { registerStartCommand } from "./commands/start";
import { registerSubscribeCommand } from "./commands/subscribe";
import { BOT_TOKEN } from "./config";
import { initScheduler } from "./services/scheduler";
import { logger } from "./utils/logger";

async function main() {
    logger.info("🔄 Запускаем бот ФСП...");

    const bot = new Bot(BOT_TOKEN);

    registerStartCommand(bot);
    registerContestsCommand(bot);
    registerSubscribeCommand(bot);

    initScheduler(bot);

    try {
        const me = await bot.api.getMe();
        logger.info(`✅ Бот успешно запущен как @${me.username} (id=${me.id})`);
    } catch (err: unknown) {
        logger.error(`❌ Не удалось получить информацию о боте: ${String(err)}`);
        process.exit(1);
    }

    await bot.start();
}

main().catch((err: unknown) => {
    logger.error(`❌ Ошибка в main(): ${String(err)}`);
    process.exit(1);
});
