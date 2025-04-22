import axios, { AxiosResponse } from "axios";

import { API_BASE_URL, API_TOKEN } from "../config";

export interface ContestUpcoming {
    id: string;
    name: string;
    start: string;
    endRegistration: string;
    discipline: string;
}

interface FetchContestsParams {
    limit: number;
    offset: number;
    discipline?: string;
}

interface PagedResponse<T> {
    items: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

export async function fetchUpcomingContests(params: FetchContestsParams): Promise<ContestUpcoming[]> {
    try {
        const res: AxiosResponse<PagedResponse<ContestUpcoming>> = await axios.get(
            `${API_BASE_URL}/api/events/approved`,
            {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                params: {
                    page: params.offset / params.limit + 1,
                    pageSize: params.limit,
                    discipline: params.discipline,
                },
            },
        );

        return res.data.items;
    } catch (err) {
        throw new Error(`Ошибка при загрузке соревнований: ${String(err)}`);
    }
}

export async function fetchContestById(id: string): Promise<ContestUpcoming | null> {
    const all = await fetchUpcomingContests({ limit: 100, offset: 0 });
    return all.find((c) => c.id === id) ?? null;
}

interface UserFromTgResponse {
    userId: string;
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

interface NotificationEvent {
    id: string;
    name: string;
    start: string;
    tgIds: string[];
}

export async function fetchNotificationEvents(): Promise<NotificationEvent[]> {
    try {
        const res: AxiosResponse<NotificationEvent[]> = await axios.get(`${API_BASE_URL}/api/events/notifications`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        return res.data;
    } catch (err) {
        throw new Error("Ошибка при получении уведомлений: " + (err instanceof Error ? err.message : "неизвестная"));
    }
}
