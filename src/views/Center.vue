<template>
  <div>
    center组件由chris来负责
    <van-button type="info" @click="handleBtn()">信息按钮</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  methods: {
    handleBtn () {
      console.log('组件上emit了click事件')
    }
  },
  // 路由的钩子函数
  beforeRouteEnter (to, from, next) {
    // console.log('被拦截了')
    if (localStorage.getItem('token')) {
      next()
    } else {
      console.log('重定向到login')
      next('/login')
    }
  },
  beforeRouteUpdate () {
    // ...
  },
  beforeRouteLeave (to, from, next) {
    // ...
    next()
  }
}
</script>
<style lang="scss" scoped>
  div {
    color: green;
  }
</style>
