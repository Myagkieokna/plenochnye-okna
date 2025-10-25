//~/utils/phoneValidation.ts
import * as yup from "yup";

// Объект с регулярками и сообщениями по странам СНГ
export const phoneValidationRules = [
  {
    code: "7", // Россия
    regex: /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер России: +7 (XXX) XXX-XX-XX",
  },
  {
    code: "375", // Беларусь
    regex: /^\+375\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Беларуси: +375 (XX) XXX-XX-XX",
  },
  {
    code: "374", // Армения
    regex: /^\+374\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Армении: +374 (XX) XXX-XX-XX",
  },
  {
    code: "373", // Молдова
    regex: /^\+373\s?\(\d{3}\)\s?\d{1}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Молдовы: +373 (XXX) X-XX-XX",
  },
  {
    code: "380", // Украина
    regex: /^\+380\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Украины: +380 (XX) XXX-XX-XX",
  },
  {
    code: "992", // Таджикистан
    regex: /^\+992\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Таджикистана: +992 (XXX) XXX-XX-XX",
  },
  {
    code: "993", // Туркменистан
    regex: /^\+993\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Туркменистана: +993 (XX) XXX-XX-XX",
  },
  {
    code: "994", // Азербайджан
    regex: /^\+994\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Азербайджана: +994 (XX) XXX-XX-XX",
  },
  {
    code: "995", // Грузия
    regex: /^\+995\s?\(\d{3}\)\s?\d{2}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Грузии: +995 (XXX) XX-XX-XX",
  },
  {
    code: "996", // Кыргызстан
    regex: /^\+996\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Кыргызстана: +996 (XXX) XXX-XX-XX",
  },
  // Можно добавить и другие...
];

// Валидатор номера телефона для yup с пользовательским сообщением
export const phoneValidator = yup
  .string()
  .optional()
  .test("is-valid-cis-phone", "Неверный формат номера телефона", function (value) {
    if (!value) return false;

    // Определяем код страны из начала строки
    const matchedRule = phoneValidationRules.find((rule) => value.startsWith("+" + rule.code));

    if (!matchedRule) {
      // Если код страны не найден, показываем общее сообщение
      return this.createError({ message: "Введите номер в формате +7 (XXX) XXX-XX-XX и др." });
    }

    // Проверяем по конкретному шаблону страны
    if (!matchedRule.regex.test(value)) {
      return this.createError({ message: matchedRule.message });
    }

    // Все ок
    return true;
  });
