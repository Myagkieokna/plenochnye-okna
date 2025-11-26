<script setup lang="ts">
import { ref, computed, onMounted, provide } from "vue";

import TheHeader from "../components/TheHeader.vue";
import Accordeon from "../components/Accordeon.vue";
import TheFooter from "../components/TheFooter.vue";
import vBtn from "../components/AppButton.vue";
import TabContent from "../components/TabContent.vue";
import btnFloating from "../components/btnFloating.vue";
import Notification from "~/components/Notification.vue";
import FeedbackModal from "~/components/FeedbackModal.vue"
import Gallery from "~/components/Gallery.vue";

import { useNotifications } from '~/composables/useNotifications';
import { tabContents } from "@/data/tabContents";
import { questions as faqQuestions } from "../data/questionsAccordeon";

import "swiper/css";

interface GalleryImage {
  src: string
}

useServerHead({
  title: 'Мягкие окна из гибкого ПВХ в Москве и области — Производство и монтаж под ключ',
  meta: [
    // --- Базовые мета ---
    {
      name: 'description',
      content:
        'Производство и монтаж мягких окон из гибкого ПВХ под ключ. Замер, доставка и установка по Москве и Московской области. Гарантия 10 лет. Прозрачная пленка, доступные цены, качественные материалы.',
    },
    {
      name: 'keywords',
      content:
        'мягкие окна, окна пвх, гибкие окна, мягкие окна под ключ, мягкие окна для веранды, мягкие окна для беседки, мягкие окна москва, установка мягких окон',
    },

    // --- Open Graph ---
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Мягкие окна из гибкого ПВХ' },
    { property: 'og:locale', content: 'ru_RU' },
    { property: 'og:title', content: 'Мягкие окна из гибкого ПВХ — Производство и монтаж под ключ' },
    {
      property: 'og:description',
      content:
        'Изготавливаем и устанавливаем мягкие окна из гибкого ПВХ по индивидуальным размерам. Бесплатный замер, доставка, гарантия качества!',
    },
    { property: 'og:url', content: 'https://plenochnieokna.ru' },
    { property: 'og:image', content: 'https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg' },
    { property: 'og:image:secure_url', content: 'https://example.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg' },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Мягкие окна из гибкого ПВХ — прозрачная защита для террасы и веранды' },

    // --- Facebook / Telegram / WhatsApp ---
    { property: 'fb:app_id', content: '1234567890' },

    // --- Twitter Card ---
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Мягкие окна из гибкого ПВХ — Производство и монтаж под ключ' },
    {
      name: 'twitter:description',
      content:
        'Изготавливаем и устанавливаем мягкие окна из гибкого ПВХ по индивидуальным размерам. Бесплатный замер, доставка, гарантия качества!',
    },
    { name: 'twitter:image', content: 'https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg' },
    { name: 'twitter:image:alt', content: 'Мягкие окна из гибкого ПВХ' },

    // --- VK (специфические теги) ---
    { property: 'vk:image', content: 'https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg' },
    { property: 'vk:title', content: 'Мягкие окна из гибкого ПВХ — Производство и монтаж под ключ' },
    {
      property: 'vk:description',
      content:
        'Производство и монтаж мягких окон из гибкого ПВХ по Москве и области. Бесплатный замер и гарантия качества!',
    },

    // --- Дополнительные ---
    { name: 'author', content: '"Мягкие Окна"' },
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#ffffff' },
  ],

  link: [
    { rel: 'canonical', href: 'https://plenochnieokna.ru' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],

  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Мягкие окна из гибкого ПВХ',
        image: 'https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg',
        url: 'https://plenochnieokna.ru',
        telephone: '+7-966-126-6606',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Москва',
          addressRegion: 'Московская область',
          addressCountry: 'RU',
        },
        openingHours: 'Mo-Su 08:00-22:00',
        priceRange: '₽₽',
        description:
          'Производство и монтаж мягких окон из гибкого ПВХ по Москве и области. Быстро, надежно, с гарантией.',
        makesOffer: [
          {
            '@type': 'Offer',
            name: 'Мягкие окна для веранды',
            priceCurrency: 'RUB',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Монтаж мягких окон под ключ',
            priceCurrency: 'RUB',
            availability: 'https://schema.org/InStock',
          },
        ],
      }),
    },
  ],
})


const containerRef = ref(null)
const swiper = useSwiper(containerRef)
const imageLinks: GalleryImage[] = await $fetch<GalleryImage[]>('/api/images');

const loading = ref(true);
const skeletonCount = 16; // Количество скелетонов для загрузки
const isModalOpen = ref(false);
const currentImage = ref<string | null>(null);

const openModal = (image: string) => {
  currentImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  currentImage.value = null;
  isModalOpen.value = false;
};

// Типы данных
interface Configuration {
  id: number | null;
  name: string;
  title: string;
}

interface DoorOption {
  id: number | null;
  image: string;
  text: string;
}

interface Answer {
  area: number | string | null; // Модифицированная обработка не требует изменения
  doorways: DoorOption | null;  // Структура doorways остается
  // mosquito: string | null;
  mount: string | null;
  configuration: Configuration | null;
  installation: string | null; // Извлекаемый текст заменяет значение
  schedule: string | null;     // Извлекаемый текст заменяет значение
}


interface ContactInfo {
  name: string;
  phone: string;
  message: string;
}


const currentStep = ref(1);

const answers = ref<Answer>({
  area: 1,
  doorways: null,
  // mosquito: null,
  mount: null,
  configuration: null,
  installation: null,
  schedule: null,
});

const contactInfo = ref<ContactInfo>({
  name: "",
  phone: "",
  message: "",
});

// Константы
const steps = [
  "area",
  "doorways",
  // "mosquito",
  "mount",
  "configuration",
  "installation",
  "schedule",
  "contact",
];

// Создаем хук для управления уведомлениями
const { notifications, addNotification, closeNotification } = useNotifications({
  playNotificationSound: () => { /* функция для воспроизведения звука */ },
});

// Пробрасываем данные через provide
provide('notifications', notifications);
provide('addNotification', addNotification);
provide('closeNotification', closeNotification);


const sliderProgressStyle = computed(() => ({
  '--slider-progress': answers.value.area || 0,
}));


// Проверка, можно ли двигаться дальше
const canProceed = computed(() => {
  if (currentStep.value < 7) {
    return !!answers.value[steps[currentStep.value - 1] as keyof Answer];
  } else {
    const isPhoneValid =
      contactInfo.value.phone.replace(/\D/g, "").length === 11; // Убираем нецифровые символы
    return contactInfo.value.name && isPhoneValid;
  }
});

// Функции для переключения шагов
const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// Обработка кнопки "Далее/Отправить"
const handleNext = async () => {
  if (currentStep.value < 7) {
    nextStep();
  } else {
    await sendRequest();
  }
};

// Универсальная функция для получения текста по значению
const getOptionText = (value: string | null, options: Array<{ value: string; text: string }>) => {
  return options.find(option => option.value === value)?.text || value || '';
};

const resetQuiz = () => {
  currentStep.value = 1;

  // Сброс answers в начальное состояние
  answers.value = {
    area: 1,
    doorways: null,
    mount: null,
    configuration: null,
    installation: null,
    schedule: null,
  };

  // Сброс информации о контакте
  contactInfo.value = {
    name: "",
    phone: "",
    message: "",
  };
};

// Функция обработки данных
const processAnswers = (answers: Answer): Answer => {
  const installationText = getOptionText(answers.installation, installOptions); // Получаем текст
  const scheduleText = getOptionText(answers.schedule, scheduleOptions); // Получаем текст

  return {
    ...answers,
    area: `${answers.area} м2`, // Добавляем "м2"
    installation: installationText, // Преобразуем в текст
    schedule: scheduleText, // Преобразуем в текст
  };

};

// Функция для отправки запроса
const sendRequest = async () => {
  try {
    const processedAnswers = processAnswers(answers.value);
    const payload = {
      answers: processedAnswers,
      contactInfo: contactInfo.value,
    };

    console.log("Отправляемые данные:", payload);

    const response = await $fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response) {
      // Яндекс Метрика: отправка цели
      try {
        if (typeof ym === 'function') {
          ym(101397076, 'reachGoal', 'forma_send')
          console.log('Цель отправлена в Яндекс Метрику');
        } else {
          console.warn('Функция ym() не определена');
        }
      } catch (e) {
        console.error('Ошибка при отправке цели в Яндекс Метрику:', e);
      }

      // Уведомление об успешной отправке
      addNotification('Сообщение успешно отправлено!', 'success', true);
      resetQuiz();
    } else {
      addNotification('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.', 'error');
      resetQuiz();
    }
  } catch (err) {
    console.error("Ошибка при отправке:", err);
    addNotification('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.', 'error');
    resetQuiz();
  }
};


