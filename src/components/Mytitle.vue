<template>
  <div class="mytitle">
    <i class="iconfont icon-boldback" @click="handleClick()"></i>
    <span><slot></slot></span>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick () {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss" scoped>
  .mytitle {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background: white;
    text-align: center;
    line-height: 44px;
    z-index: 2;
    i {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
