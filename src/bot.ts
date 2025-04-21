// src/bot.ts
import { Bot } from 'grammy';
import { BOT_TOKEN } from './config';
import { registerStartCommand } from './commands/start';
import { registerContestsCommand } from './commands/contests';
import { registerSubscribeCommand } from './commands/subscribe';
import { initScheduler } from './services/scheduler';
import { logger } from './utils/logger';

async function main() {
    // Логируем сразу при старте процесса
    logger.info('🔄 Запускаем бот ФСП...');

    const bot = new Bot(BOT_TOKEN);

    // Регистрируем команды
    registerStartCommand(bot);
    registerContestsCommand(bot);
    registerSubscribeCommand(bot);

    // Запускаем планировщик напоминаний
    initScheduler(bot);

    try {
        // Проверяем токен и получаем информацию о боте
        const me = await bot.api.getMe();
        logger.info(`✅ Бот успешно запущен как @${me.username} (id=${me.id})`);
    } catch (err) {
        logger.error(`❌ Не удалось получить информацию о боте: ${err}`);
        process.exit(1);
    }

    // Запускаем polling (этот вызов блокирующий)
    await bot.start();
}

main().catch(err => {
    logger.error(`❌ Ошибка в main(): ${err}`);
    process.exit(1);
});
