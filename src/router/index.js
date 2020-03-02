import Vue from 'vue'
// 引入vue-router核心模块
import VueRouter from 'vue-router'
import Films from '@/views/Films'
// import Cinema from '@/views/Cinema'
// import Center from '@/views/Center'
import ErrorPage from '@/views/ErrorPage'
import Login from '@/views/Login'
import NowPlaying from '@/views/films/NowPlaying'
import ComingSoon from '@/views/films/ComingSoon'
import Detail from '@/views/Detail'
// 注册该模块，让它生效
Vue.use(VueRouter)

// 路由映射表
const routes = [
  {
    // 路径是/films
    path: '/films',
    // 就加载films组件
    component: Films,
    children: [
      {
        path: '/films/nowPlaying',
        component: NowPlaying
      },
      {
        path: '/films/comingSoon',
        component: ComingSoon
      },
      {
        // 切换到films路由
        path: '/films',
        // 再重定向到films/nowPlaying路由
        redirect: '/films/nowPlaying'
      }
    ]
  },
  {
    path: '/cinema',
    // component: Cinema
    component: () => import('@/views/Cinema')
  },
  {
    path: '/cinema/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  },
  {
    path: '/center',
    // component: Center
    component: () => import(/* webpackChunkName: 'mc' */'@/views/Center')
  },
  // 非嵌套路由必须要有前导斜杠字符（/）
  {
    // 动态路由：只要格式满足条件，其他好说
    // 这里必须要有冒号（:），后面的filmDetail只是占位符
    path: '/film/:filmDetail',
    component: Detail
  },
  {
    // 页面初次加载完成时
    path: '/',
    // 直接定向到films路由页面
    redirect: '/films'
  },
  // {
  //   // 用户输入非法的路径，重定向到nowPlaying路由
  //   path: '*',
  //   redirect: '/films/nowPlaying'
  // },
  {
    path: '/login',
    component: Login
  },
  {
    // 优先级最低，当前面的路由都不匹配时，它生效
    path: '*',
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// // 配置全局的路由拦截（守卫）
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   // 只有路由切换到/center时才拦截
//   // 判断
//   if (to.path === '/center') {
//     // console.log('被拦截了')
//     // 再次判断：用户是否登录成功
//     // 成功，执行next()，否则，重定向切换到login路由页面
//     if (localStorage.getItem('token')) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

// 导出router模块
export default router
