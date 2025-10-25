#!/bin/bash
set -e

APP_DIR="/var/www/nuxt-app"
ARCHIVE="plenochnye-okna-main.zip"
SCRIPT="deploy.sh"
SCRIPT_BUILD_ARCHIVE="deploy.sh"

echo "=== DEPLOY START ==="

cd $APP_DIR

# Проверяем, что архив существует
if [ ! -f "$ARCHIVE" ]; then
  echo "ERROR: Архив $ARCHIVE не найден в $APP_DIR"
  exit 1
fi

echo "→ Чистим старые файлы проекта (не трогаем архив и скрипт)..."
# Удаляем всё, кроме архива и скрипта
find . -mindepth 1 ! -name "$ARCHIVE" ! -name "$SCRIPT" ! -name "$SCRIPT_BUILD_ARCHIVE" -exec rm -rf {} +

echo "→ Распаковываем проект..."
unzip -o $ARCHIVE -d $APP_DIR

echo "→ Удаляем временные папки, если есть..."
rm -rf node_modules .nuxt .output

echo "→ Ставим зависимости..."
npm install

echo "→ Собираем Nuxt..."
npm run build

echo "→ Перезапускаем PM2..."
pm2 restart nuxt-app || pm2 start npm --name "nuxt-app" -- start

echo "=== DEPLOY FINISHED ==="
