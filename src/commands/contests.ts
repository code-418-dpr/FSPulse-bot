import { Context, InlineKeyboard } from "grammy";

import { fetchUpcomingContests } from "../services/api";
import { logger } from "../utils/logger";

const PAGE_SIZE = 5;

export async function contestsCommand(ctx: Context) {
    logger.info(`/contests от chatId=${ctx.chat?.id}`);
    const text = ctx.message?.text ?? "";
    const args = text.trim().split(/\s+/).slice(1);

    const discipline = args.find((arg) => !arg.startsWith("page="));
    const pageArg = args.find((arg) => arg.startsWith("page="));
    const page = pageArg ? parseInt(pageArg.split("=")[1], 10) : 1;

    await renderContestsPage(ctx, page, discipline);
}

export async function renderContestsPage(ctx: Context, page: number, discipline?: string) {
    const offset = (page - 1) * PAGE_SIZE;

    try {
        const contests = await fetchUpcomingContests({
            limit: PAGE_SIZE,
            offset,
            discipline,
        });

        if (!Array.isArray(contests)) {
            logger.error("❌ API вернул некорректный ответ: contests is not an array");
            return await ctx.reply("❌ Не удалось загрузить соревнования. Повторите позже.");
        }

        if (contests.length === 0) {
            return await ctx.reply("🥲 Нет предстоящих соревнований по заданным параметрам.");
        }

        for (const contest of contests) {
            const { id, name, discipline, start, endRegistration } = contest;

            const message = [
                `🏆 <b>${name}</b>`,
                `🆔 <code>${id}</code>`,
                `📚 Дисциплина: <b>${discipline}</b>`,
                `📅 Регистрация до: <b>${formatDateTime(endRegistration)}</b>`,
                `🚀 Начало: <b>${formatDateTime(start)}</b>`,
            ].join("\n");

            await ctx.reply(message, { parse_mode: "HTML" });
        }

        const keyboard = new InlineKeyboard();
        keyboard.text("⬅️ Назад", `contests:page=${page - 1}${discipline ? `&discipline=${discipline}` : ""}`);
        keyboard.text("➡️ Далее", `contests:page=${page + 1}${discipline ? `&discipline=${discipline}` : ""}`);

        await ctx.reply(`📄 Страница ${page}`, {
            reply_markup: keyboard,
        });

        logger.debug(`✅ Отправлено ${contests.length} соревнований пользователю ${ctx.chat?.id}`);
    } catch (err) {
        logger.error(`❌ Ошибка в /contests: ${String(err)}`);
        await ctx.reply("❌ Не удалось получить список соревнований. Попробуйте позже.");
    }
}

function formatDateTime(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