// Форматирование номера телефона
const formatPhone = () => {
  const rawValue = contactInfo.value.phone.replace(/\D/g, "");
  let formattedValue = "+7 ";
  if (rawValue.length > 1) formattedValue += `(${rawValue.slice(1, 4)}`;
  if (rawValue.length > 4) formattedValue += `) ${rawValue.slice(4, 7)}`;
  if (rawValue.length > 7) formattedValue += `-${rawValue.slice(7, 9)}`;
  if (rawValue.length > 9) formattedValue += `-${rawValue.slice(9, 11)}`;
  contactInfo.value.phone = formattedValue;
};

function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}



const doorOptions: DoorOption[] = [
  { id: 1, image: "https://cdn.media.marquiz.ru/v1/image/upload/8h4UzM3MZQRtybk3Yeajrk.jpeg?format=webp&amp;func=auto&amp;fit=cover&amp;width=420&amp;height=420&amp;dpr=1", text: "1 проем" },
  { id: 2, image: "https://cdn.media.marquiz.ru/v1/image/upload/rNELhbWUUPdUgD4BHNkk94.jpeg?format=webp&func=auto&fit=cover&width=420&height=420&dpr=1", text: "2 проема" },
  { id: 3, image: "https://cdn.media.marquiz.ru/v1/image/upload/3g2EvKNttmT5oX5na5SRPq.jpeg?format=webp&func=auto&fit=cover&width=420&height=420&dpr=1", text: "3 проема" },
  { id: 4, image: "https://cdn.media.marquiz.ru/v1/image/upload/8vEA7fnjvSASoyFyA3WGBf.jpeg?format=webp&func=auto&fit=cover&width=420&height=420&dpr=1", text: "4 и более проемов" },
];

// const mosquitoOptions = [
//   { value: "yes", text: "Да" },
//   { value: "no", text: "Нет" },
//   { value: "unknown", text: "Пока не знаю" },
// ];

const mountOptions = ["Брус", "Сайдинг", "Оцилиндрованный брус", "Плитка", "Бетонное основание", "Конструкция из металла", "Кирпичное основание", "Другое"];

const configurationOptions = [
  { id: 1, image: "https://cdn.media.marquiz.ru/v1/image/upload/hqfjcwjdgpvpnskasrdj.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Эконом", title: "Без фурнитуры. Пленка 0,7 микрон + окантовка ПВХ" },
  { id: 2, image: "https://cdn.media.marquiz.ru/v1/image/upload/mmtjr4bcfvtkaa4mr7s9.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Стандарт", title: "Пленка 0,7 микрон + окантовка ПВХ + крепления" },
  { id: 3, image: "https://cdn.media.marquiz.ru/v1/image/upload/cpzaow7heqm5xgcsw0v7.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Под ключ", title: "Пленка 0,7 микрон + окантовка ПВХ + крепления и монтаж" },
  { id: 4, image: "https://cdn.media.marquiz.ru/v1/image/upload/kuckrag3tnm7fhaht4sz.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Премиум Под ключ", title: "Пленка 0,7 микрон + окантовка ПВХ + крепления и монтаж. Срок изготовления от 1 до 3-х дней. За срочность +30% от суммы заказа" },
];

const scheduleOptions = [
  { value: "soon", text: "В ближайшее время (10-14 дней)" },
  { value: "express", text: "Кратчайшие сроки (1-3 дней)" },
  { value: "interest", text: "Пока просто интересуюсь" },
];

const installOptions = [
  { value: "self", text: "Справлюсь сам" },
  { value: "need_install", text: "Требуется монтаж" },
  { value: "consult", text: "Проконсультируюсь с вами" },
];

const recomendationItem = [
  {
    title: "АБСОЛЮТНО БЕЗОПАСНЫ ДЛЯ ДЕТЕЙ",
    text: "Мягкое окно нельзя разбить и пораниться, они не имеют запаха",
    icon: "/svg/icons8-zona-dlya-detei-96.png", // Путь к изображению иконки
  },
  {
    title: "ДЕШЕВЛЕ ПЛАСТИКОВЫХ ОКОН В НЕСКОЛЬКО РАЗ",
    text: `Стоимость мягких окон минимум в 2 раза ниже`,
    icon: "/svg/icons8-wallet-96.png",
  },
  {
    title: "ЭСТЕТИЧНЫЕ И ПРИВЛЕКАТЕЛЬНЫЕ",
    text: `Прозрачная пленка ПВХ обладает идеальной светопропускаемостью`,
    icon: "/svg/icons8-heart-961.png",
  },
  {
    title: "НЕ ЖЕЛТЕЕТ НА СОЛНЦЕ",
    text: `Задерживает до 95% ультрафиолета`,
    icon: "/svg/icons8-sun-96.png",
  },
  {
    title: "СРОК СЛУЖБЫ БОЛЕЕ 10 ЛЕТ",
    text: `Реально проверенный срок эксплуатации`,
    icon: "/svg/icons8-calendar-96.png",
  },
  {
    title: "НАДЕЖНАЯ ЗАВЕСА",
    text: `Не деформируется, прочные, эластичные и морозостойкие `,
    icon: "/svg/icons8-protect-96.png",
  },
];

const services = [
  {
    title: "Комплект «Эконом»",
    image: "/img/IMG_5912.jfif",
    description: "Пленка 700 мкм, морозостойкая до -39°C. На выбор 5 цветов окантовки: белый, серый, коричневый, черный, бежевый",
    prices: [
      { old: "", new: "от 1600 руб." },
      { old: "", new: "1200 руб. за м²" },
    ],
    size: ["за м²", "Без окантовки (пленка на отрез)",]
  },
  {
    title: "Комплект «Самомонтаж»",
    image: "/img/IMG_5910.jfif",
    description: "Пленка 700 мкм, морозостойкая до -39. Окантовка пвх цвет коричневый, пластиковая поворотная скоба по бокам, верх саморезы, низ без крепления, без монтажа.",
    prices: [
      { old: "", new: "от 1800 руб." },
      { old: "", new: "" },
      { old: "", new: "Дополнительно (оплачивается отдельно)" },
    ],
    size: ["за м²", "", "Серый, белый, бежевый, черный цвет окантовки за квадратный метр 100р.  Нижнее крепление 200р. за шт (люверс + скоба)"]
  },
  {
    title: "Под ключ",
    image: "/img/IMG_5872.jfif",
    description: "Пленка 700 мкм, морозостойкая до -39°C. Окантовка пвх цвет коричневый, пластиковая поворотная скоба по бокам, верх саморезы, низ без крепления, с монтажом.",
    prices: [
      { old: "", new: "от 35000 руб." },
      { old: "", new: "от 50000 руб." },
      { old: "", new: "от 2500 руб. от 20 м²." },
    ],
    size: ["до 10 м²", "от 10 м² до 20 м²", `Дополнительно (оплачивается отдельно)
    Молнии для входной группы - за погонный метр 1300р`,]
  }
];


const cards = [
  {
    image: "/img/13647644.jpg",
    title: "Выезд замерщика",
    text: "В любой день и время (даже в праздники и выходные), произведем бесплатные замеры и предложим лучшие варианты производства и установки мягких окон.",
    // button: "Заказать рассчет"
  },
  {
    image: "/img/XXL_height.webp",
    title: "ОПЫТНЫЕ БРИГАДЫ МОНТАЖНИКОВ",
    text: "Опыт, который мы нарабатывали, будет применен к Вашему заказу, чтобы результат радовал Вас долгие годы."
  },
  {
    image: "/img/XXL_height1.webp",
    title: "Установка",
    text: "Гарантируем качественный монтаж мягких окон лучшими специалистами, любой сложности, формы и метража",
    // button: "Заказать"
  },
  {
    image: "/img/istock-187398417.jpg",
    title: "КОНКУРЕНТНЫЕ ЦЕНЫ",
    text: "Наши цены соответствуют качеству и доступны для большинства клиентов."
  },
  {
    image: "/img/b7f82cb2bd75744ca9c2a9730cc26cc4.jpeg",
    title: "ГАРАНТИЯ НА РАБОТЫ",
    text: "Мы предоставляем гарантию на все выполненные работы."
  },
  {
    image: "/img/remeshok-dlya-fiksacii-shtory.jpg",
    title: "Доставка",
    text: "При заказе монтажа доставка бесплатно",
    // button: "Заказать"
  },
  {
    image: "/img/PVC-Flexible-Plastic-Sheet.avif",
    title: "ВЫСОКОЕ КАЧЕСТВО МАТЕРИАЛОВ",
    text: "Мы используем только проверенные материалы, которые выдержат испытание временем."
  },
  {
    image: "/img/6631983144.jpg",
    title: "БЫСТРАЯ УСТАНОВКА",
    text: "Мы работаем быстро и качественно, не нарушая оговоренные сроки."
  },
  {
    image: "/img/13.png",
    title: "Производство",
    text: "Изготовим мягкие окна по размерам и требованиям заказчика в кратчайшие сроки",
    // button: "Заказать рассчет"
  },
  {
    image: "/img/541549a6-a184-4cab-8.jpg",
    title: "ИНДИВИДУАЛЬНЫЙ ПОДХОД",
    text: "Каждый клиент для нас особенный, и мы учитываем все ваши пожелания."
  },
];


