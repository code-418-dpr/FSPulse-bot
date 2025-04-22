import { Bot } from "grammy";

import { renderContestsPage } from "./contests";

export function registerContestsCallback(bot: Bot) {
    bot.callbackQuery(/^contests:page=\d+/, async (ctx) => {
        const data = ctx.callbackQuery.data;
        const url = new URLSearchParams(data.replace("contests:", ""));
        const page = parseInt(url.get("page") ?? "1", 10);
        const discipline = url.get("discipline") ?? undefined; // ✅ теперь используем nullish coalescing

        await ctx.answerCallbackQuery();
        await renderContestsPage(ctx, page, discipline);
    });
}
