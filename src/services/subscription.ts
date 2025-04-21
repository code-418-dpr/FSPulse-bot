// Логика подписок на напоминания о старте контестов

// В памяти: Map<contestId, Set<chatId>>
const subscriptions: Map<string, Set<number>> = new Map();

/**
 * Подписывает пользователя (chatId) на напоминания о контесте
 */
export function subscribe(chatId: number, contestId: string): void {
    if (!subscriptions.has(contestId)) {
        subscriptions.set(contestId, new Set());
    }
    subscriptions.get(contestId)!.add(chatId);
}

/**
 * Отписывает пользователя от напоминаний
 */
export function unsubscribe(chatId: number, contestId: string): void {
    subscriptions.get(contestId)?.delete(chatId);
}

/**
 * Возвращает список chatId, подписанных на данный контест
 */
export function getSubscribers(contestId: string): number[] {
    return Array.from(subscriptions.get(contestId) || []);
}

/**
 * Все подписки: Map<contestId, chatId[]>
 */
export function getAllSubscriptions(): Record<string, number[]> {
    const result: Record<string, number[]> = {};
    subscriptions.forEach((set, contestId) => {
        result[contestId] = Array.from(set);
    });
    return result;
}
