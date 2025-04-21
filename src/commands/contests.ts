import { Bot } from 'grammy';
import { fetchUpcomingContests } from '../services/api';
import type { Contest } from '../services/api';
import { logger } from '../utils/logger';

export function registerContestsCommand(bot: Bot) {
    bot.command('contests', async (ctx) => {
        logger.info(`ℹ️ Получен /contests от chatId=${ctx.chat.id}`);
        try {
            const contests: Contest[] = await fetchUpcomingContests();
            if (contests.length === 0) {
                return ctx.reply('🥲 Нет предстоящих соревнований.');
            }

            let message = '📅 *Ближайшие соревнования:*\n\n';
            for (const c of contests) {
                message +=
                    `*ID:* \`${c.id}\`\n` +
                    `*${c.title}*\n` +
                    `🕒 ${c.startTime.toLocaleString()}\n\n`;
            }
            message += 'Чтобы подписаться на напоминания, отправьте:\n`/subscribe <ID>`';
            await ctx.reply(message, { parse_mode: 'Markdown' });
            logger.debug(`Отправлено ${contests.length} соревнований пользователю ${ctx.chat.id}`);
        } catch (err) {
            logger.error(`Ошибка при обработке /contests: ${err}`);
            ctx.reply('❌ Не удалось получить список соревнований. Попробуйте позже.');
        }
    });
}
