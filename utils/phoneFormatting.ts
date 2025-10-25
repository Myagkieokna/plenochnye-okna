// ~/utils/phoneFormatting.ts
type FormatConfig = { patterns: string[] }; 

export const phoneFormats: Record<string, FormatConfig> = {
  "7"  : { patterns: ["({0:3}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Россия
  "375": { patterns: ["({0:2}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Беларусь
  "373": { patterns: ["({0:3}) ", "{0:1}-", "{0:2}-", "{0:2}"] },   // Молдова
  "374": { patterns: ["({0:2}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Армения
  "380": { patterns: ["({0:2}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Украина
  "995": { patterns: ["({0:3}) ", "{0:2}-", "{0:2}-", "{0:2}"] },   // Грузия
  "994": { patterns: ["({0:2}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Азербайджан
  "996": { patterns: ["({0:3}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Кыргызстан
  "992": { patterns: ["({0:3}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Таджикистан
  "993": { patterns: ["({0:2}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Туркменистан
  "998": { patterns: ["({0:2}) ", "{0:3}-", "{0:2}-", "{0:2}"] },   // Узбекистан
  "371": { patterns: ["{0:2} ", "{0:2} ", "{0:2} ", "{0:2}"] },     // Латвия
  "370": { patterns: ["{0:2} ", "{0:3} ", "{0:3}"] },               // Литва
  "372": { patterns: ["{0:3} ", "{0:3} ", "{0:3}"] },               // Эстония
  "44" : { patterns: ["{0:2} ", "{0:4} ", "{0:4}"] },               // Великобритания
  "90" : { patterns: ["({0:3}) ", "{0:3}-", "{0:4}"] },             // Турция
  "421": { patterns: ["{0:3} ", "{0:3} ", "{0:3}"] },               // Словакия
};

function getGroupLength(pattern: string): number {
  const match = pattern.match(/\{0:(\d+)\}/);
  return match ? +match[1] : 0;
}

export function formatPhoneNumber(rawInput: string): string {
  // 1) Убираем всё, кроме цифр
  let digits = rawInput.replace(/[^\d]/g, "");

  // 2) Если первый символ — "8", заменяем его на "7"
  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }

  // 3) Добавляем "+" спереди
  if (!digits.startsWith("+")) {
    digits = "+" + digits;
  }

  // 4) Ищем код страны
  const pure = digits.slice(1); // без "+"
  const countryCode = Object.keys(phoneFormats)
    .sort((a, b) => b.length - a.length)
    .find(code => pure.startsWith(code));

  if (!countryCode) {
    // не распознали — возвращаем очищенный ввод с "+"
    return digits;
  }

  const { patterns } = phoneFormats[countryCode];
  const national = pure.slice(countryCode.length);

  // 5) Сборка по шаблонам
  let formatted = `+${countryCode} `;
  let offset = 0;

  for (const pattern of patterns) {
    const len = getGroupLength(pattern);
    if (len <= 0) break;
    const part = national.slice(offset, offset + len);
    if (!part) break;

    if (part.length === len) {
      // полная группа — ставим разделитель
      formatted += pattern.replace(`{0:${len}}`, part);
    } else {
      // неполная — просто цифры и выходим
      formatted += part;
      break;
    }
    offset += len;
  }

  return formatted.trimEnd();
}