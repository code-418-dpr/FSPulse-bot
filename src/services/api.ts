// Заглушки API-вызовов к БД (заменить на реальные HTTP-запросы)

export interface Contest {
    id: string;
    title: string;
    startTime: Date;
}

// Возвращает мок-лист предстоящих контестов
export function fetchUpcomingContests(): Promise<Contest[]> {
    return Promise.resolve([
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
    ]);
}

// Возвращает детали конкретного контеста по ID
export function fetchContestById(id: string): Promise<Contest | null> {
    return fetchUpcomingContests().then((all) => all.find((c) => c.id === id) ?? null);
}
