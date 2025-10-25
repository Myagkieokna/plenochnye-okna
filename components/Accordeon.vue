<template>
  <div
    class="question"
    :class="{ active: activeIndex === index }"
    v-for="(item, index) in questions"
    :key="index"
  >
    <h3 class="question__title"
    @click="toggleActive(index)"
    >
      {{ item.name }}
    </h3>
    <div
      class="question__content"
      ref="contents"
      :style="{ maxHeight: activeIndex === index ? contentHeights[index] : '0px' }"
    >
      <!-- Контент внутри аккордеона -->
      <div v-for="(block, blockIndex) in item.content" :key="blockIndex" class="content-block">
        <!-- Картинка -->
        <template v-if="block.type === 'image'">
          <div class="question__image">
            <img :src="block.src" :alt="block.alt" />
            <p class="question__image-description">{{ block.description }}</p>
          </div>
        </template>

        <!-- Заголовок или выделенный текст -->
        <template v-if="block.type === 'highlighted-text'">
          <p class="highlighted-text" v-html="splitText(block.text)"></p>
        </template>
         <!-- Типа как бейдж, но не бейдж -->
        <template v-if="block.type === 'highlighted-background-text'">
          <p class="highlighted-background-text" v-html="splitText(block.text)"></p>
        </template>

        <!-- Обычный текст с жирным выделением -->
        <template v-if="block.type === 'text'">
          <p class="question__text" v-html="splitText(block.text)"></p>
        </template>

        <!-- Список -->
        <template v-if="block.type === 'list'">
          <div class="question__list-wrapper">
            <div class="list-container">
              <!-- Перебираем все списки внутри блока -->
              <div v-for="(list, listIndex) in block.lists" :key="listIndex" class="list-column">
                <!-- Заголовок для каждого списка -->
                <p v-if="list.title" class="question__list-title" v-html="splitText(list.title)"></p>
                <!-- Список -->
                <ul class="question__list">
                  <li class="question__list-item" v-for="(listItem, itemIndex) in list.items" :key="itemIndex">
                    <!-- Обрабатываем каждый item с заменой жирного текста -->
                    <p v-html="splitText(listItem)"></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>




<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
});

const activeIndex = ref(null);
const contentHeights = ref([]);
const contents = ref([]);

const toggleActive = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// Функция для обработки текста с разбиением на строки и отступы
const splitText = (text) => {
  if (typeof text !== 'string') {
    text = String(text); // Преобразуем в строку, если это не строка
  }

  // Заменяем **жирный текст** на <strong>жирный текст</strong>
  const boldTextRegex = /\*\*(.*?)\*\*/g;
  text = text.replace(boldTextRegex, '<strong style="font-weight: 600; font-size: 1.8rem;line-height: 150%;font-family: Unbounded;font-weight: 500;color: #fff;">$1</strong>');

  // Заменяем переводы строк с отступами сверху (\n+) на <span с отступом сверху>
  text = text.replace(/\n\+/g, "<span style='display:block; margin-top: 2rem;'></span>");

  // Заменяем переводы строк с отступами снизу (\n-) на <span с отступом снизу>
  text = text.replace(/\n\-/g, "<span style='display:block; margin-bottom: 2rem;'></span>");

  // Заменяем обычные переводы строк (\n) на <span с отступом снизу>
  text = text.replace(/\n/g, "<span style='display:block; margin-bottom: 1rem;'></span>");

  // Убираем запятую, если она идет сразу после </span>
  text = text.replace(/<\/span>,/g, '</span>');

  return text;
};




onMounted(() => {
  contentHeights.value = contents.value.map((el) => (el ? `${el.scrollHeight}px` : "0px"));
});

watch(activeIndex, () => {
  contentHeights.value = contents.value.map((el) =>
    el ? `${el.scrollHeight}px` : "0px"
  );
});
</script>



<style scoped lang="scss">

.text-line,
.highlighted-line {
  margin-bottom: 0.5rem; /* Расстояние между строками */
}
.question {
  border: 1px solid #393939;
  border-radius: 16px;
  padding: 0 2.4rem;
  transition: background 0.25s ease-in-out;
  background: #212121;

  &.active {
    background: #393939;
    padding-bottom: 2.4rem; // Из-за этого может лагать
  }

  &__title {
    font-weight: 600;
    font-size: 2rem;
    line-height: 150%;
    font-family: Unbounded;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    padding: 2.4rem 0;
    position: relative;
    padding-right: 4rem;

    &::before {
      content: url(../assets/svg/plus.svg);
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      transition: transform 0.25s ease-in-out;
    }
  }

  &.active > &__title::before {
    transform: translateY(-50%) rotate(180deg);
  }

  &__content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease-in-out;
  }

  .content-block {
    margin-bottom: 0.5rem;
  }

  &__image {
    text-align: center;
    margin-bottom: 2rem;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 1.5rem;
    }

    &-description {
      font-size: 0.9rem;
      color: #fff;
      margin-top: 0.5rem;
    }
  }

  .highlighted-text {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 150%;
    font-family: Unbounded;
    font-weight: 500;
    color: #fff;
  }

  .highlighted-background-text {
    display: block;
    padding: 1rem 1.5rem;
    font-size: 1.7rem;
    font-family: Unbounded;
    font-weight: 500;
    line-height: 150%;
    background-color: rgba(130, 220, 247, 0.400);
    color: #fff;
    border-radius: 8px;
  }

  .list-container {
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Настройка отступа между списками */
  justify-content: space-between;
  }

  &__list-title {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #fff;
  }
  
  &__text {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #cfcfcf;
  }

  &__steps-list {
    list-style: decimal;
    margin-left: 20px;
  }

  &__steps-list-item {}

  &__list-wrapper {
    margin-bottom: 1rem; /* Отступ между списками */
  }

/* Убираем отступ у последнего списка */
  &__list-wrapper:last-child {
    margin-bottom: 0;
  }


  &__list {
    list-style: disc;
    padding-left: 20px;
    margin: 1rem 0;
  }
  

  &__list-item {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #cfcfcf;
  }

  @media (max-width: 479.98px) {
    &__title {
      font-size: 1.7rem;
    }

    &__list-item {
      font-size: 1.6rem;
    }

    &__text {
      font-size: 1.6rem;
    }
  }
}

@media (max-width: 479.98px) {
  .question .highlighted-text {
      font-size: 1.5rem;
    }
}

  @media (max-width: 379.98px) {
    .question {
      padding: 0 1.5rem;
    }
  }
</style>
