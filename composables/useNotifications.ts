import { ref } from "vue";
/**
 * Тип уведомления.
 */
interface Notification {
  message: string;            // Текст сообщения уведомления
  type: string;               // Тип уведомления (например, "info", "success", "error")
  autoClose?: boolean;        // Указывает, нужно ли автоматически закрывать уведомление
  autoCloseDuration?: number; // Длительность времени до автоматического закрытия (в миллисекундах)
}

/**
 * Типы для опций уведомлений.
 */
interface NotificationOptions {
  updatePageTitle?: () => void;    // Функция для обновления заголовка страницы
  playNotificationSound?: () => void; // Функция для воспроизведения звука уведомления
}

/**
 * Создает композицию для управления уведомлениями.
 * @param {NotificationOptions} options - Параметры для управления функциональностью уведомлений.
 * @returns {object} - Объект с состоянием уведомлений и методами для их управления.
 */
export const useNotifications = (options: NotificationOptions = {}) => {
  // Список активных уведомлений
  const notifications = ref<Notification[]>([]);

  /**
   * Добавляет новое уведомление в список.
   * @param {string} message - Текст уведомления.
   * @param {string} type - Тип уведомления (по умолчанию "info").
   * @param {boolean} autoClose - Указывает, нужно ли автоматически закрывать уведомление (по умолчанию false).
   * @param {number} autoCloseDuration - Длительность времени до автоматического закрытия (по умолчанию 15000 мс).
   */
  const addNotification = (
    message: string,
    type: string = "info",
    autoClose = false,
    autoCloseDuration = 15000
  ) => {
    const notification: Notification = { message, type, autoClose, autoCloseDuration };
    notifications.value.push(notification); // Добавляем уведомление в список

    // Если включено автоматическое закрытие, запускаем таймер
    if (autoClose) {
      setTimeout(() => {
        const index = notifications.value.indexOf(notification); // Ищем индекс текущего уведомления
        if (index !== -1) closeNotification(index); // Закрываем уведомление, если оно еще существует
      }, autoCloseDuration);
    }

    // Дополнительные действия из опций (обновление заголовка страницы или воспроизведение звука)
    if (options.updatePageTitle) options.updatePageTitle();
    if (options.playNotificationSound) options.playNotificationSound();
  };

  /**
   * Удаляет уведомление из списка по индексу.
   * @param {number} index - Индекс уведомления для удаления.
   */
  const closeNotification = (index: number) => {
    notifications.value.splice(index, 1); // Удаляем уведомление из массива
  };

  // Возвращаем состояние и методы управления уведомлениями
  return {
    notifications,        // Текущее состояние уведомлений
    addNotification,      // Метод для добавления уведомлений
    closeNotification,    // Метод для удаления уведомлений
  };
};
