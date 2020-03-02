<template>
    <div class="swiper-container" :class="defineClass">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  props: ['perview', 'defineClass'],
  mounted () {
    new Swiper('.' + (this.defineClass ? this.defineClass : 'swiper-container'), this.perview)
  }
}
</script>
