import { Context } from "grammy";

import { fetchUpcomingContests } from "../services/api";
import { logger } from "../utils/logger";

export async function contestsCommand(ctx: Context) {
    logger.info(`/contests от chatId=${ctx.chat?.id}`);

    try {
        const contests = await fetchUpcomingContests();

        if (contests.length === 0) {
            return await ctx.reply("🥲 Нет предстоящих соревнований.");
        }

        const messageLines = ["📅 *Ближайшие соревнования:*\n"];
        for (const contest of contests) {
            messageLines.push(
                `*ID:* \`${contest.id}\``,
                `*${contest.title}*`,
                `🕒 ${new Date(contest.startTime).toLocaleString()}`,
                "",
            );
        }

        messageLines.push("Чтобы подписаться, отправьте:\n`/subscribe <ID>`");

        await ctx.reply(messageLines.join("\n"), { parse_mode: "Markdown" });
        logger.debug(`✅ Отправлено ${contests.length} соревнований пользователю ${ctx.chat?.id}`);
    } catch (err) {
        logger.error(`❌ Ошибка в /contests: ${String(err)}`);
        await ctx.reply("❌ Не удалось получить список. Попробуйте позже.");
    }
}
