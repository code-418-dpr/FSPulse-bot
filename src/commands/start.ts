import { InlineKeyboard } from "grammy";
import { Context } from "grammy";

import { API_BASE_URL } from "../config";
import { logger } from "../utils/logger";

export async function startCommand(ctx: Context) {
    logger.info(`/start от chatId=${ctx.chat?.id}`);

    try {
        const tg = ctx.from?.id;
        if (!tg) {
            return await ctx.reply("❗ Невозможно определить ваш Telegram ID.");
        }

        // Получаем username бота
        const deepLink = `${API_BASE_URL}/tg-link?tg=${encodeURIComponent(tg)}`;

        const keyboard = new InlineKeyboard().url("Связать аккаунт", deepLink);

        await ctx.reply("👋 Привет! Чтобы связать Telegram с аккаунтом на платформе, нажмите на кнопку ниже:", {
            reply_markup: keyboard,
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Ошибка при /start: ${err.message}`);
        } else {
            logger.error("Ошибка при /start: неизвестная ошибка", err);
        }
    }
}
