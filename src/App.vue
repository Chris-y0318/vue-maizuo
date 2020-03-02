<template>
  <div id="app">
    <!-- <navbar v-show="$store.state.isNavBarShow"></navbar> -->
    <navbar v-show="isNavBarShow"></navbar>
    <!-- 路由出口 -->
    <!-- 基于slot的封装 -->
    <transition name="change" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import NavBar from './components/FootNavBar'
import { mapState } from 'vuex'
export default {
  // mounted () {
  //   console.log(this.$store)
  // },
  // components: {
  //   navbar: NavBar
  // }
  mounted () {
    console.log(this.$store)
  },
  components: {
    navbar: NavBar
  },
  computed: {
    ...mapState('navBar', ['isNavBarShow'])
  }
}
</script>
<style lang="scss">
  body,h1,h2,h3,h4,h5,h6,p,ul,ol,dl,dd,hr,td,input,option,textarea,fieldset,figure{
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  input {
    outline: none;
  }
  // html {
  //   touch-action: none;
  // }
  .change-enter-active {
    animation: motion 0.5s
  }
  .change-leave-active {
    animation: motion 0.5s reverse
  }
  @keyframes motion {
    0% {
      opacity: 0;
      transform: translateY(20px)
    }
    100% {
      opacity: 1;
      transform: translateY(0)
    }
  }
</style>
