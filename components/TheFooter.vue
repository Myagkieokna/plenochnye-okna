<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__top">
          <div class="footer__left-column">
            <div class="footer__logo">
              <a href="#" style="display: inline-block;"><img style="width: 146px; height: 136px;" src="~/assets/svg/logo.svg" alt="Logo" /></a>
            </div>
          </div>
          <div class="footer__right-column">
            <p class="footer__list-title">Контакты</p>
            <div class="block-text" style="display: flex; flex-direction: column; gap: 0.5rem">
              <a
                class="footer__button-link"
                href="tel:+79661266606"
                target="_blank"
                aria-label="Позвонить"
                >+7 (966) 126-66-06</a
              >
              <a class="footer__button-link" href="mailto:plenochnieokna@mail.ru">plenochnieokna@mail.ru</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__text">
              Все права защищены © 2016 – 2024 Цены на сайте для ознакомления — не являются публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской Федерации. Компания оставляет за собой права без уведомления пользователя изменять цены на сайте
            </p>
            <p class="footer__text" style="font-size: 1.5rem;">
             Разработано <a href="https://t.me/chernyshevskiii" target="_blank" style="font-weight: 600; font-size: 1.6rem;">Илья Чернышевский</a>
            </p>
          <!-- <div class="footer__bottom-left">
            <ul class="footer__bottom-list">
              <li class="footer__bottom-list-item">
                <a class="footer__bottom-list-item-link" href="#"
                  >Политика конфиденциальности</a
                >
              </li>
              <li class="footer__bottom-list-item">
                <a class="footer__bottom-list-item-link" href="#"
                  >Публичная оферта</a
                >
              </li>
              <li class="footer__bottom-list-item">
                <a class="footer__bottom-list-item-link" href="#"
                  >Пользовательское соглашение</a
                >
              </li>
            </ul>
          </div>
          <div class="footer__bottom-right">
            <IconMIR />
            <IconVISA />
            <IconMasterCard />
            <IconQIWI />
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<!-- <div class="footer__right-column">
  <div class="footer__form-inner">
    <h5 class="footer__form-title">Нужна помощь?</h5>
    <div
      class="footer__form-input-wrapper footer__form-input-wrapper-chat"
    >
      <input
        class="footer__form-input"
        type="text"
        placeholder="Чат с поддержкой"
      />
    </div>
    <div
      class="footer__form-input-wrapper footer__form-input-wrapper-email"
    >
      <input
        class="footer__form-input"
        type="email"
        placeholder="support@smmsmm.net"
      />
    </div>
  </div>
</div> -->


<style scoped lang="scss">
.footer {
  background: #212121;
  &__inner {
    padding-top: 3.2rem;
    padding-bottom: 2.4rem;
  }

  &__top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4rem;
  }

  &__button-link {
    font-family: "Unbounded";
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 160%;
    color: #fff;
    &:hover {
      color: #82dbf7;
    }
  }

  &__list-title {
    font-family: "Unbounded";
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    color: #fff;
    margin-bottom: 1.5rem;
  }


  &__text {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #cfcfcf;
    margin-top: 4.8rem;
    transition: all 0.2s;

    &>a {
      color: #e0e0e0;
      transition: all 0.2s;
      &:hover {
        color: #fff;
      }
    }
  }

  &__list-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 4.8rem;
  }

  &__list {
    &:not(:last-child) {
      margin-right: 5.6rem;
    }
  }

  &__list-item {
    &:not(:last-child) {
      margin-bottom: 1.2rem;
    }
  }

  &__list-item-link {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 160%;
    color: #676767;
  }

  &__right-column {
  }

  &__form-inner {
    background: #ffffff;
    border-radius: 24px;
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    // max-width: 31.8rem;
    // width: 100%;
  }

  &__form-title {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 133%;
    color: #676767;
    margin-bottom: 1.6rem;
  }

  &__form-input-wrapper {
    position: relative;

    &:not(:last-child) {
      margin-bottom: 1.2rem;
    }

    &::before {
      position: absolute;
      content: "";
      top: 50%;
      left: 20px;
      transform: translate(0, -50%);
      z-index: 5;
    }
  }

  &__form-input-wrapper-chat {
    &::before {
      content: url(../assets/svg/Chat.svg);
    }
  }

  &__form-input-wrapper-email {
    &::before {
      content: url(../assets/svg/E-mail.svg);
    }
  }

  &__form-input {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 160%;
    color: #676767;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 1.15rem 2rem 1.15rem 6rem;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  &__bottom-left {
  }

  &__bottom-list {
    display: flex;
    align-items: center;
    gap: 5.6rem;
  }

  &__bottom-list-item {
  }

  &__bottom-list-item-link {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 160%;
    color: #b0b0b0;
  }

  &__bottom-right {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  @media (max-width: 479.98px) {
    &__text {
      font-size: 1.6rem;
      margin-top: 3rem;
    }
  }
}
</style>