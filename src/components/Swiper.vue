<template>
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swp-page swiper-slide" v-for="list in lists" :key="list.length">
      <a class="js-no-follow" :href="list.clickUrl">
        <img class="goods-main-photo fadeIn" :src="list.img">
      </a>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'Swiper',
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  mounted () {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: true,
      speed: 400
    }).init()
  }
}
</script>

<style scoped>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
