//TabContent.vue: Отображает контент вкладок. Этот компонент универсален и не
зависит от данных.

<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="tabs__content">
    <h2 class="tabs__title">{{ content.title }}</h2>
    <div v-if="content.description.length" class="tabs__block-text">
      <p
        v-for="(text, index) in content.description"
        :key="index"
        class="tabs__text"
      >
        {{ text }}
      </p>
    </div>
    <div class="tabs__items">
      <div
        v-for="(item, index) in content.items"
        :key="index"
        class="tabs__item"
      >
        <div class="tabs__item-img">
          <img :src="item.img" alt="" />
        </div>
        <div class="tabs__item-block-text">
          <h3 class="tabs__item-title">{{ item.title }}</h3>
          <ul v-if="item.details" class="tabs__item-list">
            <li
              v-for="(detail, idx) in item.details"
              :key="idx"
              class="tabs__item-list-item"
            >
              {{ detail }}
            </li>
          </ul>
          <p v-if="item.description" class="tabs__item-descr">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  &__content {
  }

  &__title {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 2.5rem;
  }

  &__block-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  &__text {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #cfcfcf;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(38rem, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  &__item {
    background-color: #212121;
    border: 1px solid #393939;
    border-radius: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__item-img {
    margin-bottom: 0.5rem;
    & > img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      max-height: 27.8rem;
      border-radius: 2rem;
    }
  }

  &__item-block-text {
    padding: 2rem;
  }

  &__item-title {
    font-family: Unbounded;
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 2.5rem;
  }

  &__item-list {
    margin-bottom: 1.5rem;
  }

  &__item-list-item {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #cfcfcf;
  }

  &__item-descr {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #cfcfcf;
  }

  @media (max-width: 479.98px) {
    &__title {
      font-size: 1.8rem;
    }

    &__text {
      font-size: 1.6rem;
    }

    &__item-title {
      font-size: 1.7rem;
    }

    &__item-list-item {
      font-size: 1.6rem;
    }

    &__items {
      grid-template-columns: auto;
    }
  }
}
</style>
