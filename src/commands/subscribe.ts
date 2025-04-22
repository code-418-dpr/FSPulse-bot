import { Context } from "grammy";

import { fetchContestById } from "../services/api";
import { subscribe } from "../services/subscription";
import { logger } from "../utils/logger";

export async function subscribeCommand(ctx: Context) {
    const text = ctx.message?.text ?? "";
    const parts = text.trim().split(/\s+/);
    const id = parts[1];

    if (!id) {
        return await ctx.reply("❗ Укажите ID соревнования:\n`/subscribe <ID>`", {
            parse_mode: "Markdown",
        });
    }

    if (!ctx.chat) {
        logger.warn("⛔ ctx.chat is undefined в /subscribe");
        return await ctx.reply("⚠️ Не удалось определить ваш чат.");
    }

    try {
        const contest = await fetchContestById(id);
        if (!contest) {
            return await ctx.reply(`❌ Соревнование с ID \`${id}\` не найдено.`, {
                parse_mode: "Markdown",
            });
        }

        subscribe(ctx.chat.id, id);
        logger.info(`Пользователь ${ctx.chat.id} подписался на ${contest.id}`);

        return await ctx.reply(`✅ Подписка на *${contest.title}* оформлена!`, {
            parse_mode: "Markdown",
        });
    } catch (err) {
        logger.error(`❌ Ошибка в /subscribe ${id}: ${String(err)}`);
        return await ctx.reply("❌ Не удалось оформить подписку. Повторите позже.");
    }
}
