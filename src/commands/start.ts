import { Bot } from "grammy";

export function registerStartCommand(bot: Bot) {
    bot.command("start", async (ctx) => {
        await ctx.reply(
            "👋 Привет! Я бот ФСП.\n\n" +
                "Доступные команды:\n" +
                "/contests — показать список ближайших соревнований\n" +
                "/subscribe <ID> — подписаться на напоминания о старте\n",
            { parse_mode: "Markdown" },
        );
    });
}
