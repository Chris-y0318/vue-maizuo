<template>
  <div class="photos">
    <slot></slot>
    <div class="container">
      <div v-for="(data,index) in list" :key="data" @click="handleClick(index)">
        <img :src="data" alt="剧照">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  methods: {
    handleClick (index) {
      this.$emit('evt', index)
    }
  }
}
</script>
<style lang="scss" scoped>
  .photos {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 9;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 44px;
  }
  .container div {
    width: 33.33%;
    padding: 5px;
    box-sizing: border-box;
    img {
        width: 100%;
    }
  }
</style>