function selectConfiguration(item: Configuration) {
  answers.value.configuration = item
}

function selectDoorway(item: DoorOption) {  // Указываем тип для item
  answers.value.doorways = item;
}


// Список вкладок
const tabs = [
  { name: "tape", label: "Пленка" },
  { name: "vue", label: "Окантовка" },
  // { name: "grid", label: "Москитная сетка" },
  { name: "accessories", label: "Фурнитура" },
];

// Используем selectedTab как строку
const selectedTab = ref<string>("tape");

// Функция для смены вкладки
const changeTab = (tabName: string) => {
  selectedTab.value = tabName;
};

const questions = ref([
  { title: "Вопрос 1", text: "Ответ 1" },
  { title: "Вопрос 2", text: "Ответ 2" },
]);

const showModal = ref(false);
const faqRef = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;
let lastScrollY = 0;

// следим за состоянием модалки
watch(showModal, (val) => {
  if (val) {
    document.body.classList.add("_lock");
  } else {
    document.body.classList.remove("_lock");
  }
});

onMounted(() => {
  if (faqRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;

          // Проверяем: элемент виден и скролл вниз
          if (
            entry.isIntersecting &&
            currentScrollY > lastScrollY // движение вниз
          ) {
            showModal.value = true; // показываем модалку
            observer?.disconnect(); // отключаем после первого раза
          }

          lastScrollY = currentScrollY;
        });
      },
      { threshold: 0.1 } // сработает, когда 10% блока видно
    );

    observer.observe(faqRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  document.body.classList.remove("_lock");
});



const sendData = async (payload: { name: string; phone: string }) => {
  try {
    const res = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    console.log("Ответ сервера:", data)

    showModal.value = false // закрыть модалку после отправки
  } catch (err) {
    console.error("Ошибка отправки", err)
  }
}

</script>

