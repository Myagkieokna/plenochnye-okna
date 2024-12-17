<script setup lang="ts">
import { ref, computed, onMounted, provide } from "vue";

import TheHeader from "../components/TheHeader.vue";
import Accordeon from "../components/Accordeon.vue";
import TheFooter from "../components/TheFooter.vue";
import vBtn from "../components/AppButton.vue";
import TabContent from "../components/TabContent.vue";
import btnFloating from "../components/btnFloating.vue";
import Notification from "~/components/Notification.vue";


import { useNotifications } from '~/composables/useNotifications';
import { tabContents } from "@/data/tabContents";
import { questions } from "../data/questionsAccordeon";

import "swiper/css";

const containerRef = ref(null)
const swiper = useSwiper(containerRef)

const imageLinks: string[] = [
  // ID: gallery1
  "https://picloud.cc/images/5c5c7cdd7f251dffa9493f46fdbbd868.jpg",
  // ID: gallery2
  "https://picloud.cc/images/4c2d6c4b1739e6dec1d61023c9a9d6e1.jpg",
  // ID: gallery3
  "https://picloud.cc/images/4db797d29316f73b9c52a3868ad2d9b9.jpg",
  // ID: gallery4
  "https://picloud.cc/images/058d441ccbee12fe2b798ac7c2a56739.jpg",
  // ID: gallery5
  "https://picloud.cc/images/3b24527518ad77f9e3bc87903b06208f.jpg",
  // ID: gallery6
  "https://picloud.cc/images/854bcf27af9820ce96de2700b33f6968.jpg",
  // ID: gallery7
  "https://picloud.cc/images/7bb51b13644b2ff54965533e82ad974b.jpg",
  // ID: gallery8
  "https://picloud.cc/images/9b7e0b37b66e1ed4ac250884e645b4d5.jpg",
  // ID: gallery9
  "https://picloud.cc/images/248be3f0d411aa0c51d92e4b13d08776.jpg",
  // ID: gallery10
  "https://picloud.cc/images/c63489b1626fce6a4d2ca629a7cd8e0b.jpg",
  // ID: gallery11
  "https://picloud.cc/images/fbf2ab1792b5b4e940dc90bb8797b46f.jpg",
  // ID: gallery12
  "https://picloud.cc/images/cefb4eb14de4612cb5f8356e5028e4fa.jpg",
  // ID: gallery13
  "https://picloud.cc/images/b34f3ec3ff57d84c1b9d0a18dcbe6444.jpg",
  // ID: gallery14
  "https://picloud.cc/images/946313d2989b4efc4cd3d363ac98b72c.jpg",
  // ID: gallery15
  "https://picloud.cc/images/5be970281a7aaa0b808f3d72fedb1b56.jpg",
  // ID: gallery16
  "https://picloud.cc/images/b9721e35c2a899c7f6f02eff24226d26.jpg",
  // ID: gallery17
  "https://picloud.cc/images/8fb69f041bb7ca03ee8b652f1eba1329.jpg",
  // ID: gallery18
  "https://picloud.cc/images/c92159fc565a2eb0124f36767aaaeac4.jpg",
  // ID: gallery19
  "https://picloud.cc/images/defdfca0ab3b14df4f3046796aa3229a.jpg",
  // ID: gallery20
  "https://picloud.cc/images/305fe215a0199197b8e32110eaf3aa07.jpg",
  // ID: gallery21
  "https://picloud.cc/images/64dc7cefb04ba0101eb665a0fa26826b.jpg",
  // ID: gallery22
  "https://picloud.cc/images/2adc7020611333c201d2db5c6c8d9ad9.jpg",
  // ID: gallery23
  "https://picloud.cc/images/1c4dd57ae82df930063f71d08e1acbea.jpg",
  // ID: gallery24
  "https://picloud.cc/images/11ad013ad492574cc71706e638e6775b.jpg",
  // ID: gallery25
  "https://picloud.cc/images/43161f4c5546d54a02aaee9754e089a8.jpg",
  // ID: gallery26
  "https://picloud.cc/images/640ebb18a667f735325fd0c9f05d123f.jpg",
  // ID: gallery27
  "https://picloud.cc/images/0fcf856c69e0540ca3c0d28988a4829a.jpg",
  // ID: gallery28
  "https://picloud.cc/images/adc18327937b1c2d4543c48068ccd3a0.jpg",
  // ID: gallery29
  "https://picloud.cc/images/f5f2fe011c8e6d38ea81b8625333695f.jpg",
  // ID: gallery30
  "https://picloud.cc/images/b8880abfb78a5ed0eaaa93cea8543d17.jpg",
  // ID: gallery31
  "https://picloud.cc/images/c289976f64e7d0dea3db41b1ac11fe0e.jpg",
  // ID: gallery32
  "https://picloud.cc/images/51c4e48f59ccfee4b7050c84ee1731e2.jpg",
  // ID: gallery33
  "https://picloud.cc/images/b102471eb966feb628f834b4682680f9.jpg",
  // ID: gallery34
  "https://picloud.cc/images/fa4511b202c6d06154f88e4260d1b5e6.jpg",
  // ID: gallery35
  "https://picloud.cc/images/25bdea69bb205bb292c53d71ff2e786b.jpg",
  // ID: gallery36
  "https://picloud.cc/images/4619617cb1f1af12a38a058e40a4f2fd.jpg",
  // ID: gallery37
  "https://picloud.cc/images/f0ef0e4dfbe2489897fe062a397fb436.jpg",
  // ID: gallery38
  "https://picloud.cc/images/a2100106ab3f0acdde0db6e63fa605ec.jpg",
  // ID: gallery39
  "https://picloud.cc/images/892a1220ca48bee2c2a05812428d984e.jpg",
  // ID: gallery40
  "https://picloud.cc/images/ed2e09fca8981c318fc9f4e1c15babe4.jpg",
  // ID: gallery41
  "https://picloud.cc/images/82b54a62a23612024add67c1d784db0b.jpg",
  // ID: gallery42
  "https://picloud.cc/images/478fad929879a5d735aca6559576833a.jpg",
  // ID: gallery43
  "https://picloud.cc/images/d60a2901a25759868a22d2372c40dce8.jpg",
  // ID: gallery44
  "https://picloud.cc/images/439137dde9ae9b9bf9125049294ebf95.jpg",
  // ID: gallery45
  "https://picloud.cc/images/c65666635d3cdd0865ce86cf108f5e6e.jpg",
  // ID: gallery46
  "https://picloud.cc/images/4b290e3b340927df07c7bd4ba1bd6718.jpg",
  // ID: gallery47
  "https://picloud.cc/images/271ee39e166aee22676b7c8fbda79b03.jpg",
  // ID: gallery48
  "https://picloud.cc/images/d106109fa3ae546b5eaa8505f745ab57.jpg",
  // ID: gallery49
  "https://picloud.cc/images/d6c8b4186524046ae4b77658aa9b20a1.jpg",
  // ID: gallery50
  "https://picloud.cc/images/03858a5fbba7b708ce4bc68fcd239771.jpg",
  // ID: gallery51
  "https://picloud.cc/images/cde585dd30e41263ba149ad1999f14de.jpg",
  // ID: gallery52
  "https://picloud.cc/images/4c86766c8c6856f2ab917bcbfd6e7e99.jpg",
];

