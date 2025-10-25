<template>
  <div class="gallery">
      <div class="gallery__masonry">
        <FullscreenImage v-for="(image, i) in images" :key="i" :src="image.src" alt="Фотографии галереи" class="gallery__image" />
      </div>
  </div>
</template>

<script lang="ts" setup>
import FullscreenImage from '~/components/FullScreenImage.vue'
interface GalleryImage {
  src: string
}

// Props
defineProps<{
  images: GalleryImage[]
}>()
</script>

<style>
.gallery {}

.gallery__masonry {
  columns: 3;
  /* количество колонок */
  column-gap: 20px;
}

.gallery__image {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 25px;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
  break-inside: avoid;
  /* чтобы картинка не рвалась */
}

.gallery__image:hover {
  transform: scale(1.03);
}

@media (max-width: 1200px) {
  .gallery__inner {
    padding: 4rem;
  }
}

/* адаптив */
@media (max-width: 998px) {
  .gallery__masonry {
    columns: 2;
  }
}

@media (max-width: 575px) {
  .gallery__masonry {
    columns: 1;
  }

  .gallery__inner {
    padding: 3rem 2rem;
  }
}
</style>