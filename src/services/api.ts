// src/services/api.ts
import dotenv from "dotenv";

dotenv.config();

export interface Contest {
    id: string;
    title: string;
    startTime: Date;
    // …другие поля по необходимости
}

// Базовый URL вашего API и токен авторизации
const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3000";
const API_TOKEN = process.env.API_TOKEN ?? "";

/**
 * Заглушка: возвращает список предстоящих контестов.
 * В будущем здесь нужно раскомментировать fetch-запросы.
 */
export async function fetchUpcomingContests(): Promise<Contest[]> {
    // Пример реального запроса к API:
    //
    // const res = await fetch(`${API_BASE_URL}/contests/upcoming`, {
    //   headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    // });
    // if (!res.ok) throw new Error(`API error ${res.status}`);
    // return await res.json();

    // Пока возвращаем мок:
    return [
        {
            id: "1",
            title: "Algorithm Open",
            startTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
        },
        {
            id: "2",
            title: "Graph Challenge",
            startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
    ];
}

/**
 * Заглушка: возвращает детали одного контеста по его ID.
 */
export async function fetchContestById(id: string): Promise<Contest | null> {
    // Пример реального запроса:
    //
    // const res = await fetch(`${API_BASE_URL}/contests/${id}`, {
    //   headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    // });
    // if (res.status === 404) return null;
    // if (!res.ok) throw new Error(`API error ${res.status}`);
    // return await res.json();

    // Пока просто ищем в моке:
    const all = await fetchUpcomingContests();
    return all.find((c) => c.id === id) ?? null;
}
