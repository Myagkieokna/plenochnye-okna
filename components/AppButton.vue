<template>
  <button class="v-btn" :class="className">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "v-btn",
  props: {
    title: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: "",
    },
    orange: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    grey: {
      type: Boolean,
      default: false,
    },
    arrowLeft: {
      type: Boolean,
      default: false,
    },
    arrowRight: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        "v-btn__disabled": this.disabled,
        "v-btn__error": this.error,
        "v-btn__success": this.success,
        "v-btn__white": this.white,
        "v-btn__orange": this.orange,
        "v-btn__grey": this.grey,
        "v-btn__arrow-left": this.arrowLeft,
        "v-btn__arrow-right": this.arrowRight,
      };
    },
  },
};
</script>

<style lang="scss">
.v-btn {
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
  &:hover {
    background: rgb(167 229 247);
  }

  &__orange {
    color: #222222;
    background: #82dbf7;
    box-shadow: 0px 12px 40px rgba(255, 119, 45, 0.2);
  }
  &__white {
    color: #ff772d;
    border: 1px solid #82dbf7;
    filter: drop-shadow(0px 12px 40px rgba(255, 119, 45, 0.2));
    border-radius: 16px;
  }

  &__grey {
    background: #f9f9f9;
    color: #212121;
  }

  &__arrow-left {
    position: relative;
    &::before {
      position: absolute;
      content: url(../assets/svg/Arrow.svg);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__arrow-right {
    position: relative;
    &::before {
      position: absolute;
      content: url(../assets/svg/Arrow.svg);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }
}

@media (max-width:379.98px) {
    .v-btn {
      font-size: 1.6rem;
    }
  }
</style>