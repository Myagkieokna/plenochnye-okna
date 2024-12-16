<template>
  <!-- Основная круглая кнопка -->
  <div class="floating-btn" @click="toggleMenu">
    <i class="phone">
      <img src="/public/img/whatsapp.png" alt="">
      <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V12M12 12V19M12 12H19M12 12H5" stroke="#222222" stroke-width="1.5" stroke-linecap="round"/>
</svg> -->
</i>
  </div>

  <!-- Скрытое меню с двумя круглыми ссылками -->
  <div v-if="isMenuVisible" class="floating-btn-menu">
    <!-- Ссылка для WhatsApp -->
    <a 
      class="floating-btn-item whatsapp-btn" 
      href="https://wa.me/+79661266606" 
      target="_blank" 
      aria-label="Написать в WhatsApp"
    >
      <i class="fa fa-phone"><img src="/public/img/whatsapp.png" alt=""></i>
    </a>
    
    <!-- Ссылка для вызова -->
    <a 
      class="floating-btn-item phone-btn" 
      href="tel:+79661266606" 
      target="_blank" 
      aria-label="Позвонить"
    >
      <i class="fa fa-whatsapp"><img src="/public/img/phone.png" alt=""></i>
    </a>
    <a 
      class="floating-btn-item tg-btn" 
      href="https://t.me/plenochnyeOkna"
      target="_blank" 
      aria-label="Позвонить"
    >
      <i class="fa fa-tg"><img src="/public/img/icons8-telegram-logo-67.png" alt=""></i>
    </a>
  </div>
</template>

<script setup>
// Стейт для управления видимостью меню
import { ref } from 'vue';

const isMenuVisible = ref(false);

// Переключение видимости меню
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
</script>

<style lang="scss" scoped>

body._lock .floating-btn {
  display: none;
}
/* Основная кнопка, которая запускает меню */
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 30px;
  // background-color: #82dbf7;
  color: white;
  border-radius: 50%;
  // padding: 2rem;
  font-size: 24px;
  width: 6.5rem;
  height: 6.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  &:hover {
    background: rgb(167, 229, 247);
  }

  &>i>svg {
    width: 3rem;
    height: 3rem;
  }
}


.floating-btn-menu {
  position: fixed;
  bottom: 100px; /* Чуть выше кнопки */
  // right: 40px;
  right: 38px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999; /* Меньший z-index, чем у основной кнопки */
}

/* Стили для каждой кнопки */
.floating-btn-item {
  background-color: #fff; /* Зеленый для WhatsApp */
  color: white;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, opacity 0.3s ease;
  width: 5.5rem;
  height: 5.5rem;
}

.floating-btn-item.phone-btn {
  background-color: #fff; /* Синий для телефона */
  width: 5rem;
  height: 5rem;
}

.floating-btn-item.whatsapp-btn {
  background-color: #fff; /* Зеленый для WhatsApp */
  position: relative;
  z-index: -1; /* Ставим кнопку WhatsApp за кнопку телефона */
  /* Начальная позиция кнопки WhatsApp: скрыта за кнопкой для звонка */
  transform: translateY(30px) scale(0); 
  opacity: 0;
  width: 5rem;
  height: 5rem;
}

.fa.fa-whatsapp img{
  width: 100%;
  height: 100%;
}

.fa.fa-phone img{
  width: 100%;
  height: 100%;
}

.fa.fa-tg img{
  width: 100%;
  height: 100%;
}

@media (max-width:479.98px) {
  .floating-btn {
    &>i>svg {
      width: 3rem;
      height: 3rem;
    } 
  }

  .floating-btn-menu {
    right: 2.1rem;
    bottom: 9rem;
  }

  .floating-btn {
    width: 5.5rem;
    height: 5.5rem;
    right: 16px;
  }
  .floating-btn-item.phone-btn {
    height: 4.5rem;
    width: 4.5rem;
  }
  .floating-btn-item.whatsapp-btn {
    height: 4.5rem;
    width: 4.5rem;
  }

  .floating-btn-item.tg-btn {
    height: 4.5rem;
    width: 4.5rem;
  }
}

/* Анимация для появления кнопок */
.floating-btn-menu a {
  opacity: 0;
  transform: scale(0) translateY(20px); /* Начальная позиция (кнопки скрыты и сжаты) */
}

/* Анимация появления кнопки WhatsApp с эффектом выдвижения */
.floating-btn-menu a:nth-child(1) {
  animation: slideInFromBehind 0.4s forwards 0.3s; /* Анимация для WhatsApp */
}

/* Анимация появления кнопки для звонка */
.floating-btn-menu a:nth-child(2) {
  animation: slideInSecond 0.3s forwards 0.2s; /* Задержка для первой кнопки */
}

/* Анимация появления кнопки для звонка */
.floating-btn-menu a:nth-child(3) {
  animation: slideInSecond 0.4s forwards 0.1s; /* Задержка для первой кнопки */
}

/* Анимация выдвижения кнопки WhatsApp */
@keyframes slideInFromBehind {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0); /* Начальная скрытая позиция */
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1); /* Окончательная позиция */
  }
}

/* Анимация кнопки звонка */
@keyframes slideInSecond {
  to {
    opacity: 1;
    transform: scale(1) translateY(0); /* Восстановление нормального размера и положения */
  }
}
</style>