const loading = ref(true);
const skeletonCount = 16; // Количество скелетонов для загрузки
const processedImages = ref<string[]>([]); // Здесь будут ссылки на изображения
const isModalOpen = ref(false);
const currentImage = ref<string | null>(null);

// Имитация загрузки изображений
setTimeout(() => {
  processedImages.value = imageLinks;
  loading.value = false;
}, 2000); // Условный таймаут для демонстрации

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
      body: JSON.stringify(payload),  // Не забудьте сериализовать данные в JSON
    });

    if (response) {
      // Уведомление об успешной отправке
      addNotification('Сообщение успешно отправлено!', 'success', true);
      resetQuiz();  // Сброс этапов и данных
    } else {
      // Уведомление об ошибке при отправке
      addNotification('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.', 'error');
      resetQuiz();  // Сброс этапов и данных
    }
  } catch (err) {
    console.error("Ошибка при отправке:", err);
    // Уведомление об ошибке
    addNotification('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.', 'error');
    resetQuiz();  // Сброс этапов и данных
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
  {id: 1, image: "https://cdn.media.marquiz.ru/v1/image/upload/8h4UzM3MZQRtybk3Yeajrk.jpeg?format=webp&amp;func=auto&amp;fit=cover&amp;width=420&amp;height=420&amp;dpr=1", text: "1 проем" },
  {id: 2, image: "https://cdn.media.marquiz.ru/v1/image/upload/rNELhbWUUPdUgD4BHNkk94.jpeg?format=webp&func=auto&fit=cover&width=420&height=420&dpr=1", text: "2 проема" },
  {id: 3, image: "https://cdn.media.marquiz.ru/v1/image/upload/3g2EvKNttmT5oX5na5SRPq.jpeg?format=webp&func=auto&fit=cover&width=420&height=420&dpr=1", text: "3 проема" },
  {id: 4, image: "https://cdn.media.marquiz.ru/v1/image/upload/8vEA7fnjvSASoyFyA3WGBf.jpeg?format=webp&func=auto&fit=cover&width=420&height=420&dpr=1", text: "4 и более проемов" },
];

// const mosquitoOptions = [
//   { value: "yes", text: "Да" },
//   { value: "no", text: "Нет" },
//   { value: "unknown", text: "Пока не знаю" },
// ];

const mountOptions = ["Брус", "Сайдинг","Оцилиндрованный брус","Плитка","Бетонное основание","Конструкция из металла","Кирпичное основание", "Другое"];

