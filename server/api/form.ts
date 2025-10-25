import { defineEventHandler, sendError, createError, readBody } from "h3";

// Токен бота и chatId такие же, как в другом файле
const BOT_TOKEN = '8056475514:AAGyEDJqqy6IARz2qQ5CHD424mO3_5NaSqw';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const chatId = 8180227527;

interface ContactInfo {
  name: string;
  phone: string;
}

export default defineEventHandler(async (event) => {
  const { name, phone }: ContactInfo = await readBody(event);

  if (!name || !phone) {
    return sendError(
      event,
      createError({ statusCode: 400, message: "Имя и телефон обязательны" })
    );
  }

  // Формируем сообщение для Telegram
  const formattedMessage = `
   📩 Новая заявка с сайта:
   👤 Имя: ${name}
   📞 Телефон: ${phone}
  `;

  try {
    const response = await $fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      body: {
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: "HTML",
      },
    });

    if (response) {
      return { success: true, message: "Сообщение успешно отправлено!" };
    } else {
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
