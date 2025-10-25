<template>
  <div class="notification-container">
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="notification"
      :class="notification.type"
    >
      <div class="notification-content">
        <div class="icon-container">
          <img
            src="~/assets/svg/check-hexagon.svg"
            class="icon"
            v-if="notification.type === 'success'"
            alt="check-hexagon"
          />
          <img
            src="~/assets/svg/cross-triangle.svg"
            class="icon"
            v-if="notification.type === 'error'"
            alt="cross-triangle"
          />
        </div>
        <div class="notification-block-text">
          <p class="title">Уведомление</p>
          <p class="message">{{ notification.message }}</p>
        </div>
        <div
          class="progress-bar"
          v-if="notification.autoClose"
          :style="{ animationDuration: notification.autoCloseDuration + 'ms' }"
        ></div>
      </div>
      <button
        v-if="!notification.autoClose"
        class="close-button"
        @click="closeNotification(index)"
      >
      <img
            src="~/assets/svg/cross.png"
            alt="cross"
          />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import notificationSound from '@/assets/notification.mp3';
import { playSound } from '~/utils/playSound';

interface Notification {
  message: string;
  type: string;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

const notifications = inject<Ref<Notification[]>>('notifications');
const closeNotification = inject<Function>('closeNotification');

if (!notifications || !closeNotification) {
  throw new Error('Notification context is missing. Make sure to provide data.');
}

// Обновление заголовка страницы при изменении списка уведомлений
// watch(
//   () => notifications?.value.length,  // Пишем с безопасным доступом (?.)
//   (newLength) => {
//     useHead({
//       title: newLength > 0
//         ? `Новое сообщение (${newLength})`
//         : 'Исходный заголовок страницы',
//     });
//   }
// );

const playNotificationSound = () => {
  playSound(notificationSound);
};
</script>



<style scoped>
.notification-container {
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  background: #212121;
  z-index: 1000;
  border-radius: 1rem;
}

.notification {
  display: flex;
  align-items: center;
  padding: 2rem;
  color: white;
  font-size: 1.4rem;
  transition: all 0.5s;
  margin-bottom: 1rem;
  width: 35rem;
  height: 10rem;
  overflow: hidden;
  background-color: #212121;
  border-radius: 1rem;
}

@media (max-width: 479.98px) {
  .notification {
    width: 88vw;
    height: auto;
  }

  .notification-container {
    right: 1rem;
  }
}

.notification-block-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.notification-content {
  display: flex;
  width: 100%;
  gap: 1rem;
}

.icon-container {
  margin-right: 1rem;
}

.icon {
  width: 3.2rem;
  height: 3.2rem;
}

.title {
  font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #fff;
}

.message {
  font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 160%;
    text-align: start;
    display: flex;
    color: #fff;
}



.close-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 15px;
  right: 15px;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  background-color: #82dbf7;
  width: 100%;
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
