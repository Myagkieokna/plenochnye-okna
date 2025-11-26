import { defineEventHandler, sendError, createError } from "h3";

// Токен бота и chatId
const BOT_TOKEN = "8056475514:AAGyEDJqqy6IARz2qQ5CHD424mO3_5NaSqw";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
// const chatId = 8180227527;
const chatId = 6017439095;

interface ContactInfo {
  name: string;
  phone: string;
  message?: string;
}

interface Answers {
  area: string;
  configuration: {
    name: string;
    title: string;
  };
  doorways: {
    text: string;
  };
  // mosquito: string;
  installation: string;
  mount: string;
  schedule: string;
}

// Основная функция для обработки POST-запроса
export default defineEventHandler(async (event) => {
  const { contactInfo, answers }: { contactInfo: ContactInfo; answers: Answers } = await readBody(
    event
  ); // useBody используется здесь для получения данных

  // Формируем сообщение
  const formattedMessage = `Здравствуйте! Меня зовут ${contactInfo.name}.
Мой номер телефона: ${contactInfo.phone}

Площадь: ${answers.area}
Конфигурация: ${answers.configuration.name} (${answers.configuration.title})
Проемы: ${answers.doorways.text}
Установка: ${answers.installation}
Крепление: ${answers.mount}
График: ${answers.schedule}

${contactInfo.message ? "Комментарий: " + contactInfo.message : ""}`;

  if (!chatId || !formattedMessage) {
    return sendError(
      event,
      createError({ statusCode: 400, message: "Необходимо указать chatId и сообщение." })
    );
  }

  try {
    // Отправка сообщения через Telegram API
    const response = await $fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      body: {
        chat_id: chatId,
        text: formattedMessage,
      },
    });

    if (response) {
      return { success: true, message: "Сообщение успешно отправлено!" };
    } else {
      console.error("Ответ от Telegram:", response);
      throw new Error("Ошибка при отправке сообщения в Telegram");
    }
  } catch (error) {
    console.error("Ошибка отправки сообщения в Telegram:", error);
    return sendError(
      event,
      createError({ statusCode: 500, message: "Ошибка при отправке сообщения." })
    );
  }
});

// - Москитные сетки: ${answers.mosquito === "yes" ? "Да" : "Нет"}