const configurationOptions = [
  {id: 1, image: "https://cdn.media.marquiz.ru/v1/image/upload/hqfjcwjdgpvpnskasrdj.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Эконом", title: "Без фурнитуры. Пленка 0,7 микрон + окантовка ПВХ" },
  {id: 2, image: "https://cdn.media.marquiz.ru/v1/image/upload/mmtjr4bcfvtkaa4mr7s9.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Стандарт", title: "Пленка 0,7 микрон + окантовка ПВХ + крепления" },
  {id: 3, image: "https://cdn.media.marquiz.ru/v1/image/upload/cpzaow7heqm5xgcsw0v7.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Под ключ", title: "Пленка 0,7 микрон + окантовка ПВХ + крепления и монтаж" },
  {id: 4, image: "https://cdn.media.marquiz.ru/v1/image/upload/kuckrag3tnm7fhaht4sz.jpg?format=webp&func=auto&fit=cover&width=480&height=303&dpr=1", name: "Премиум Под ключ", title: "Пленка 0,7 микрон + окантовка ПВХ + крепления и монтаж. Срок изготовления от 1 до 3-х дней. За срочность +30% от суммы заказа" },
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
    description: "Пленка 700 мкм, морозостойкая до -39°C, окантовка ПВХ без фурнитуры",
    prices: ["от 1090 руб.", "от 990 руб.", "от 890 руб."],
    size: ["до 15 м²", "от 15 м² до 50 м²", "более 50 м²"]
  },
  {
    title: "Комплект «Стандарт»",
    image: "/img/IMG_5910.jfif",
    description: "Пленка 700 мкм, устойчивость к ультрафиолету, окантовка ПВХ с фурнитурой.",
    prices: ["от 2190 руб.", "от 2090 руб.", "от 1990 руб."],
    size: ["до 15 м²", "от 15 м² до 30 м²", "более 30 м²"]
  },
  {
    title: "Под ключ",
    image: "/img/IMG_5872.jfif",
    description: "Пленка 700 мкм, морозостойкая до -39°C, окантовка ПВХ с фурнитурой и с монтажом",
    prices: ["29900 руб.", "45000 руб.", "от 2990 руб."],
    size: ["до 10 м²", "от 10 м² до 15 м²", "от 15 м² до 40 м²"]
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

// interface ImageWithWatermark {
//   src: string;
// }

// const images = ref<ImageWithWatermark[]>([
//   { src: '/img/gallery/gallery1.jpeg',},
//   { src: '/img/gallery/gallery2.jpeg',},
//   { src: '/img/gallery/gallery3.jpeg'},
//   { src: '/img/gallery/gallery4.jpeg'},
//   { src: '/img/gallery/gallery5.jpeg'},
//   { src: '/img/gallery/gallery6.jpeg'},
//   { src: '/img/gallery/gallery7.jpeg'},
//   { src: '/img/gallery/gallery8.jpeg'},
//   { src: '/img/gallery/gallery9.jpeg'},
//   { src: '/img/gallery/gallery10.jpeg'},
//   { src: '/img/gallery/gallery11.jpeg'},
//   { src: '/img/gallery/gallery12.jpeg'},
//   { src: '/img/gallery/gallery13.jpeg'},
//   { src: '/img/gallery/gallery14.jpeg'},
//   { src: '/img/gallery/gallery15.jpeg'},
//   { src: '/img/gallery/gallery16.jpeg'},
//   { src: '/img/gallery/gallery17.jpeg'},
//   { src: '/img/gallery/gallery18.jpeg'},
//   { src: '/img/gallery/gallery19.jpeg'},
//   { src: '/img/gallery/gallery20.jpeg'},
//   { src: '/img/gallery/gallery21.jpeg'},
//   { src: '/img/gallery/gallery22.jpeg'},
//   { src: '/img/gallery/gallery23.jpeg'},
//   { src: '/img/gallery/gallery24.jpeg'},
//   { src: '/img/gallery/gallery25.jpeg'},
//   { src: '/img/gallery/gallery26.jpeg'},
//   { src: '/img/gallery/gallery27.jpeg'},
//   { src: '/img/gallery/gallery28.jpeg'},
//   { src: '/img/gallery/gallery29.jpeg'},
//   { src: '/img/gallery/gallery30.jpeg'},
//   { src: '/img/gallery/gallery31.jpeg'},
//   { src: '/img/gallery/gallery32.jpeg'},
//   { src: '/img/gallery/gallery33.jpeg'},
//   { src: '/img/gallery/gallery34.jpeg'},
//   { src: '/img/gallery/gallery35.jpeg'},
//   { src: '/img/gallery/gallery36.jpeg'},
//   { src: '/img/gallery/gallery37.jpeg'},
//   { src: '/img/gallery/gallery38.jpeg'},
//   { src: '/img/gallery/gallery39.jpeg'},
//   { src: '/img/gallery/gallery40.jpeg'},
//   { src: '/img/gallery/gallery41.jpeg'},
//   { src: '/img/gallery/gallery42.jpeg'},
//   { src: '/img/gallery/gallery43.jpeg'},
//   { src: '/img/gallery/gallery44.jpeg'},
//   { src: '/img/gallery/gallery45.jpeg'},
//   { src: '/img/gallery/gallery46.jpeg'},
//   { src: '/img/gallery/gallery47.jpeg'},
//   { src: '/img/gallery/gallery48.jpeg'},
//   { src: '/img/gallery/gallery49.jpeg'},
//   { src: '/img/gallery/gallery50.jpeg'},
//   { src: '/img/gallery/gallery51.jpeg'},
//   { src: '/img/gallery/gallery52.jpeg'},
// ]);

// // Фильтруем изображения, проверяя, существуют ли они
// const validImages = ref<ImageWithWatermark[]>([]);

// const checkImagesExistence = async () => {
//   for (const image of images.value) {
//     try {
//       const img = new Image();
//       img.src = image.src;
//       img.onload = () => {
//         validImages.value.push(image); // Добавляем изображение, если оно успешно загружено
//       };
//       img.onerror = () => {
//         // Если изображение не существует или не может быть загружено, просто пропускаем
//         console.log(`Image not found: ${image.src}`);
//       };
//     } catch (error) {
//       console.error(`Error loading image: ${image.src}`, error);
//     }
//   }
// };

// // Вызываем проверку при монтировании
// onMounted(() => {
//   checkImagesExistence();
// });

// const images = ref<ImageWithWatermark[]>([]);  // Объявляем тип для images

// const fetchImages = async () => {
//   try {
//     const data = await $fetch<ImageWithWatermark[]>('/api/images');
//     if (data && Array.isArray(data)) {
//       images.value = data.filter(item => item.src); // Проверка на корректность src
//     } else {
//       console.error('Некорректные данные от сервера');
//     }
//   } catch (error) {
//     console.error('Ошибка при загрузке изображений:', error);
//   }
// };


// onMounted(() => {
//   fetchImages();
// });


// definePageMeta({
//   title: 'Мягкие окна из ПВХ | Утепление и теплоизоляция для вашего дома',
//   meta: [
//     { name: 'description', content: 'Мягкие окна и пленочные окна из ПВХ - отличный выбор для утепления и защиты вашего дома. Узнайте о преимуществах и особенностях ПВХ окон для дачи и террас.' },
//     { name: 'keywords', content: 'мягкие окна, пленочные окна, окна из ПВХ, теплоизоляция, пластиковые окна, окна для дачи, окна для террасы, утепление окон, ПВХ окна' },
//     { name: 'robots', content: 'index, follow' },
//     { name: 'author', content: 'Мягкие окна' },
//     { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
//     { name: 'og:title', content: 'Мягкие окна и пленочные окна из ПВХ | Утепление и теплоизоляция для вашего дома' },
//     { name: 'og:description', content: 'Мягкие окна и пленочные окна из ПВХ - лучший выбор для утепления вашего дома и дачи. Преимущества теплоизоляции, долговечности и легкости в обслуживании.' },
//     { name: 'og:image', content: 'https://picloud.cc/images/9b7e0b37b66e1ed4ac250884e645b4d5.jpg' },
//     { name: 'og:url', content: 'https://plenochnieokna.com' },
//     { name: 'og:type', content: 'website' },
//     { name: 'og:locale', content: 'ru_RU' },
//     { name: 'og:site_name', content: 'Мягкие окна и пленочные окна из ПВХ' },
//     { name: 'twitter:card', content: 'summary_large_image' },
//     { name: 'twitter:title', content: 'Мягкие окна и пленочные окна из ПВХ | Утепление и теплоизоляция для вашего дома' },
//     { name: 'twitter:description', content: 'Мягкие окна и пленочные окна из ПВХ для дачи и террас. Отличная теплоизоляция и защита от внешних факторов.' },
//     { name: 'twitter:image', content: 'https://picloud.cc/images/9b7e0b37b66e1ed4ac250884e645b4d5.jpg' },
//   ]
// })

</script>

<template>
  <TheHeader />
  <main class="main">
    <section class="hero" style="position: relative">
      <div class="hero__image"></div>
      <div class="container">
        <div class="hero__inner">
          <div class="hero__content">
            <h1 class="hero__title">
              Мягкие окна из <span class="orange">гибкого ПВХ</span>
            </h1>
            <h2 class="hero__subtitle">
              Элегантное решение для вашего комфорта: мягкие окна из гибкого ПВХ от производителя — идеальный выбор для веранд, беседок и террас, защищающих от ветра, дождя и холода.
            </h2>
            <div class="hero__buttons">
              <nuxt-link       
                class="hero__btn" 
                href="https://wa.me/+79661266606" 
                target="_blank" 
                aria-label="Написать в WhatsApp"
                >Расчет стоимости</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div    

    class="feedback-customer">
      <div class="container">
        <div class="feedback-customer__inner">
          <!-- <div class="feedback-customer__title-buttons-wrapper">
            <h2 class="feedback-customer__title">Отзывы клиентов</h2>
          </div> -->
          <div class="feedback-customer__items">
            <div class="feedback" @click="scrollToSection('watermark')">
              <div class="feedback__item">
                <div class="feedback__item-image" style="position: relative">
                  <img
                    src="~/assets/svg/4db54979-24dc-4cb4-a0fa-54c3e03ab58d.jpg"
                    style="width: 80px; height: 80px; border-radius: 50%;"
                    alt=""
                  />
                  <!-- <svg
                    width="90"
                    height="90"
                    viewBox="0 0 170 170"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="position: absolute"
                    class="rotating"
                  >
                    <circle
                      cx="85"
                      cy="85"
                      r="83"
                      stroke="url(#paint0_linear_544_191)"
                      stroke-width="6"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_544_191"
                        x1="0"
                        y1="85"
                        x2="165"
                        y2="85"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#82dbf7" />
                        <stop
                          offset="1"
                          stop-color="#82dbf7"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg> -->
                </div>
                <h2 class="feedback__item-title">Наши работы</h2>
              </div>
            </div>
            <div class="feedback" @click="scrollToSection('price')">
              <div class="feedback__item">
                <div class="feedback__item-image" style="position: relative">
                  <img
                    src="~/assets/svg/3cb75436-2636-4a15-98f2-01f5116a54b6.jpg"
                    style="width: 80px; height: 80px; border-radius: 50%;"
                    alt=""
                  />
                  <!-- <svg
                    width="90"
                    height="90"
                    viewBox="0 0 170 170"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="position: absolute; transform: rotate(125deg)"
                    class="rotating"
                  >
                    <circle
                      cx="85"
                      cy="85"
                      r="83"
                      stroke="url(#paint0_linear_544_191)"
                      stroke-width="6"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_544_191"
                        x1="0"
                        y1="85"
                        x2="165"
                        y2="85"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#82dbf7" />
                        <stop
                          offset="1"
                          stop-color="#82dbf7"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg> -->
                </div>
                <h2 class="feedback__item-title">Услуги</h2>
              </div>
            </div>
            <div class="feedback" @click="scrollToSection('advantages')">
              <div class="feedback__item">
                <div class="feedback__item-image" style="position: relative">
                  <img
                    src="~/assets/svg/8df28ea8-26c3-4e68-8248-ebbf33ff55a4.jpg"
                    style="width: 80px; height: 80px; border-radius: 50%;"
                    alt=""
                  />
                  <!-- <svg
                    width="90"
                    height="90"
                    viewBox="0 0 170 170"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="position: absolute; transform: rotate(220deg)"
                    class="rotating"
                  >
                    <circle
                      cx="85"
                      cy="85"
                      r="83"
                      stroke="url(#paint0_linear_544_191)"
                      stroke-width="6"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_544_191"
                        x1="0"
                        y1="85"
                        x2="165"
                        y2="85"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#82dbf7" />
                        <stop
                          offset="1"
                          stop-color="#82dbf7"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg> -->
                </div>
                <h2 class="feedback__item-title">Наши Преимущества</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="recomendation" id="advantages">
      <div class="container">
        <div class="recomendation__inner">
          <h2 class="recomendation__title">
            Преимущества мягких окон из <span class="orange"> ПВХ</span>
          </h2>
          <div class="recomendation__block-image">
            <img
              src="~/assets/img/e2e51fae-f4df-4a6b-ad8a-78d5f228a5ad.jpg"
              class="recomendation__block-top-image"
              alt=""
            />
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
            <div
              class="recomendation__item"
              v-for="(item, index) in recomendationItem"
              :key="index"
            >
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

    <div class="price" id="price">
    <div class="container">
      <div class="price__inner">
        <h2 class="price__title">
          Стоимость <span class="orange">Мягких Окон</span> в готовой
          комплектации
        </h2>
        <div class="price-table">
          <!-- Перебор строк с услугами -->
          <div
            class="price-table__row"
            v-for="(item, index) in services"
            :key="index"
          >
            <div class="price-table__cell">
              <div class="service-info">
                <img
                  :src="item.image"
                  :alt="item.description"
                  class="service-info__image"
                />
                <div class="service-info__block">
                  <h3 class="service-info__title">{{ item.title }}</h3>
                  <p class="service-info__description">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
            <div class="price-table__cell">
              <span>
                {{ item.prices[0] }}
            </span>
            <span class="price-table__cell-text-gray">{{ item.size[0] }}</span>
            </div>
            <div class="price-table__cell">
              <span>
                {{ item.prices[1] }}
              </span>
              <span class="price-table__cell-text-gray">{{ item.size[1] }}</span>
            </div>
            <div class="price-table__cell">
              <span>
                {{ item.prices[2] }}
              </span>
              <span class="price-table__cell-text-gray">{{ item.size[2] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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

    <div class="estimates" id="smeta">

        <div class="estimates__inner">
          <div class="estimates-form-wrapper">
            <div class="estimates__image"></div>
            <div class="estimates__block">
            <h2 class="estimates__title" style="display: flex; justify-content: center">
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
                  <div
                    class="quiz__progress-bar-fill"
                    :style="{ width: `${(currentStep / steps.length) * 100}%` }"
                  ></div>
                </div>
              </div>
              <div class="quiz__progress-question-step">
                <p>Вопрос {{currentStep}}</p>
              </div>
              <!-- Контент шагов -->
              <div v-if="currentStep === 1" class="quiz__step">
                <h2 class="quiz__title">
                  Укажите примерную площадь мягкого остекления в м²
                </h2>
                <div class="quiz__slider-container">
                  <!-- Контейнер слайдера -->
                  <div
                    class="quiz__slider-wrapper"
                    :style="sliderProgressStyle"
                  >
                    <!-- Слайдер -->
                    <input
                      type="range"
                      min="1"
                      max="100"
                      v-model="answers.area"
                      class="quiz__slider"
                    />
                  </div>
                  <p class="quiz__slider-value">{{ answers.area }} м²</p>
                </div>
              </div>

              <div v-if="currentStep === 2" class="quiz__step">
                <h2 class="quiz__title">Сколько будет дверных проемов?</h2>
                <div class="quiz__options">
                  <div
                    v-for="(item, index) in doorOptions"
                    :key="index"
                    @click="selectDoorway(item)"
                    :class="['quiz__option', { 'quiz__option--selected': answers.doorways?.id === item.id }]"

                  >
                    <img
                      class="quiz__option-image"
                      :src="item.image"
                      :alt="item.text"
                    />
                    <p class="quiz__option-text">{{ item.text }}</p>
                  </div>
                </div>
              </div>

              <!-- <div v-if="currentStep === 3" class="quiz__step">
                <h2 class="quiz__title">Потребуется ли москитная сетка?</h2>
                <div class="quiz__radio-group">
                  <label
                    v-for="(option, index) in mosquitoOptions"
                    :key="index"
                    class="quiz__radio-label"
                  >
                    <input
                      type="radio"
                      :value="option.value"
                      v-model="answers.mosquito"
                      class="quiz__radio-input"
                    />
                    <span class="quiz__radio-span"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.5 5.4L4.14546 8.22183C4.54054 8.64324 5.20946 8.64324 5.60454 8.22183L10.5 3" stroke="#0C1132" stroke-width="2" stroke-linecap="round" />
</svg></span>
    <p class="text">{{ option.text }}</p>
                  </label>
                </div>
              </div> -->

              <div v-if="currentStep === 3" class="quiz__step">
                <h2 class="quiz__title">
                  На что будут монтироваться мягкие окна?
                </h2>
                <div class="quiz__radio-group">
                  <label
                    v-for="(option, index) in mountOptions"
                    :key="index"
                    class="quiz__radio-label"
                  >
                    <input
                      type="radio"
                      :value="option"
                      v-model="answers.mount"
                      class="quiz__radio-input"
                    />
                    <span class="quiz__radio-span"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.5 5.4L4.14546 8.22183C4.54054 8.64324 5.20946 8.64324 5.60454 8.22183L10.5 3" stroke="#0C1132" stroke-width="2" stroke-linecap="round" />
</svg></span>
    <p>{{ option }}</p>
                  </label>
                </div>
              </div>

              <div v-if="currentStep === 4" class="quiz__step">
                <h2 class="quiz__title">Какая комплектация необходима?</h2>
                <div class="quiz__equipments">
                  <div
                    v-for="(item, index) in configurationOptions"
                    :key="index"
                    @click="selectConfiguration(item)"
                    :class="[
                      'quiz__option quiz__equipment-item',
                      {
                        'quiz__option--selected':
                          answers.configuration?.id === item.id,
                      },
                    ]"
                  >
                    <img
                      class="quiz__equipment-image"
                      :src="item.image"
                      :alt="item.name"
                    />
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
                  <label 
                  v-for="(option, index) in installOptions"
                    :key="index"
                    class="quiz__radio-label">
    <input
    type="radio"
    :value="option.value"
    v-model="answers.installation"
    class="quiz__radio-input"
    />
    <span class="quiz__radio-span"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.5 5.4L4.14546 8.22183C4.54054 8.64324 5.20946 8.64324 5.60454 8.22183L10.5 3" stroke="#0C1132" stroke-width="2" stroke-linecap="round" />
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
                  <label
                    v-for="(option, index) in scheduleOptions"
                    :key="index"
                    class="quiz__radio-label"
                  >
                    <input
                      type="radio"
                      :value="option.value"
                      v-model="answers.schedule"
                      class="quiz__radio-input"
                    />
                    <span class="quiz__radio-span"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.5 5.4L4.14546 8.22183C4.54054 8.64324 5.20946 8.64324 5.60454 8.22183L10.5 3" stroke="#0C1132" stroke-width="2" stroke-linecap="round" />
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
              <input
                class="contact-form__input"
                type="text"
                id="name"
                v-model="contactInfo.name"
                required
              />
            </div>
            <div class="contact-form__field">
              <label class="contact-form__label" for="phone">Телефон</label>
              <input
                class="contact-form__input"
                type="text"
                id="phone"
                v-model="contactInfo.phone"
                @input="formatPhone"
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
          </div>
          <div class="contact-form__field">
            <label class="contact-form__label" for="message">Комментарий</label>
            <textarea
              class="contact-form__input contact-form__input-textarea"
              id="message"
              v-model="contactInfo.message"
              style="width: 100%;"
            ></textarea>
          </div>
        </form>
      </div>
    </div>

              <!-- Управление -->
              <div class="quiz__controls">
                <button
                  class="quiz__button quiz__button--prev"
                  @click="prevStep"
                  :disabled="currentStep === 1"
                >
                  Назад
                </button>
                <button
                  class="quiz__button quiz__button--next"
                  @click="handleNext"
                  :disabled="!canProceed"
                >
                  {{ currentStep < 7 ? "Далее" : "Отправить" }}
                </button>
              </div>
            </div>
          </div>
        </div>

    </div>

    <section class="why" id="why">
    <h2 class="why__title">Почему выбирают <span class="orange">нас?</span></h2>
      <div class="why__inner">
        <ClientOnly>
        <swiper-container ref="containerRef"
        :slides-per-view="5" 
  :space-between="60"
  :breakpoints="{
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
  }"
  class="why__slider"
        >
          <swiper-slide 
          v-for="(card, idx) in cards"
          :key="idx"
            class="why__card"
          >
            <div class="why__image">
              <img :src="card.image" :alt="card.text" />
            </div>
            <div class="why__header">
              <svg class="why__card-arc" xmlns="http://www.w3.org/2000/svg">
                <path></path>
              </svg>
              <h3 class="why__card-title">{{ card.title }}</h3>
              <p class="why__card-text">{{ card.text }}</p>
              <!-- <div v-if="card.button" class="why__card-button-wrapper">
                <button class="why__card-button">{{ card.button }}</button>
              </div> -->
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      </div>
    </section>

  <section class="material" id="material">
    <div class="container">
      <div class="material__inner">
        <h2 class="material__title"><span class="orange" style="margin-left: 0;">Материалы,</span> крепления и фурнитура</h2>
        <p class="material__block-text">Компания Мягкие Окна России располагает собственными производственными мощностями для изготовления мягких окон. Поэтому все необходимые для производства материалы, всегда есть в наличии на нашем складе. Вам не придется дополнительно ждать поставки нужных комплектующих от посредника или изготовителя на стороне. Заказывая окна ПВХ в нашей компании, будьте уверены — выбранный вами материал мягких окон проверен нами на практике и отличается высоким качеством.
          Чтобы вы могли лучше разобраться в ассортименте и понять, какие материалы подобрать для своей постройки, предлагаем вам ознакомиться с описанием и характеристиками всех компонентов для окон ПВХ.
        </p>
        <div class="material__wrapper-block-img-list">
            <ul class="material__list">
            <li class="material__list-title">
              Виды материалов для мягких окон:
            </li>
            <li class="material__list-item">
              1. <strong class="material__list-item-strong">Пленка ПВХ</strong> — основной элемент в конструкции мягких окон.
            </li>
            <li class="material__list-item">
              2. <strong class="material__list-item-strong">Окантовка</strong> — материал обрамления периметра окон ПВХ. Именно в окантовку встраивается фурнитура для крепления к каркасу постройки.
            </li>
            <li class="material__list-item">
              3. <strong class="material__list-item-strong">Фурнитура (крепления)</strong> — вариации крепления окон к материалу постройки. Различаются по надежности посадки окна к месту монтажа и удобству.
            </li>
            <li class="material__list-item">
              4. <strong class="material__list-item-strong">Двусторонняя молния</strong> — применяется для дверных проемов. Упрощает вход и выход из помещения
            </li>
            <li class="material__list-item">
              5. <strong class="material__list-item-strong">Москитная сетка</strong> — дополнительный атрибут (приобретается отдельно либо в комплекте с окном).
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
      <span
        v-for="tab in tabs"
        :key="tab.name"
        :class="['tabs__button', { selected: tab.name === selectedTab }]"
        @click="changeTab(tab.name)"
      >
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
        <!-- Skeleton loader while images are loading -->
        <div v-if="loading" class="watermark-else">
          <div v-for="index in skeletonCount" :key="index">
            <USkeleton class="w-[100%] h-[22rem] rounded-xl" />
          </div>
        </div>

        <!-- Processed images -->
        <div v-else class="watermark-else">
          <div v-for="(image, index) in processedImages" :key="index">
            <NuxtImg
              :src="image"
              alt="Пленочные окна ПВХ для дачи, уют и тепло в любое время года"
              width="100%"
              height="auto"
              class="watermark-img"
              quality="80"
              format="webp"
              loading="lazy"
              @click="openModal(image)"
            />
          </div>
        </div>

        <!-- Modal for full-screen view -->
        <div v-if="isModalOpen" class="modal" @click="closeModal">
          <NuxtImg :src="currentImage || ''" alt="Мягкие окна для террасы, утепление с помощью ПВХ" />
        </div>
      </div>
    </div>
  </section>

    <section class="faq" id="faq">
      <div class="container">
        <div class="faq__inner">
          <h2 class="faq__title">Частые вопросы</h2>
          <div class="faq__items">
            <Accordeon :questions="questions"/>
          </div>
        </div>
      </div>
    </section>
    
    <btnFloating/>
    <Notification/>
  </main>
  <TheFooter />
</template>

<style lang="scss" scoped>

.watermark-img {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Обеспечиваем, чтобы изображения заполнили ячейку грида без искажения */
  object-position: center; /* Центрируем изображение в ячейке */
}

.watermark-else {
  display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem; /* Устанавливаем gap на 1rem */
      padding: 0; /* Убираем внутренние отступы */
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

&__inner {
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
  & img{
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
  width: 100%; /* Устанавливает ширину контейнера слайдера */
  padding: 2rem 2rem;
  overflow:visible;
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

&__header{
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
    text-transform:uppercase
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

  .why__image > img {
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

  .why__image > img {
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

  .why__image > img {
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
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 600;
    font-size: 3rem;
    line-height: 150%;
    color: #212121;
    margin-bottom: 3rem;
  }

  &__subtitle {
    font-family: Unbounded;
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
  height: 100vh;
  min-height: 80rem;
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
    height: 100vh;
    min-height: 80rem;
  &__inner {
    background: #212121;
    display: flex;
    flex-direction: column;
    height: 100%;
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
    color: #fff; /* Цвет текста процента */
  }

  &__progress-bar {
    width: 100%;
    height: 1.5rem;
    background-color: #393939; /* Цвет фона шкалы */
    border-radius: 8px;
    position: relative;
  }

  &__progress-bar-fill {
    height: 100%;
    background-color: #82DBF7; /* Фиолетовый цвет заполненной части */
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
    background-color: #82dbf7; /* Фиолетовая цветная часть */
    transition: width 0.1s linear;
    width: calc(var(--slider-progress, 0%) * 1%); /* Динамическая ширина */
    pointer-events: none;
  }

  &__slider {
    -webkit-appearance: none; /* Убираем стандартный стиль слайдера */
    appearance: none;
    width: 100%; /* Ширина слайдера */
    max-width: none;
    height: 26px;
    background-color: #393939; /* Серый фон шкалы */
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

  &__slider-value {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 150%;
    margin-top: 10px;
    color: #fff;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
    width: 100%;
    gap: 20px;
  }

  &__option {
    cursor: pointer;
  border: 2px solid #393939;
  text-align: center;
  border-radius: 1rem;
  transition: all 0.3s ease;

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
    padding: 15px 0px
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
  &:checked ~ span {
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
      height: 100vh;
      border-radius: 20px;
    }
  }

@media (max-width: 767.98px) {
  .quiz {
    padding: 0;
  }
  .quiz__inner {
    padding: 2rem 2rem;
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
  background: #f9f9f9;
  border-radius: 0px 0px 72px 72px;
  position: relative;
  height: 100vh;
  width: 100%;

  &__content {
    padding-top: 21.7rem;
    padding-bottom: 9.8rem;
    max-width: 61rem;
    margin: 0 auto;
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
    display: flex;
    justify-content: center;
    align-items: center;
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

  &__image {
    position: absolute;
    width: 100%;
    background-image: url("/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100vh;
    filter: brightness(0.5);
  }

  &__button {
    margin-bottom: 4rem;
    padding: 1.8rem 3.2rem;
    width: 100%;
  }

  @media (max-width: 767.98px) {
    &__content {
      padding-top: 9rem;
      padding-bottom: 9rem;
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
  }
}

.recomendation {
  margin-bottom: 14rem;
  &__inner {
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

  &__block-image {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 4rem;
    & > img {
      width: 100%;
      border-radius: 15px;
    }
  }

  &__block-top-image {
    grid-column: span 3; /* верхняя картинка занимает всю ширину */
    grid-row: 1; /* верхняя строка */
    height: 600px; /* фиксированная высота для верхней картинки */
    object-fit: cover;
  }

  &__block-bottom-images {
    height: 100%; /* сохранение пропорций */
    grid-column: span 1; /* каждая картинка занимает одну ячейку */
  }

  &__block-text {
    margin-bottom: 3rem;
    & > p {
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
    grid-template-columns: repeat(3, 1fr); /* 3 колонки одинаковой ширины */
    grid-template-rows: auto auto; /* 2 ряда */
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
    filter: blur(10px); /* Применить эффект размытия */
    z-index: -1; /* Поместить за контент */
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
  &__inner {
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
  grid-template-columns: 1.5fr 1fr 1fr 1fr; /* Ширина колонок */
  gap: 1rem; /* Расстояние между ячейками */
  padding: 1rem;
  overflow: hidden;
  border-radius: 10px;
  // box-shadow: 0px 4px 35px 12px rgba(0, 0, 0, 0.04);
  box-shadow: 0px 4px 35px 12px rgb(255 255 255 / 0%);

  &__row {
    display: contents; /* Сохраняем элементы в структуре грида */
  }

  &__header {
  }

  &__cell {
    background-color: #212121;
    padding: 1.5rem;
    border: 1px solid #393838; /* Граница ячеек */
    text-align: center;
    border-radius: 15px;
    justify-content: center;
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    color: #fff;
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
    border: 1px solid #ddd; /* Граница ячеек */
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
  gap: 1rem;
  &__image {
    width: 180px;
    height: 100px;
    object-fit: cover;
    border-radius: 15px;
    border: 1px solid #292929;
  }

  &__block {
  }

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
  & > p {
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

  &__list-button-order {
  }

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
  margin-top: -7rem;
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

  @media (max-width: 979.98px){
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

  &__item-image-img {
  }

  &__item-name-stars-block {
  }

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

  &__item-stars {
  }

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
      & > svg {
      width: 70px;
      height: 70px;
    }
    & > img {
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
      & > svg {
      width: 60px;
      height: 60px;
    }
    & > img {
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
    & > span {
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

@-webkit-keyframes rotating /* Safari and Chrome */ {
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


</style>
