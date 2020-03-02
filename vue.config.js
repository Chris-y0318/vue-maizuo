module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: { // 反向代理配置
      // 判断：如果是ajax请求
      '/ajax': {
        // 就转代理到target路径上
        target: 'http://m2.maoyan.com',
        changeOrigin: true
        // pathRewrite: {  //重写路径
        // '^/jack': ''
        // }
      }
    }
  }
}