<template>
  <div>
    <TheHeader />
    <main class="main">
      <section class="hero">
        <div class="container">
          <div class="hero__inner">
            <div class="hero__content">
              <h1 class="hero__title" itemprop="name">
                Мягкие окна из гибкого ПВХ <span class="orange">от 799₽/м²</span>
              </h1>
              <h2 class="hero__subtitle" itemprop="description">
                Производство и монтаж точно в срок по Москве и Московской области
              </h2>
              <ul class="hero__features">
                <li class="hero__feature">
                  <span class="hero__feature-number">1</span>
                  <span class="hero__feature-text">Бесплатный замер</span>
                </li>
                <li class="hero__feature">
                  <span class="hero__feature-number">2</span>
                  <span class="hero__feature-text">Установка под ключ за 1 день</span>
                </li>
                <li class="hero__feature">
                  <span class="hero__feature-number">3</span>
                  <span class="hero__feature-text">Фиксированная стоимость</span>
                </li>
                <li class="hero__feature">
                  <span class="hero__feature-number">4</span>
                  <span class="hero__feature-text">Бесплатная доставка</span>
                </li>
              </ul>
              <div class="hero__buttons">
                <p class="hero__buttons-text">Хотите уточнить детали? Звоните прямо сейчас!</p>
                <div style="display: flex; gap: 2rem;">
                  <nuxt-link class="hero__btn" href="#estimates">Расчет стоимости</nuxt-link>
                  <nuxt-link class="hero__btn" href="tel:+79661266606">Позвонить</nuxt-link>
                </div>
              </div>
            </div>
            <div class="hero__image">
              <img class="hero__image-pattern1" src="public/img/Pattern1.png" alt="Декоративный паттерн">
              <img class="hero__image-pattern2" src="public/img/Pattern2.png" alt="Декоративный паттерн">
              <img class="hero__image-main" src="public/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg"
                alt="Мягкие окна из гибкого ПВХ на веранде">
            </div>
          </div>
        </div>
      </section>
      <div class="feedback-customer" id="smeta">
        <div class="container">
          <div class="feedback-customer__inner">
            <!-- <div class="feedback-customer__title-buttons-wrapper">
            <h2 class="feedback-customer__title">Отзывы клиентов</h2>
          </div> -->
            <div class="feedback-customer__items">
              <div class="feedback" @click="scrollToSection('watermark')">
                <div class="feedback__item">
                  <div class="feedback__item-image" style="position: relative">
                    <img src="~/assets/svg/4db54979-24dc-4cb4-a0fa-54c3e03ab58d.jpg"
                      style="width: 80px; height: 80px; border-radius: 50%;" alt="" />
                  </div>
                  <h2 class="feedback__item-title">Наши работы</h2>
                </div>
              </div>
              <div class="feedback" @click="scrollToSection('price')">
                <div class="feedback__item">
                  <div class="feedback__item-image" style="position: relative">
                    <img src="~/assets/svg/3cb75436-2636-4a15-98f2-01f5116a54b6.jpg"
                      style="width: 80px; height: 80px; border-radius: 50%;" alt="" />
                  </div>
                  <h2 class="feedback__item-title">Услуги</h2>
                </div>
              </div>
              <div class="feedback" @click="scrollToSection('advantages')">
                <div class="feedback__item">
                  <div class="feedback__item-image" style="position: relative">
                    <img src="~/assets/svg/8df28ea8-26c3-4e68-8248-ebbf33ff55a4.jpg"
                      style="width: 80px; height: 80px; border-radius: 50%;" alt="" />
                  </div>
                  <h2 class="feedback__item-title" id="estimates">Наши Преимущества</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="estimates">
        <div class="">
          <h2 class="estimates__title" style="display: flex; justify-content: center; color: #fff;">
            Получить смету
          </h2>
          <p class="estimates__subtitle" style="color: #fff;">
            Вы можете позвонить и все вопросы по телефону уточнить, либо составить
            смету и отправить нам, а мы уже вам перезвоним для ответа
          </p>
        </div>
        <div class="estimates__inner">
          <div class="estimates-form-wrapper">
            <div class="estimates__image"></div>
            <div class="estimates__block">
              <h2 class="estimates__title" style="display: flex; justify-content: center;">
                Получить смету
              </h2>
              <p class="estimates__subtitle">
                Вы можете позвонить и все вопросы по телефону уточнить, либо составить
                смету и отправить нам, а мы уже вам перезвоним для ответа
              </p>
            </div>
          </div>

          <div class="quiz">
            <div class="quiz__inner">
              <!-- Шкала заполнения -->
              <div class="quiz__progress-container">
                <!-- Процент прогресса -->
                <div class="quiz__progress-percent">
                  {{ ((currentStep / steps.length) * 100).toFixed(0) }}%
                </div>

                <!-- Прогресс-бар -->
                <div class="quiz__progress-bar">
                  <div class="quiz__progress-bar-fill" :style="{ width: `${(currentStep / steps.length) * 100}%` }">
                  </div>
                </div>
              </div>
              <div class="quiz__progress-question-step">
                <p>Вопрос {{ currentStep }}</p>
              </div>
              <!-- Контент шагов -->
              <div v-if="currentStep === 1" class="quiz__step">
                <h2 class="quiz__title">
                  Укажите примерную площадь мягкого остекления в м²
                </h2>
                <div class="quiz__slider-container">
                  <!-- Контейнер слайдера -->
                  <div class="quiz__slider-wrapper" :style="sliderProgressStyle">
                    <!-- Слайдер -->
                    <input type="range" min="1" max="100" v-model="answers.area" class="quiz__slider" />
                  </div>
                  <div class="quiz__slider-value-wrapper">
                    <input type="number" min="1" max="100" v-model="answers.area" class="quiz__slider-value" /> м²
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 2" class="quiz__step">
                <h2 class="quiz__title">Сколько будет дверных проемов?</h2>
                <div class="quiz__options">
                  <div v-for="(item, index) in doorOptions" :key="index" @click="selectDoorway(item)"
                    :class="['quiz__option', { 'quiz__option--selected': answers.doorways?.id === item.id }]">
                    <p class="quiz__option-text">{{ item.text }}</p>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 3" class="quiz__step">
                <h2 class="quiz__title">
                  На что будут монтироваться мягкие окна?
                </h2>
                <div class="quiz__radio-group">
                  <label v-for="(option, index) in mountOptions" :key="index" class="quiz__radio-label">
                    <input type="radio" :value="option" v-model="answers.mount" class="quiz__radio-input" />
                    <span class="quiz__radio-span">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 5.4L4.14546 8.22183C4.54054 8.64324 5.20946 8.64324 5.60454 8.22183L10.5 3"
                          stroke="#0C1132" stroke-width="2" stroke-linecap="round" />
                      </svg>
                    </span>
                    <p>{{ option }}</p>
                  </label>
                </div>
              </div>

              <div v-if="currentStep === 4" class="quiz__step">
                <h2 class="quiz__title">Какая комплектация необходима?</h2>
                <div class="quiz__equipments">
                  <div v-for="(item, index) in configurationOptions" :key="index" @click="selectConfiguration(item)"
                    :class="[
                      'quiz__option quiz__equipment-item',
                      {
                        'quiz__option--selected':
                          answers.configuration?.id === item.id,
                      },
                    ]">
                    <div class="quiz__equipment-block-text">
                      <p class="quiz__equipment-text">{{ item.name }}</p>
                      <h4 class="quiz__equipment-title">{{ item.title }}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 5" class="quiz__step">
                <h2 class="quiz__title">Установите сами или нужен монтаж?</h2>
                <div class="quiz__radio-group">
                  <label v-for="(option, index) in installOptions" :key="index" class="quiz__radio-label">
                    <input type="radio" :value="option.value" v-model="answers.installation"
                      class="quiz__radio-input" />
                    <span class="quiz__radio-span"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 5.4L4.14546 8.22183C4.54054 8.64324 5.20946 8.64324 5.60454 8.22183L10.5 3"
                          stroke="#0C1132" stroke-width="2" stroke-linecap="round" />
                      </svg></span>
                    <p class="text">{{ option.text }}</p>
                  </label>
                </div>
              </div>

              <div v-if="currentStep === 6" class="quiz__step">
                <h2 class="quiz__title">
                  Когда планируете устанавливать мягкие окна?
                </h2>
                <div class="quiz__radio-group">
                  <label v-for="(option, index) in scheduleOptions" :key="index" class="quiz__radio-label">
                    <input type="radio" :value="option.value" v-model="answers.schedule" class="quiz__radio-input" />
                    <span class="quiz__radio-span"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 5.4L4.14546 8.22183C4.54054 8.64324 5.20946 8.64324 5.60454 8.22183L10.5 3"
                          stroke="#0C1132" stroke-width="2" stroke-linecap="round" />
                      </svg></span>
                    <p>{{ option.text }}</p>
                  </label>
                </div>
              </div>

              <div v-if="currentStep === 7" class="quiz__step">
                <p class="quiz__title">
                  Заполните контактную информацию и с вами обязательно свяжутся в ближайшее время
                </p>
                <div class="contact-form">
                  <form class="contact-form__form" @submit.prevent="sendRequest">
                    <div class="contact-form__form-field-block">
                      <div class="contact-form__field">
                        <label class="contact-form__label" for="name">Имя</label>
                        <input class="contact-form__input" type="text" id="name" v-model="contactInfo.name" required />
                      </div>
                      <div class="contact-form__field">
                        <label class="contact-form__label" for="phone">Телефон</label>
                        <input class="contact-form__input" type="text" id="phone" v-model="contactInfo.phone"
                          @input="formatPhone" placeholder="+7 (___) ___-__-__" required />
                      </div>
                    </div>
                    <div class="contact-form__field">
                      <label class="contact-form__label" for="message">Комментарий</label>
                      <textarea class="contact-form__input contact-form__input-textarea" id="message"
                        v-model="contactInfo.message" style="width: 100%;"></textarea>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Управление -->
              <div class="quiz__controls">
                <button class="quiz__button quiz__button--prev" @click="prevStep" :disabled="currentStep === 1">
                  Назад
                </button>
                <button class="quiz__button quiz__button--next" @click="handleNext" :disabled="!canProceed">
                  {{ currentStep < 7 ? "Далее" : "Отправить" }} </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="price" id="price">
        <div class="container">
          <div class="price__inner">
            <h2 class="price__title">
              Стоимость <span class="orange">Мягких Окон</span> в готовой
              комплектации
            </h2>
            <h3 class="price__subtitle">Мы работаем максимально прозрачно: у нас нет ситуации, когда по телефону
              называется одна цена, а при
              визите замерщика сумма оказывается выше. Все расчёты честные, без скрытых условий и сюрпризов.</h3>
            <div class="price-table">
              <div class="price-table__row" :class="{
                'price-table__row--econom': index === 0,
                'price-table__row--samomontazh': index === 1,
                'price-table__row--podklyuch': index === 2
              }" v-for="(item, index) in services" :key="index">
                <!-- Первая ячейка -->
                <div class="price-table__cell">
                  <div class="service-info">
                    <img :src="item.image" :alt="item.description" class="service-info__image" />
                    <div class="service-info__block">
                      <h3 class="service-info__title">{{ item.title }}</h3>
                      <p class="service-info__description">{{ item.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Остальные ячейки -->
                <template v-if="index === 1">
                  <!-- Самомонтаж -->
                  <div class="price-table__cell">
                    <span class="old-price">{{ item.prices[0].old }}</span>
                    <span class="new-price">{{ item.prices[0].new }}</span>
                    <span class="price-table__cell-text-gray">{{ item.size[0] }}</span>
                  </div>
                  <div class="price-table__cell price-table__cell--wide">
                    <span class="old-price">{{ item.prices[2].old }}</span>
                    <span class="new-price">{{ item.prices[2].new }}</span>
                    <span class="price-table__cell-text-gray">{{ item.size[2] }}</span>
                  </div>
                </template>

                <template v-else>
                  <!-- Обычные ряды -->
                  <div class="price-table__cell" v-for="(price, i) in item.prices" :key="i">
                    <span class="old-price">{{ price.old }}</span>
                    <span class="new-price">{{ price.new }}</span>
                    <span class="price-table__cell-text-gray">{{ item.size[i] }}</span>
                  </div>
                </template>
              </div>
            </div>

          </div>
        </div>
      </div>

      <section class="recomendation" id="advantages" ref="faqRef">
        <div class="container">
          <div class="recomendation__inner">
            <h2 class="recomendation__title">
              Преимущества мягких окон из <span class="orange"> ПВХ</span>
            </h2>
            <div class="recomendation__block-image">
              <img src="~/assets/img/e2e51fae-f4df-4a6b-ad8a-78d5f228a5ad.jpg" class="recomendation__block-top-image"
                alt="" />
              <!-- <img
              src="~/assets/img/IMG_7449.jfif"
              class="recomendation__block-bottom-images"
              alt=""
            />
            <img
              src="~/assets/img/IMG_7823.jfif"
              class="recomendation__block-bottom-images"
              alt=""
            />
            <img
              src="~/assets/img/_.jfif"
              class="recomendation__block-bottom-images"
              alt=""
            /> -->
            </div>
            <div class="recomendation__block-text">
              <p>
                Мягкие окна – это изделие из плотной ПВХ пленки, окантованной по
                периметру армированной тентовой тканью особой прочности. Идеальная
                защита от любых погодных условий и насекомых!
              </p>
              <p>
                В последнее время окна из ПВХ пользуются высоким спросом среди
                владельцев беседок, веранд и террас. Рулонные шторы
                многофункциональны и прекрасно вписываются в экстерьер – многие
                именно поэтому предпочитают устанавливать такие конструкции на
                своих верандах и беседках.
              </p>
            </div>
            <ul class="recomendation__list">
              <li class="recomendation__list-item">
                Пленка ПВХ после монтажа на проем приобретает вид стекла и имеет
                светопропускаемость более 95%
              </li>
              <li class="recomendation__list-item">
                Тентовая окантовка предназначена для уменьшения воздействий
                сезонных температурных перепадов на прозрачное мягкое стекло, тем
                самым гарантируя долгую эксплуатацию изделий.
              </li>
              <li class="recomendation__list-item">
                Мягкие окна легко монтируются на любую поверхность и не требуют
                доработок проема под их установку.
              </li>
              <li class="recomendation__list-item">
                Легко скручиваются в рулон в хорошую погоду и открывают панорамный
                вид на участок.
              </li>
            </ul>
            <div class="recomendation__block-items">
              <div class="recomendation__item" v-for="(item, index) in recomendationItem" :key="index">
                <div class="recomendation__item-icon">
                  <img :src="item.icon" :alt="item.text" />
                </div>
                <h3 class="recomendation__item-title">{{ item.title }}</h3>
                <p class="recomendation__item-text">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="why" id="why">
        <h2 class="why__title">Почему выбирают <span class="orange">нас?</span></h2>
        <div class="why__inner">
          <ClientOnly>
            <swiper-container ref="containerRef" :slides-per-view="5" :space-between="60" :breakpoints="{
              0: {
                spaceBetween: 20,
                slidesPerView: 1,
              },
              479: {
                spaceBetween: 30,
                slidesPerView: 1,
              },
              575: {
                slidesPerView: 1.5,
              },
              768: {
                spaceBetween: 40,
                slidesPerView: 2,
              },
              1024: {
                spaceBetween: 40,
                slidesPerView: 2.5,
              },
              1440: {
                spaceBetween: 40,
                slidesPerView: 3.5,
              },
              1920: {
                slidesPerView: 4,
              },
              2560: {
                spaceBetween: 60,
                slidesPerView: 4,
              }
            }" class="why__slider">
              <swiper-slide v-for="(card, idx) in cards" :key="idx" class="why__card">
                <div class="why__image">
                  <img :src="card.image" :alt="card.text" />
                </div>
                <div class="why__header">
                  <svg class="why__card-arc" xmlns="http://www.w3.org/2000/svg">
                    <path></path>
                  </svg>
                  <h3 class="why__card-title">{{ card.title }}</h3>
                  <p class="why__card-text">{{ card.text }}</p>
                </div>
              </swiper-slide>
            </swiper-container>
          </ClientOnly>
        </div>
      </section>

      <!-- <div class="mosquito-table">
      <div class="container">
        <div class="mosquito-table__inner">
          <h2 class="price__title">
            Москитная <span class="orange">Сетка</span>
          </h2>
          <div class="price-table">
            <div class="price-table__row price-table__header">
              <div class="header__cell">Наименование</div>
              <div class="header__cell">До 15 м²</div>
              <div class="header__cell">От 15 м² до 50 м²</div>
              <div class="header__cell">Более 50 м²</div>
            </div>
            <div class="price-table__row">
              <div class="price-table__cell">
                <div class="service-info">
                  <img
                    src="~/assets/img/photo_2023-01-20_09-.jpg"
                    alt="Комплект «Москитная сетка»"
                    class="service-info__image"
                  />
                  <div class="service-info__content">
                    <h3 class="service-info__title">
                      Комплект «Москитная сетка»
                    </h3>
                    <p class="service-info__description">
                      Москитная Сетка Ю. Корея плотность 250 г.м с армированной
                      нитью, морозостойкая до -35°C, окантовка ПВХ или Оксфорд,
                      (без фурнитуры)
                    </p>
                  </div>
                </div>
              </div>
              <div class="price-table__cell">
                <span v-if="isMobile">
                  от 1200 руб. <span class="price-table__cell-text-gray">До 15 м²</span>
                </span>
                <span v-else>от 1200 руб.</span>
              </div>
              <div class="price-table__cell">
                <span v-if="isMobile">
                  от 1100 руб. <span class="price-table__cell-text-gray">От 15 м² до 50 м²</span>
                </span>
                <span v-else>от 1100 руб.</span>
              </div>
              <div class="price-table__cell">
                <span v-if="isMobile">
                  от 1000 руб. <span class="price-table__cell-text-gray">Более 50 м²</span>
                </span>
                <span v-else>от 1000 руб.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

      <section class="material" id="material">
        <div class="container">
          <div class="material__inner">
            <h2 class="material__title"><span class="orange" style="margin-left: 0;">Материалы,</span> крепления и
              фурнитура</h2>
            <p class="material__block-text">Компания Мягкие Окна России располагает собственными производственными
              мощностями для изготовления мягких окон. Поэтому все необходимые для производства материалы, всегда есть в
              наличии на нашем складе. Вам не придется дополнительно ждать поставки нужных комплектующих от посредника
              или изготовителя на стороне. Заказывая окна ПВХ в нашей компании, будьте уверены — выбранный вами материал
              мягких окон проверен нами на практике и отличается высоким качеством.
              Чтобы вы могли лучше разобраться в ассортименте и понять, какие материалы подобрать для своей постройки,
              предлагаем вам ознакомиться с описанием и характеристиками всех компонентов для окон ПВХ.
            </p>
            <div class="material__wrapper-block-img-list">
              <ul class="material__list">
                <li class="material__list-title">
                  Виды материалов для мягких окон:
                </li>
                <li class="material__list-item">
                  1. <strong class="material__list-item-strong">Пленка ПВХ</strong> — основной элемент в конструкции
                  мягких окон.
                </li>
                <li class="material__list-item">
                  2. <strong class="material__list-item-strong">Окантовка</strong> — материал обрамления периметра окон
                  ПВХ. Именно в окантовку встраивается фурнитура для крепления к каркасу постройки.
                </li>
                <li class="material__list-item">
                  3. <strong class="material__list-item-strong">Фурнитура (крепления)</strong> — вариации крепления окон
                  к материалу постройки. Различаются по надежности посадки окна к месту монтажа и удобству.
                </li>
                <li class="material__list-item">
                  4. <strong class="material__list-item-strong">Двусторонняя молния</strong> — применяется для дверных
                  проемов. Упрощает вход и выход из помещения
                </li>
                <li class="material__list-item">
                  5. <strong class="material__list-item-strong">Москитная сетка</strong> — дополнительный атрибут
                  (приобретается отдельно либо в комплекте с окном).
                </li>
              </ul>
              <div class="material__images">
                <img src="~/assets/img/76636daefdd44b058addb6c6bd1ac107.jpg" alt="Мягкие окна из ПВХ для дачи">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tabs">
        <div class="container">
          <div class="tabs__inner">
            <div class="tabs__buttons">
              <span v-for="tab in tabs" :key="tab.name"
                :class="['tabs__button', { selected: tab.name === selectedTab }]" @click="changeTab(tab.name)">
                {{ tab.label }}
              </span>
            </div>
            <TabContent :content="tabContents[selectedTab]" />
          </div>
        </div>
      </section>

      <section class="watermark" id="watermark">
        <div class="container">
          <div class="watermark__inner">
            <h2 class="watermark__title">Наши <span class="orange">работы</span></h2>
            <Gallery :images="imageLinks" />
          </div>
        </div>
      </section>

      <section class="faq" id="faq">
        <div class="container">
          <div class="faq__inner">
            <h2 class="faq__title">Частые вопросы</h2>
            <div class="faq__items">
              <Accordeon :questions="faqQuestions" />
            </div>
          </div>
        </div>
      </section>

      <!-- Модалка -->
      <FeedbackModal v-if="showModal" @close="showModal = false" @submit="sendData" />
      <btnFloating />
      <Notification />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-top: 25.3rem;
}

