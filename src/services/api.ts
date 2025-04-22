import axios, { AxiosResponse } from "axios";

import { API_BASE_URL, API_TOKEN } from "../config";

export interface Contest {
    id: string;
    title: string;
    startTime: string; // ISO format
}

interface EventDto {
    id: string;
    name: string;
    start: string;
}

interface UserFromTgResponse {
    userId: string;
}

export async function fetchUpcomingContests(): Promise<Contest[]> {
    try {
        const response: AxiosResponse<EventDto[]> = await axios.get(`${API_BASE_URL}/api/events/approved`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
        });

        return response.data.map((event) => ({
            id: event.id,
            title: event.name,
            startTime: event.start,
        }));
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Ошибка при запросе соревнований: ${err.message}`);
        }
        throw new Error("Ошибка при запросе соревнований: неизвестная ошибка");
    }
}

export async function fetchContestById(id: string): Promise<Contest | null> {
    const all = await fetchUpcomingContests();
    return all.find((c) => c.id === id) ?? null;
}

export async function fetchUserIdFromTelegram(tg: string): Promise<string> {
    try {
        const response: AxiosResponse<UserFromTgResponse> = await axios.get(`${API_BASE_URL}/api/user/from-tg`, {
            params: { tg },
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });

        return response.data.userId;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Ошибка при получении userId: ${err.message}`);
        }
        throw new Error("Ошибка при получении userId: неизвестная ошибка");
    }
}
