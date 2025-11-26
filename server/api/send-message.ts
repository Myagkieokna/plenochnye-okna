import { defineEventHandler, sendError, createError, readBody } from "h3";
import nodemailer from "nodemailer";

interface ContactInfo {
  name: string;
  phone: string;
  message?: string;
}

interface Answers {
  area: string;
  configuration: { name: string; title: string };
  doorways: { text: string };
  installation: string;
  mount: string;
  schedule: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const { contactInfo, answers }: { contactInfo: ContactInfo; answers: Answers } = await readBody(
    event
  );

  const emailMessage = `
Здравствуйте! Меня зовут ${contactInfo.name}.
Мой номер телефона: ${contactInfo.phone}.
Вот мои предпочтения:

Площадь: ${answers.area}
Конфигурация: ${answers.configuration.name} (${answers.configuration.title})
Проемы: ${answers.doorways.text}
Установка: ${answers.installation}
Крепление: ${answers.mount}
График: ${answers.schedule}

${contactInfo.message ? `Комментарий: ${contactInfo.message}` : ""}
`;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: config.mailUser,
        pass: config.mailPass,
      },
    });

    await transporter.sendMail({
      from: `"Сайт мягкие окна" <${config.mailUser}>`,
      to: config.mailTo,
      subject: `Новая заявка с сайта от ${contactInfo.name}`,
      text: emailMessage,
    });

    return { success: true, message: "Заявка успешно отправлена на почту!" };
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
    return sendError(
      event,
      createError({ statusCode: 500, message: "Ошибка при отправке заявки на почту." })
    );
  }
});
