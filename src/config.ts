// src/config.ts
import dotenv from 'dotenv';
dotenv.config();

// Telegram
export const BOT_TOKEN = process.env.BOT_TOKEN ?? '';
if (!BOT_TOKEN) {
    throw new Error('Missing BOT_TOKEN in .env');
}

// API
export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3000';
export const API_TOKEN = process.env.API_TOKEN ?? '';

// Тайминги напоминаний (в миллисекундах)
export const REMINDER_MS = {
    DAY: 24 * 60 * 60 * 1000,  // за 24 часа
    HOUR: 60 * 60 * 1000,      // за 1 час
};

// Расписание проверки напоминаний (cron‑строка)
export const SCHEDULER_CRON = '*/30 * * * *'; // каждые 30 минут