@media (max-width: 1099.98px) {
  .main {
    margin-top: 16.5rem;
  }
}

@media (max-width: 480px) {
  .main {
    margin-top: 14.5rem;
  }
}

@media (max-width: 391px) {
  .main {
    margin-top: 13rem;
  }
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 1.5rem;
  font-size: 1.4rem;
}

.watermark-img {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Обеспечиваем, чтобы изображения заполнили ячейку грида без искажения */
  object-position: center;
  /* Центрируем изображение в ячейке */
}

.watermark-else {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  /* Устанавливаем gap на 1rem */
  padding: 0;
  /* Убираем внутренние отступы */
}

.watermark-img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.tabs {
  margin-bottom: 14rem;

  &__inner {
    background-color: #212121;
    border-radius: 2rem;
    gap: 3rem;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
  }

  &__button {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    color: #fff;
    padding: 2rem 3rem;
    border-radius: 10px;
    transition: all 0.25s;
    cursor: pointer;

    &:hover {
      background-color: rgb(167 229 247);
    }

    &.selected {
      background-color: #82dbf7;
    }
  }
}

.watermark {
  margin-bottom: 14rem;

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 4rem;
  }



  @media (max-width: 979.98px) {
    &__title {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 767.98px) {
    &__title {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 479.98px) {
    &__title {
      font-size: 2.3rem;
    }
  }
}


.material {
  margin-bottom: 14rem;

  &__inner {}

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 4rem;
  }

  &__block-text {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    display: flex;
    align-items: center;
    color: #cfcfcf;
    margin-bottom: 4rem;
  }

  &__wrapper-block-img-list {
    display: flex;
    gap: 5rem;
  }

  &__list {
    width: 50%;
  }

  &__list-title {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 1.5rem;
  }

  &__list-item {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #cfcfcf;
  }

  &__list-item-strong {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    color: #fff;
  }

  &__images {
    width: 50%;

    & img {
      max-width: 100%;
      height: auto;
      border-radius: 2rem;
    }
  }

  @media (max-width: 979.98px) {
    &__title {
      font-size: 3.2rem;
    }

    &__wrapper-block-img-list {
      flex-direction: column-reverse;
    }

    &__images {
      width: 100%;
    }

    &__list {
      width: 100%;
    }
  }

  @media (max-width: 767.98px) {
    &__title {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 479.98px) {
    &__title {
      font-size: 2.3rem;
    }
  }

  @media (max-width: 479.98px) {
    &__list-title {
      font-size: 1.8rem;
    }

    &__list-item-strong {
      font-size: 1.6rem;
    }

    &__block-text {
      font-size: 1.6rem;
    }

    &__list-item {
      font-size: 1.6rem;
    }
  }
}

.why {
  margin-bottom: 14rem;

  &__inner {
    margin: 0 auto;
    overflow-x: hidden;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      background: linear-gradient(180deg, rgb(255 255 255 / 0%) 50%, #82dbf7 100%);
      width: 100%;
      height: 35rem;
      top: 0;
    }
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    margin: 0 auto;
    color: #ffffff;
    text-align: center;
    margin-bottom: 4rem;
  }

  &__slider {
    width: 100%;
    /* Устанавливает ширину контейнера слайдера */
    padding: 2rem 2rem;
    overflow: visible;
  }

  &__card {
    position: relative;
  }

  &__card-arc {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 100%;
    right: 0;
    z-index: 1;

    & path {
      fill: #fff;
      d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
    }
  }

  &__image {
    height: 60rem;

    &>img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 60rem;
      border-radius: 2.5rem 2.5rem 2.8rem 2.8rem;
    }
  }

  &__header {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #212121;
    border-radius: 2.5rem 0rem 2.5rem 2.5rem;
    // padding: 15px 25px;
    padding: 15px;
    width: 100%;
  }

  &__card-title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 150%;
    display: flex;
    text-align: start;
    color: #fff;
    text-transform: uppercase
  }

  &__card-text {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    text-align: start;
    display: flex;
    color: #cfcfcf;
  }

  // &__card-button-wrapper {
  //   width: 100%;
  //   display: flex;
  //   justify-content: end;
  // }

  // &__card-button {
  //   margin-top: 1.5rem;
  //   font-family: Unbounded;
  //     font-style: normal;
  //     font-weight: 500;
  //     line-height: 150%;
  //     padding: 13px 25px;
  //     font-size: 1.6rem;
  //     border: none;
  //     border-radius: 8px;
  //     cursor: pointer;
  //     transition: background-color 0.3s ease;
  //     background-color: #212121;
  //     color: #fff;
  // }

  @media (max-width: 979.98px) {
    &__title {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 767.98px) {
    &__title {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 575.98px) {
    .why__image {
      height: 45rem !important;
    }

    .why__card-title {
      font-size: 1.7rem;
    }

    .why__card-text {
      font-size: 1.6rem;
    }

    .why__image>img {
      height: 45rem;
    }
  }

  @media (max-width: 479.98px) {
    // &__card-button {
    //   padding: 10px 20px;
    //   font-size: 1.4rem;

    // }

    &__title {
      font-size: 2.3rem;
    }

    .why__card-title {
      font-size: 1.6rem;
    }

    .why__card-text {
      font-size: 1.5rem;
    }

    .why__image>img {
      height: 40rem;
    }
  }

  @media (max-width: 379.98px) {

    .why__image {
      height: 35rem !important;
    }

    .why__card-title {
      font-size: 1.6rem;
    }

    .why__card-text {
      font-size: 1.5rem;
    }

    .why__image>img {
      height: 35rem;
    }
  }

}

.estimates {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0px 15px;
  padding-bottom: 14rem;

  &__inner {
    background: #212121;
    display: flex;
    padding: 2rem;
    border-radius: 30px;
  }

  &__block {
    position: relative;
    z-index: 1;
    max-width: 60rem;
  }

  &__title {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 600;
    font-size: 3rem;
    line-height: 150%;
    color: #212121;
    margin-bottom: 3rem;
  }

  &__subtitle {
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    text-align: center;
    max-width: 85rem;
    margin: 0 auto;
    color: #212121;
    margin-bottom: 1.5rem;

    @media (max-width:1365.98px) {
      font-size: 1.7rem;
    }
  }
}

@media (max-width: 479.98px) {
  .estimates__inner {
    padding: 0;
  }
}

.estimates-form-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  width: 40%;
  flex-direction: column;
  gap: 5rem;
  overflow: hidden;
  border-radius: 20px 0px 0px 20px;
  padding: 2rem;
  background: #fff;
}

