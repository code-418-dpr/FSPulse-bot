import { Context } from "grammy";

import { API_BASE_URL } from "../config";
import { logger } from "../utils/logger";

export async function startCommand(ctx: Context) {
    logger.info(`/start от chatId=${ctx.chat?.id}`);

    try {
        await ctx.reply(
            [
                "👋 Привет! Я бот ФСП.",
                "",
                "Доступные команды:",
                "/contests — показать список ближайших соревнований",
                "/subscribe <ID> — подписаться на напоминания о старте",
            ].join("\n"),
            { parse_mode: "Markdown" },
        );

        const tg = ctx.from?.id;
        if (!tg) {
            return await ctx.reply("❗ Невозможно определить ваш Telegram ID.");
        }

        const url = `${API_BASE_URL}/tg-link?tg=${encodeURIComponent(tg)}`;
        return await ctx.reply(`Чтобы связать Telegram с аккаунтом на платформе, перейдите по ссылке:\n\n${url}`);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Ошибка при /start: ${err.message}`);
        } else {
            logger.error("Ошибка при /start: неизвестная ошибка", err);
        }
    }
}
