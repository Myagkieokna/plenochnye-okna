<script setup lang="ts">
import { ref } from "vue"
import { formatPhoneNumber } from "~/utils/phoneFormatting"
import { phoneValidator } from "~/utils/phoneValidation"
import * as yup from "yup"

const emit = defineEmits<{
  (e: "close"): void
  (e: "submit", payload: { name: string; phone: string }): void
}>()

const name = ref("")
const phone = ref("")
const phoneError = ref<string | null>(null)

const handlePhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  phone.value = formatPhoneNumber(target.value)
  validatePhone()
}

const validatePhone = async () => {
  try {
    await phoneValidator.validate(phone.value)
    phoneError.value = null
  } catch (err: any) {
    phoneError.value = err.message
  }
}

const handleSubmit = async () => {
  await validatePhone()
  if (phoneError.value) return

  emit("submit", { name: name.value, phone: phone.value })
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <div style="display: flex; gap: 1rem;"><svg width="36" height="42" viewBox="0 0 36 42" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_dd_1505_27990)">
            <path
              d="M15.1429 14.3333V15.6429C15.1429 17.2208 16.422 18.5 18 18.5V18.5C19.578 18.5 20.8571 17.2208 20.8571 15.6429V14.3333M15.1429 14.3333V13.9627C15.1429 13.321 14.8152 12.7353 14.3809 12.2629C13.5253 11.3324 13 10.0724 13 8.68519C13 5.82149 15.2386 3.5 18 3.5C20.7614 3.5 23 5.82149 23 8.68519C23 10.0724 22.4747 11.3324 21.6191 12.2629C21.1848 12.7353 20.8571 13.321 20.8571 13.9627V14.3333M15.1429 14.3333H20.8571"
              stroke="#82DBF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <filter id="filter0_dd_1505_27990" x="-4" y="-1" width="44" height="44" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha" />
              <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1505_27990" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.301961 0 0 0 0 0.384314 0 0 0 0 0.898039 0 0 0 0.16 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1505_27990" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha" />
              <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_1505_27990" />
              <feOffset dy="10" />
              <feGaussianBlur stdDeviation="7.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.301961 0 0 0 0 0.384314 0 0 0 0 0.898039 0 0 0 0.16 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_1505_27990" result="effect2_dropShadow_1505_27990" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1505_27990" result="shape" />
            </filter>
          </defs>
        </svg>

        <h3 class="modal__h3">Есть вопросы?</h3>
      </div>
      <p class="modal__text">
        Оставьте заявку — мы перезвоним и ответим на все ваши вопросы.
      </p>
      <form class="modal__form" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="modal__label">Ваше имя</label>
          <input id="name" class="modal__input" v-model="name" type="text" placeholder="Ваше имя" required />
        </div>

        <div>
          <label for="phone" class="modal__label">Телефон</label>
          <input id="phone" class="modal__input" :class="{ 'error-input': phoneError }" :value="phone"
            @input="handlePhoneInput" type="tel" placeholder="+7 (XXX) XXX-XX-XX" required />
          <p v-if="phoneError" class="error-text">{{ phoneError }}</p>
        </div>

        <div style="display: flex; justify-content: end;">
          <button class="modal__btn" type="submit">Отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #1A1D21;
  max-width: 400px;
  border-radius: 15px;
  padding: 20px 30px;
  max-width: 479px;
  width: 100%;
  margin: 2rem;
}

.modal__h3 {
  color: #82DBF7;
  font-family: "Unbounded";
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 150%;
  letter-spacing: 0.01em;
}

.modal__text {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 143%;
  letter-spacing: 0.01em;
  color: #ffffff;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
}

.modal__label {
  display: block;
  margin-bottom: 1.5rem;
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 500;
  color: #CDCECF;
}

.modal__input {
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
  width: 100%;
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal__btn {
  border-radius: 12px;
  padding: 8px 24px;
  background: #82DBF7;
  max-width: 180px;
  height: 48px;
  font-family: "Nunito Sans";
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: #0C1132;
}

.error-text {
  color: #D0302F;
  display: block;
  margin-top: 1rem;
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 500;
}
</style>
