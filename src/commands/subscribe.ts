// src/commands/subscribe.ts
import { Bot } from "grammy";

import { fetchContestById } from "../services/api";
import { subscribe as subscribeService } from "../services/subscription";

export function registerSubscribeCommand(bot: Bot) {
    bot.command("subscribe", async (ctx) => {
        // Защита от undefined
        const message = ctx.message;
        if (!message?.text) {
            return ctx.reply("❗️ Команда должна вызываться из обычного чата с текстом.");
        }

        // Парсим ID из текста
        const parts = message.text.trim().split(/\s+/).slice(1);
        const id = parts[0];
        if (!id) {
            return ctx.reply("❗️ Укажите, пожалуйста, ID соревнования:\n`/subscribe <ID>`", { parse_mode: "Markdown" });
        }

        // Проверяем, есть ли такой конкурс
        const contest = await fetchContestById(id);
        if (!contest) {
            return ctx.reply(`❌ Соревнование с ID \`${id}\` не найдено.`, { parse_mode: "Markdown" });
        }

        // Сохраняем подписку
        subscribeService(ctx.chat.id, id);
        return ctx.reply(`✅ Вы подписаны на напоминания о соревновании *${contest.title}*.`, {
            parse_mode: "Markdown",
        });
    });
}
