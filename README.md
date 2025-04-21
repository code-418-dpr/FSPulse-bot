# FSPulse-bot 🤖✨

[![license](https://img.shields.io/github/license/code-418-dpr/FSPulse-bot)](https://opensource.org/licenses/MIT)
[![release](https://img.shields.io/github/v/release/code-418-dpr/FSPulse-bot?include_prereleases)](https://github.com/code-418-dpr/FSPulse-bot/releases)
[![downloads](https://img.shields.io/github/downloads/code-418-dpr/FSPulse-bot/total)](https://github.com/code-418-dpr/FSPulse-bot/releases)
[![repo size](https://img.shields.io/github/repo-size/code-418-dpr/FSPulse-bot)](https://github.com/code-418-dpr/FSPulse-bot)
[![last commit](https://img.shields.io/github/last-commit/code-418-dpr/FSPulse-bot/main)](https://github.com/code-418-dpr/FSPulse-bot/commits/main)
[![build](https://github.com/code-418-dpr/FSPulse-bot/actions/workflows/build.yaml/badge.svg)](https://github.com/code-418-dpr/FSPulse-bot/actions/workflows/build.yaml)
[![linters](https://github.com/code-418-dpr/FSPulse-bot/actions/workflows/linters.yaml/badge.svg)](https://github.com/code-418-dpr/FSPulse-bot/actions/workflows/linters.yaml)
[![codeql](https://github.com/code-418-dpr/FSPulse-bot/actions/workflows/codeql.yaml/badge.svg)](https://github.com/code-418-dpr/FSPulse-bot/actions/workflows/codeql.yaml)

🚀 **FSPulse Telegram Bot**  
Уведомления о соревнованиях по спортивному программированию прямо в Telegram!

---

## 🛠️ Стек технологий
- **Bun** — быстрый JavaScript runtime 🦉  
- **TypeScript** — статически типизированный JavaScript ✨  
- **grammY** — современная библиотека для Telegram-ботов 🤖  
- **node-cron** — планировщик задач и напоминаний 🕒  
- **dotenv** — загрузка конфигурации из `.env` 🔒  
- **ts-node-dev** — горячая перезагрузка в режиме разработки ⚡️  

---

## ⚙️ Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/code-418-dpr/FSPulse-bot.git
   cd FSPulse-bot
   ```

2. Инициализируйте проект и установите зависимости:
   ```bash
   bun init -y
   bun add grammy node-cron dotenv
   bun add -d typescript ts-node-dev @types/node @types/node-cron
   ```

3. Создайте файл `.env` в корне проекта на основе `.env.example`:
   ```
   BOT_TOKEN=<ваш_токен_от_BotFather>
   API_BASE_URL=https://api.yoursite.com
   API_TOKEN=<ваш_API_TOKEN>
   NODE_ENV=development
   ```

4. Запустите в режиме разработки:
   ```bash
   bun run dev
   ```

5. Для продакшн-сборки:
   ```bash
   bun run build
   bun run start
   ```

---

## 🚀 Скрипты

| Команда        | Описание                                    |
| -------------- | ------------------------------------------- |
| `bun run dev`  | Запуск в режиме разработки (горячая перезагрузка) |
| `bun run build`| Компиляция TypeScript в JavaScript (dist/)  |
| `bun run start`| Запуск скомпилированного бота               |

---

## 📋 Основные команды бота

- `/start` — приветствие и справка по командам  
- `/contests` — показать ближайшие соревнования  
- `/subscribe <ID>` — подписаться на напоминания о старте соревнования  

---

## 🔧 Переменные окружения

| Переменная      | Описание                                      |
| --------------- | --------------------------------------------- |
| `BOT_TOKEN`     | Токен бота от BotFather                       |
| `API_BASE_URL`  | Базовый URL API (заглушки в `src/services/api.ts`) |
| `API_TOKEN`     | Токен для доступа к API                       |
| `NODE_ENV`      | Окружение (`development` или `production`)    |

---

## 🎉 Спасибо за использование!
Если понравилось — поставьте ⭐️ на GitHub и поделитесь с друзьями. Удачи в соревнованиях! 🏆