@media (max-width:1199.98px) {
  .estimates-form-wrapper {
    display: none;
  }
}


.estimates__image {
  position: absolute;
  width: 100%;
  background-image: url("~/assets/img/artistic-blurry-colorful-wallpaper-background_58702-8245.avif");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  filter: blur(160px);
}


.contact-form {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  &__form-field-block {
    gap: 5rem;
    display: flex;
  }

  &__field {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 1rem;
  }

  &__input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #393939;
    color: #fff;
    border-radius: 5px;
    background: #212121;
  }

  &__input-textarea {
    height: 15rem;
    resize: none;
  }

  &__button {
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
}


/* Основной контейнер квиза */
.quiz {
  width: 60%;
  background: #191919;
  border-radius: 0px 20px 20px 0px;
  padding: 5rem 7rem;

  &__inner {
    background: #212121;
    display: flex;
    height: 100%;
    max-height: 80rem;
    flex-direction: column;
    padding: 5rem 8rem;
    border-radius: 15px;
  }

  &__progress-container {
    position: relative;
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: row-reverse;
    gap: 2rem;
    margin-bottom: 10rem;
  }

  &__progress-percent {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 8px;
    color: #fff;
    /* Цвет текста процента */
  }

  &__progress-bar {
    width: 100%;
    height: 1.5rem;
    background-color: #393939;
    /* Цвет фона шкалы */
    border-radius: 8px;
    position: relative;
  }

  &__progress-bar-fill {
    height: 100%;
    background-color: #82DBF7;
    /* Фиолетовый цвет заполненной части */
    border-radius: 8px;
    transition: width 0.15s ease;
  }

  &__progress-question-step {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
    margin-bottom: 5rem;
  }

  &__step {
    overflow: auto;
    flex: 1;
    margin-bottom: 20px;
    padding-right: 15px;
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #fff;
    margin-bottom: 2rem;
  }

  &__slider-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    width: 100%;
  }

  &__slider-wrapper {
    position: relative;
    width: 100%;
  }

  &__slider-wrapper::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 26px;
    border-radius: 8px;
    background-color: #82dbf7;
    /* Фиолетовая цветная часть */
    transition: width 0.1s linear;
    width: calc(var(--slider-progress, 0%) * 1%);
    /* Динамическая ширина */
    pointer-events: none;
  }

  &__slider {
    -webkit-appearance: none;
    /* Убираем стандартный стиль слайдера */
    appearance: none;
    width: 100%;
    /* Ширина слайдера */
    max-width: none;
    height: 26px;
    background-color: #393939;
    /* Серый фон шкалы */
    border-radius: 8px;
    outline: none;
    position: relative;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 0;
      height: 0;
      background: transparent;
    }

    &::-moz-range-thumb {
      width: 0;
      height: 0;
      background: transparent;
    }
  }

  &__slider-value-wrapper {
    display: flex;
    align-items: center;
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #fff;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  &__slider-value {
    border: 1px solid #363A3D;
    border-radius: 8px;
    padding: 0px 16px;
    background: #1A1D21;
    height: 48px;
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.01em;
    color: #CDCECF;
    width: 6.5rem;
  }

  &__slider-value::-webkit-outer-spin-button,
  &__slider-value::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &__slider-value {
    -moz-appearance: textfield;
    /* Firefox */
  }

  &__options {
    gap: 20px;
    padding: 25px;
    display: flex;
    flex-direction: column;
  }

  &__option {
    cursor: pointer;
    border: 2px solid #393939;
    text-align: center;
    border-radius: 1rem;
    transition: all 0.3s ease;
    width: fit-content;
    padding: 0 2rem;

    &--selected {
      border-color: #676767;
      background-color: #393939;

      &::before {
        content: "";
        position: absolute;
        top: -10px;
        right: -10px;
        width: 20px;
        height: 20px;
        background-color: #212121;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s ease;
      }

      &::after {
        content: '';
        position: absolute;
        top: -8px;
        right: -7.5px;
        color: #fff;
        opacity: 0;
        transition: all 0.3s ease;
        background: url(../assets/svg/icons8-done-16.png);
        width: 1.6rem;
        height: 1.6rem;
      }
    }

    // Плавное появление при добавлении класса
    &--selected::before {
      opacity: 1;
    }

    &--selected::after {
      opacity: 1;
    }

  }

  &__option-image {
    max-width: 100%;
    height: auto;
    border-radius: 1rem 1rem 0rem 0rem;
  }

  &__option-text {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 150%;
    color: #fff;
    padding: 15px 5px;
  }

  &__equipments {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
    width: 100%;
    gap: 20px;
  }

  &__equipment-item {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 2.5rem;
    border-radius: 15px;
  }

  &__equipment-image {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
  }

  &__equipment-block-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__equipment-text {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    color: #fff;
    font-size: 1.8rem;
    text-align: start;
  }

  &__equipment-title {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 160%;
    text-align: start;
    color: #cfcfcf;
  }

  &__radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__radio-label {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 150%;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  &__radio-span {
    width: 24px;
    height: 24px;
    border-radius: 100px;
    // background-color: #16191C;
    display: inline-block;
    transition: all linear 0.3s;
    fill: #007bff;
    border: 1px solid #393939;
    position: relative;

    &>svg {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      visibility: hidden;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__radio-input {
    display: none;

    &:checked~span {
      background-color: #82dbf7;
      border-color: #82dbf7;

      &>svg {
        visibility: visible;
      }
    }
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__button {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 150%;
    padding: 13px 25px;
    font-size: 1.6rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    max-width: 25rem;

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__button--prev {
    color: #676767;

    &:hover {
      color: #fff;
    }
  }

  &__button--next {
    background-color: #fff;
    color: #212121;

    &:hover {
      background-color: #cccccc;
    }
  }
}

@media (max-width: 1599.98px) {
  .quiz {
    padding: 3rem 5rem;
  }
}

@media (max-width: 1366px) {
  .quiz {
    &__title {
      font-size: 1.7rem;
    }

    &__progress-question-step {
      font-size: 2.5rem;
    }

    &__inner {
      padding: 4rem 5rem;
    }
  }
}

@media (max-width:1199.98px) {
  .quiz {
    width: 100%;
    background: #191919;
    padding: 3rem 5rem;
    // height: 100vh;
    border-radius: 20px;
  }
}

@media (max-width: 767.98px) {
  .quiz {
    padding: 0;
  }

  .quiz__inner {
    padding: 2rem 2rem;
    max-height: 60rem;
  }

  .quiz__progress-container {
    margin-bottom: 3rem;
  }
}

@media (max-width:479.98px) {
  .quiz__inner {
    padding: 2rem;
    border-radius: 30px;
  }

  .quiz__equipments {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }

  .quiz__options {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }

  .quiz__title {
    font-size: 1.6rem;
  }

  .quiz__progress-question-step {
    font-size: 2rem;
    margin-bottom: 3.5rem;
  }

  .quiz__equipment-text {
    font-size: 1.6rem;
  }
}

.hero {
  padding-top: 5rem;

  &__inner {
    display: flex;
    gap: 2.5rem;
  }

  &__content {
    position: relative;
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    margin-bottom: 2.4rem;
  }

  &__subtitle {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    text-align: center;
    color: #dbdbdb;
    margin-bottom: 4rem;
  }

  &__buttons {
    margin-top: 6rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #dbdbdb;
  }

  &__btn {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 133%;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition-duration: 0.15s;
    max-width: 45rem;
    background: #82DBF7;
    padding: 1.5rem 3rem;
    width: 100%;
    color: #212121;

    &:hover {
      background: rgb(167 229 247);
    }
  }

  &__features {
    gap: 2rem;
    display: flex;
    flex-direction: column;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__feature-number {
    min-width: 4.8rem;
    height: 4.8rem;
    background-color: #82DBF7;
    display: flex;
    color: #1A1D21;
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 2.1rem;
    line-height: 150%;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 1.2rem;
  }

  &__feature-text {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 150%;
    color: #fff;
  }

  &__image {
    max-width: 62rem;
    min-width: 55rem;
    padding: 3.4rem;
    position: relative;
  }

  &__image>img {
    height: 100%;
    width: 100%;
  }

  &__image-main {
    position: relative;
    z-index: 1;
    border-radius: 2.4rem;
    object-fit: cover
  }

  &__image-pattern1 {
    position: absolute;
    max-width: 13rem;
    max-height: 13rem;
    left: 0;
    top: 0;
    z-index: 2;
  }

  &__image-pattern2 {
    position: absolute;
    max-width: 14.9rem;
    max-height: 9.1rem;
    bottom: 0;
    right: 0;
  }

  &__button {
    margin-bottom: 4rem;
    padding: 1.8rem 3.2rem;
    width: 100%;
  }

  @media (max-width: 979.98px) {
    &__inner {
      flex-direction: column;
      align-items: center;
    }

    &__features {
      margin: 0 auto;
      max-width: fit-content;
    }

    &__buttons {
      margin: 0 auto;
      margin-top: 6rem;
      max-width: fit-content;
      text-align: center;
    }

    &__image {
      max-width: none;
      min-width: auto;
    }
  }

  @media (max-width: 767.98px) {
    &__image {
      padding: 2.8rem;
    }

    &__image-pattern1 {
      max-width: 9rem;
      max-height: 9rem;
    }

    &__image-pattern2 {
      max-width: 10.9rem;
      max-height: 7.1rem;
    }
  }

  @media (max-height: 650px) {
    &__content {
      padding-top: 5rem;
    }
  }

  @media (max-width: 575.98px) {
    &__title {
      font-size: 3rem;
    }

    &__image {
      padding: 2rem;
    }

    &__image-pattern1 {
      max-width: 7rem;
      max-height: 7rem;
    }

    &__image-pattern2 {
      max-width: 8.9rem;
      max-height: 5.1rem;
    }
  }

  @media (max-height: 470px) {
    &__content {
      padding-top: 2rem;
    }
  }

  @media (max-width: 379.98px) {
    &__title {
      font-size: 2.5rem;
    }

    &__subtitle {
      font-size: 1.6rem;
    }

    &__button {
      padding: 1.4rem 2.5rem;
    }

    &__feature-text {
      font-size: 1.5rem;
    }
  }
}

.recomendation {
  margin-bottom: 14rem;

  &__inner {}

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 4rem;
  }

  &__block-image {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 4rem;

    &>img {
      width: 100%;
      border-radius: 15px;
    }
  }

  &__block-top-image {
    grid-column: span 3;
    /* верхняя картинка занимает всю ширину */
    grid-row: 1;
    /* верхняя строка */
    height: 600px;
    /* фиксированная высота для верхней картинки */
    object-fit: cover;
  }

  &__block-bottom-images {
    height: 100%;
    /* сохранение пропорций */
    grid-column: span 1;
    /* каждая картинка занимает одну ячейку */
  }

  &__block-text {
    margin-bottom: 3rem;

    &>p {
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 1.8rem;
      line-height: 160%;
      display: flex;
      align-items: center;
      color: #cfcfcf;
    }
  }

  &__list {
    margin-left: 3.5rem;
    margin-bottom: 4rem;
  }

  &__list-item {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    display: flex;
    align-items: center;
    color: #cfcfcf;
    position: relative;
    padding-left: 15px;
  }

  &__list-item::before {
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    top: 11.5px;
    left: 0;
    background-color: #cfcfcf;
    border-radius: 50%;
  }

  &__block-items {
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(3, 1fr);
    /* 3 колонки одинаковой ширины */
    grid-template-rows: auto auto;
    /* 2 ряда */
    width: 100%;
  }

  &__item {
    width: 100%;
    padding: 3rem;
    background-color: #212121;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    border: 1px solid #393838;
  }

  &__item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #292929;
    filter: blur(10px);
    /* Применить эффект размытия */
    z-index: -1;
    /* Поместить за контент */
    border-radius: 15px;
  }

  &__item-icon {
    margin-bottom: 3rem;
    background-color: #292929;
    display: inline-flex;
    padding: 1rem;
    border-radius: 10px;
  }

  &__item-icon img {
    width: 50px;
    height: 50px;
  }

  &__item-title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 1.9rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #fff;
    margin-bottom: 1rem;
  }

  &__item-text {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    display: flex;
    align-items: center;
    color: #cfcfcf;
    max-width: 46.1rem;
  }

  @media (max-width:1199.98px) {
    &__block-items {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto auto auto;
    }
  }

  @media (max-width: 979.98px) {
    &__title {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 767.98px) {
    &__title {
      font-size: 2.8rem;
    }

    &__block-items {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: auto;
    }

    &__block-image {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }

    &__block-top-image {
      grid-column: auto;
      height: auto;
    }
  }

  @media (max-width: 575.98px) {
    &__item-title {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 479.98px) {
    &__title {
      font-size: 2.3rem;
    }

    &__item-title {
      font-size: 1.7rem;
    }

    &__item-text {
      font-size: 1.6rem;
    }

    &__block-text {
      &>p {
        font-size: 1.6rem;
      }
    }

    &__list {
      margin-left: 1.5rem;
    }

    &__list-item {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 379.98px) {
    &__item-title {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 319.98px) {
    &__title {
      font-size: 2rem;
    }
  }
}

.price {
  margin-bottom: 14rem;

  &__inner {}

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 150%;
    color: #fff;
    max-width: 90rem;
    margin-bottom: 4rem;
  }

  @media (max-width: 1365.98px) {
    &__title {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 767.98px) {
    &__title {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 479.98px) {
    &__title {
      font-size: 2.3rem;
    }
  }




}

.price-table {
  display: grid;
  // grid-template-columns: 1.5fr 1fr 1fr 1fr; // по умолчанию 4 колонки
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 35px 12px rgb(255 255 255 / 0%);

  &__row {
    display: grid;
    gap: 1rem;
    width: 100%;
  }

  /* Эконом — 3 колонки */
  &__row--econom {
    grid-template-columns: 1.5fr 1.5fr 1.5fr;
  }

  /* Самомонтаж — 3 колонки */
  &__row--samomontazh {
    grid-template-columns: 1.5fr 1.5fr 1.5fr;
  }

  /* Под ключ — 4 колонки */
  &__row--podklyuch {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1.5fr 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "cell1 cell2 cell3"
      "cell1 cell4 cell4";
  }

  &__row--podklyuch>&__cell:nth-child(1) {
    grid-area: cell1;
  }

  &__row--podklyuch>&__cell:nth-child(2) {
    grid-area: cell2;
  }

  &__row--podklyuch>&__cell:nth-child(3) {
    grid-area: cell3;
  }

  &__row--podklyuch>&__cell:nth-child(4) {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: normal;
  }

  &__row--podklyuch>&__cell:nth-child(4)>.new-price {
    margin-left: 1rem;
  }


  &__cell {
    background-color: #212121;
    padding: 1.5rem;
    border: 1px solid #393838;
    text-align: center;
    border-radius: 15px;
    font-family: "Unbounded";
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 150%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  &__cell--wide {
    // grid-column: span 2;
    text-align: left;
    align-items: flex-start;
  }

  &__cell.price-table__cell--wide>.new-price {
    margin-left: 1rem;
  }

  &__cell.price-table__cell--wide {
    // grid-column: span 2; // объединяет две последние колонки
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: normal;
  }

  &__cell-text-gray {
    color: #bebebe;
    margin-left: 1rem;
  }

  @media (max-width: 979.98px) {
    &__row {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
    }

    &__header {
      display: none;
    }

    &__cell {
      text-align: left;
      justify-content: flex-start;
      padding: 1.5rem;
      font-size: 1.6rem;
      line-height: 140%;
      display: block;
    }

    &__header &__cell {
      font-weight: bold;
      background-color: #f5f5f5;
    }
  }

  @media (max-width: 479.98px) {
    &__cell {
      font-size: 1.5rem;
      padding: 1.3rem;
    }
  }
}

@media (max-width: 979.98px) {
  .price-table {
    display: block;
  }
}



.header {
  &__cell {
    background-color: white;
    padding: 2rem;
    border: 1px solid #ddd;
    /* Граница ячеек */
    text-align: center;
    border-radius: 15px;
    justify-content: center;
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #212121;
  }
}

.service-info {
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  &__image {
    width: 180px;
    height: 100px;
    object-fit: cover;
    border-radius: 15px;
    border: 1px solid #292929;
  }

  &__block {}

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 150%;
    display: flex;
    text-align: start;
    color: #fff;
  }

  &__description {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    text-align: start;
    display: flex;
    color: #cfcfcf;
  }

  @media (max-width:575.98px) {
    & {
      flex-direction: column;
    }
  }


  @media (max-width:479.98px) {
    &__description {
      font-size: 1.6rem;
    }
  }

  @media (max-width:379.98px) {
    &__image {
      width: 140px;
      height: 80px;
    }

    &__title {
      font-size: 1.5rem;
    }
  }
}

// .mosquito-table {
//   margin-bottom: 14rem;
// }

.value {
  background: #fff;
  margin-bottom: 14rem;
  border: 2px solid #ff772d;
  border-radius: 15px;
  padding: 15px;
  align-items: center;
  display: flex;
  flex-direction: column;

  &>p {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #212121;
    margin-bottom: 1.5rem;
  }
}

.quick-order {
  &__inner {
    padding-top: 14rem;
    padding-bottom: 14rem;
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #212121;
    margin-bottom: 4rem;
  }

  &__list-wrapper {
    display: flex;
    width: 100%;
    gap: 48px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
    gap: 24px;
    width: 100%;
  }

  &__list-inner {
    width: 100%;
  }

  &__list-title {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #676767;
    margin-bottom: 2.4rem;
  }

  &__button {
    padding-left: 8rem;
    padding-top: 2.4rem;
    padding-bottom: 2.4rem;
    position: relative;
    justify-content: left;
    border: 2px solid transparent;

    &.active {
      border: 2px solid #ff772d;
    }

    &::before {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translate(0, -50%);
      width: 4.8rem;
      height: 4.8rem;
      z-index: 5;
    }
  }

  &__button-rutube {
    margin-top: 2.4rem;
    width: 100%;
  }

  &__button-order {
    padding: 2.4rem;
    width: 100%;
    margin-top: 2.4rem;
  }

  &__list-button-order {}

  &__button-instagram {
    &::before {
      content: url(~/assets/img/IconQuickOrderInstagram.png);
    }
  }

  &__button-twitter {
    &::before {
      content: url(~/assets/img/IconQuickOrderTwitter.png);
    }
  }

  &__button-vk {
    &::before {
      content: url(~/assets/img/IconQuickOrderVK.png);
    }
  }

  &__button-youtube {
    &::before {
      content: url(~/assets/img/IconQuickOrderYouTube.png);
    }
  }

  &__button-telegram {
    &::before {
      content: url(~/assets/img/IconQuickOrderTelegram.png);
    }
  }

  &__button-facebook {
    &::before {
      content: url(~/assets/img/IconQuickOrderFacebook.png);
    }
  }

  &__button-tiktok {
    &::before {
      content: url(~/assets/img/IconQuickOrderTikTok.png);
    }
  }

  &__button-twitch {
    &::before {
      content: url(~/assets/img/IconQuickOrderTwitch.png);
    }
  }

  &__button-rutube {
    &::before {
      content: url(~/assets/img/IconQuickOrderRutube.png);
    }
  }

  &__button-subscribers {
    &::before {
      content: url(~/assets/img/IconQuickOrderSubscribers.png);
    }
  }

  &__button-spectator {
    &::before {
      content: url(~/assets/img/IconQuickOrderSpectator.png);
    }
  }

  &__button-likes {
    &::before {
      content: url(~/assets/img/IconQuickOrderLikes.png);
    }
  }

  &__button-statistics {
    &::before {
      content: url(~/assets/img/IconQuickOrderStatistics.png);
    }
  }

  &__button-views {
    &::before {
      content: url(~/assets/img/IconQuickOrderViews.png);
    }
  }

  &__button-IGTV {
    &::before {
      content: url(~/assets/img/IconQuickOrderIGTV.png);
    }
  }

  &__button-comments {
    &::before {
      content: url(~/assets/img/IconQuickOrderComments.png);
    }
  }

  &__button-reels {
    &::before {
      content: url(~/assets/img/IconQuickOrderReels.png);
    }
  }
}

.feedback-customer {
  position: relative;
  margin-top: 10rem;

  &__inner {
    padding-bottom: 14rem;
  }

  &__title-buttons-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #212121;
  }

  &__buttons {
    display: flex;
    gap: 2.4rem;
  }

  &__button {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 1rem;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(29rem, 1fr));
    gap: 2.4rem;
  }

  @media (max-width: 979.98px) {
    &__items {
      display: flex;
      gap: 2.4rem;
      flex-direction: column;
      max-width: 50rem;
      margin: 0 auto;
    }
  }

  @media (max-width: 379.98px) {
    &__items {
      gap: 1.5rem;
    }
  }
}

.feedback {
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0px 4px 28px 7px rgb(130 219 247 / 50%);
  }

  &__item {
    background: #212121;
    box-shadow: 0px 4px 35px 12px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
    // padding: 4rem;
    padding: 3rem;
    gap: 3rem;
    display: flex;
    height: 100%;
    border: 1px solid #393838;
  }

  &__item-text {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    display: flex;
    align-items: center;
    color: #fff;
    padding: 1.6rem 0.7rem 1.6rem 1.6rem;
    background: #f9f9f9;
    border-radius: 12px;
  }

  &__item-bottom-block {
    margin-top: 2rem;
    display: flex;
  }

  &__item-image {
    border-radius: 50%;
    margin-right: 1.6rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item-title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 2.1rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
    max-width: 19rem;
  }

  &__item-image-img {}

  &__item-name-stars-block {}

  &__item-name {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 133%;
    display: flex;
    align-items: center;
    color: #212121;
    margin-bottom: 0.4rem;
  }

  &__item-stars {}

  @media (max-width:1299.98px) {
    &__item-title {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 1099.98px) {
    &__item {
      padding: 2.5rem;
      gap: 2rem;
    }

    &__item-title {
      font-size: 1.7rem;
    }

    &__item-image {
      &>svg {
        width: 70px;
        height: 70px;
      }

      &>img {
        width: 48px !important;
        height: 48px !important;
      }
    }
  }

  @media (max-width: 979.98px) {
    &__item-title {
      max-width: none;
    }
  }

  @media (max-width: 575.98px) {
    &__item-title {
      text-align: start;
    }
  }

  @media (max-width: 379.98px) {
    &__item {
      padding: 2rem;
      gap: 2rem;
    }

    &__item-title {
      font-size: 1.6rem;
    }

    &__item-image {
      &>svg {
        width: 60px;
        height: 60px;
      }

      &>img {
        width: 40px !important;
        height: 40px !important;
      }
    }
  }
}

.stages {
  &__inner {
    padding-bottom: 14rem;
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #212121;
    margin-bottom: 4rem;

    &>span {
      color: #ff772d;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
}

.advantages {
  &__inner {
    padding-bottom: 14rem;
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #212121;
    margin-bottom: 4rem;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
    gap: 2.4rem;
  }
}

.faq {
  &__inner {
    padding-bottom: 14rem;
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 4rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  @media (max-width: 979.98px) {
    &__title {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 767.98px) {
    &__title {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 479.98px) {
    &__title {
      font-size: 2.3rem;
    }
  }
}

.banner {
  &__inner {
    background: #f9f9f9;
    border-radius: 32px;
    display: flex;
    max-height: 34rem;
    margin-bottom: 14rem;
  }

  &__block-text {
    padding: 6.4rem 0 6.4rem 6.4rem;
  }

  &__block-social {
    position: relative;

    &::before {
      position: absolute;
      content: url(~/assets/img/Frame.png);
      left: 112px;
    }
  }

  &__title {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 150%;
    color: #212121;
    max-width: 70.3rem;
    margin-bottom: 4rem;
  }

  &__button {
    padding: 1.8rem 3.2rem;
  }
}

@-webkit-keyframes rotating

/* Safari and Chrome */
  {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}

.orange {
  color: #82dbf7;
}

.swiper-slide {
  height: auto !important;
}

.estimates__subtitle {
  margin-bottom: 3rem;
}
</style>
