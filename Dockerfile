# Используем официальный образ Node.js версии 18 как стадию сборки
FROM node:current-alpine3.22 AS build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы зависимостей (package.json и package-lock.json, если есть)
COPY package* ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем все остальные файлы проекта
COPY . ./

# Собираем проект Nuxt (создаётся папка .output)
RUN npx nuxt build


# Вторая стадия — для финального образа (меньше весит, не содержит лишнего)
FROM node:current-alpine3.22

# Устанавливаем dumb-init для корректной обработки сигналов,
# создаём обычного пользователя (не root)
RUN apk update && apk add dumb-init && adduser -D nuxtuser

# Переключаемся на созданного пользователя
USER nuxtuser
# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранный Nuxt-проект из стадии сборки
COPY --chown=nuxtuser:nuxtuser --from=build /app/.output .output

# Открываем порт 8080 для сервера
EXPOSE 8080

# Задаём переменные окружения — Nuxt ожидает такие переменные для запуска
ENV HOST=0.0.0.0 \
    PORT=8080 \
    NODE_ENV=production

# Запускаем приложение с помощью dumb-init (управление процессом node)
CMD ["sh", "-c", "ls -l .output/server && node .output/server/index.mjs"]



# CMD ["ls", "-lR", ".output/server"]