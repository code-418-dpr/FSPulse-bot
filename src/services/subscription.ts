// Логика подписок на напоминания о старте соревнований

const subscriptions = new Map<string, Set<number>>();

/** Подписать пользователя (chatId) на напоминания о соревновании */
export function subscribe(chatId: number, contestId: string): void {
    if (!subscriptions.has(contestId)) {
        subscriptions.set(contestId, new Set());
    }
    subscriptions.get(contestId)!.add(chatId);
}

/** Отписать пользователя от напоминаний */
export function unsubscribe(chatId: number, contestId: string): void {
    subscriptions.get(contestId)?.delete(chatId);
}

/** Список chatId, подписанных на соревнование */
export function getSubscribers(contestId: string): number[] {
    return Array.from(subscriptions.get(contestId) ?? []);
}

/** Все подписки: { [contestId]: chatId[] } */
export function getAllSubscriptions(): Record<string, number[]> {
    const result: Record<string, number[]> = {};
    subscriptions.forEach((set, contestId) => {
        result[contestId] = Array.from(set);
    });
    return result;
}
