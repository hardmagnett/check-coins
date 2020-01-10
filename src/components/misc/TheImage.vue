<template>
  <img
    :src="srcToShow"
    class="the-image"
    :class="{
      'the-image--incorrect': checkState === 'incorrect',
      'the-image--checking': checkState === 'checking',
    }"
  >
</template>

<script>
/**
 * Применение: работает так-же как с обычным тегом img
 * Нужен чтобы при отсутсвии изображения показывать заглушку.
 * Убрать вывод в консоль браузера 404-х похоже невозможно.
 */
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: '',
    },
    srcLoading: {
      type: String,
      // прозрачный пиксель
      default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
    srcIncorrect: {
      type: String,
      // прозрачный пиксель. Можно указать "Мертвого пёсика", как в вк.
      default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
  },
  data: () => ({
    checkState: 'checking', // 'checking', 'correct', incorrect
  }),

  computed: {
    srcToShow() {
      let result = ''
      switch (this.checkState) {
        case 'correct':
          result = this.src
          break
        case 'incorrect':
          result = this.srcIncorrect
          break
        case 'checking':
          result = this.srcLoading
          break
        default:
          result = '/img/no-image.png'
      }
      return result
    },
  },
  watch: {
    src() {
      this.checkSrc()
    },
  },
  mounted() {
    this.checkSrc()
  },
  methods: {
    checkSrc() {
      this.checkState = 'checking'

      if (!this.src) {
        this.checkState = 'incorrect'
      } else {
        const imgForCheck = new Image()

        imgForCheck.addEventListener('load', () => {
          this.checkState = 'correct'
        })
        imgForCheck.addEventListener('error', () => {
          this.checkState = 'incorrect'
        })
        imgForCheck.src = this.src
      }
    },
  },

}
</script>

<style scoped lang="scss">
  .the-image {}

  .the-image--incorrect {
    object-fit: contain !important;
    background-color: transparent !important;
  }

  .the-image--checking {
    object-fit: cover !important;
  }

  .the-image--hidden {
    opacity: 0
  }

</style>
