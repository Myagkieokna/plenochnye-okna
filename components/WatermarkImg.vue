<template>
  <!-- Skeleton loader while images are loading -->
  <div v-if="loading" class="watermark-else">
    <div v-for="index in skeletonCount" :key="index">
      <div class="w-[100%] h-[22rem] rounded-xl" />
    </div>
  </div>

  <!-- Processed images -->
  <div v-else class="watermark-else">
    <div v-for="(image, index) in processedImages" :key="index">
      <img
        :src="image"
        alt="Изображение с водяным знаком"
        style="width: 100%; height: 100%"
        class="watermark-img"
        loading="lazy"
        @click="openModal(image)"
      />
    </div>
  </div>

  <!-- Modal for full-screen view -->
  <div v-if="isModalOpen" class="modal" @click="closeModal">
    <NuxtImg :src="currentImage" alt="Изображение в полноэкранном режиме" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, type PropType } from "vue";
import logoSrc from "~/assets/svg/logo.svg";

interface ImageWithWatermark {
  src: string;
}

const props = defineProps({
  images: {
    type: Array as PropType<ImageWithWatermark[]>,
    required: true,
  },
});

const processedImages = ref<string[]>([]);
const isModalOpen = ref(false);
const currentImage = ref("");
const loading = ref(true);
const skeletonCount = 16;
const logo = ref<HTMLImageElement | null>(null);

const loadLogo = async (logoSrc: string): Promise<HTMLImageElement | null> => {
  console.log("Загрузка логотипа:", logoSrc); // Проверяем путь
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoSrc;

    img.onload = () => {
      console.log("Логотип загружен успешно:", img);
      resolve(img);
    };
    img.onerror = () => {
      console.error("Не удалось загрузить логотип:", logoSrc);
      resolve(null);
    };
  });
};

const applyWatermark = async (image: ImageWithWatermark): Promise<string> => {
  return new Promise(async (resolve) => {
    if (typeof window === "undefined") {
      return resolve("");
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve("");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image.src;

    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Draw watermark logo if loaded
      if (!logo.value) {
        console.error("Logo not loaded");
        return resolve("");
      }

      const logoWidth = canvas.width * 0.2; // Logo width 20% of image width
      const logoHeight = (logo.value.height / logo.value.width) * logoWidth;
      const logoX = canvas.width - logoWidth - 10; // 10px margin from right edge
      const logoY = canvas.height - logoHeight - 10; // 10px margin from bottom edge

      ctx.globalAlpha = 0.7; // Logo transparency
      ctx.drawImage(logo.value, logoX, logoY, logoWidth, logoHeight);

      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => resolve("");
  });
};

const processImages = async () => {
  if (typeof window === "undefined") {
    return;
  }

  processedImages.value = await Promise.all(
    props.images.map((image) => applyWatermark(image))
  );
  loading.value = false; // Stop showing skeleton once images are processed
};

const openModal = (image: string) => {
  currentImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

watch(() => props.images, processImages, { immediate: true });

onMounted(async () => {
  logo.value = await loadLogo(logoSrc); // Path to the watermark logo
  await processImages(); // Process images after logo is loaded
});
</script>

<style scoped>
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
</style>
