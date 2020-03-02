<template>
    <div class="login">
        <button @click="handleLogin()">Login</button>
    </div>
</template>
<script>
export default {
  methods: {
    // 点击按钮
    handleLogin () {
      // Ajax请求，和后端交互，取得登录验证信息
      localStorage.setItem('token', JSON.stringify({ isLogin: true }))
      this.$router.push('/center')
    }
  }
}
</script>
