# Деплой Nuxt проекта на сервер

## 1️⃣ Локальная сборка архива
Запуск:

```powershell
cd D:\plenochnye-okna-main
.\build-archive.ps1
✅ В итоге получаем plenochnye-okna-main.zip в папке проекта.

2️⃣ Копирование архива + скрипта на сервер (SCP)
На локальной машине PowerShell:
scp D:\plenochnye-okna-main\plenochnye-okna-main.zip D:\plenochnye-okna-main\deploy.sh root@93.189.228.211:/var/www/nuxt-app/
Вводишь пароль FBxm4pQv%NHh → файлы копируются.

3️⃣ Запуск deploy на сервере
SSH на сервер:

Копировать код
ssh root@93.189.228.211
FBxm4pQv%NHh

Файл deploy.sh (все изменения, чтобы архив и скрипт не удалялись).
Сделать исполняемым (на сервере один раз):
chmod +x /var/www/nuxt-app/deploy.sh

Дальше вставляем
cd /var/www/nuxt-app
./deploy.sh


✅ После этого:
Старые файлы проекта обновлены
Архив и deploy.sh остаются
Nuxt билдится заново
PM2 рестартится
Прокси Apache начинает отдавать сайт