<template>
  <div>
    <div class="banner">
      <swiper :key="looplist.length">
        <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
          <img :src="data.imgUrl" alt="顶部轮播图片">
        </div>
      </swiper>
    </div>
    <div>
      <van-tabs v-model="activeName" title-active-color="#ff5f16">
        <van-tab title="正在热映" name="now" to="/films/nowPlaying"></van-tab>
        <van-tab title="即将上映" name="soon" to="/films/comingSoon"></van-tab>
      </van-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import swiper from '@/components/Swiper'
import myaxios from '@/util/myAxios'
import Vue from 'vue'
import { Toast, Tab, Tabs } from 'vant'
import { mapState } from 'vuex'
Vue.use(Toast).use(Tabs).use(Tab)
export default {
  data () {
    return {
      looplist: [],
      activeName: 'now'
    }
  },
  methods: {

  },
  components: {
    swiper
  },
  beforeMount () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  mounted () {
    myaxios.request({
      url: `/gateway?type=2&cityId=${this.cityId}&k=4475142`,
      method: 'get',
      headers: {
        // 不一样的请求头字段
        'X-Host': 'mall.cfg.common-banner',
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1583129196382252089476","bc":${this.cityId}}`
      }
    }).then(res => {
      Toast.clear()
      console.log(res.data)
      // const imgObj = {
      //   bannerId: 696,
      //   imgUrl: 'https://pic.maizuo.com/usr/movie/f046c5d6b2c397a8194ab14dc439d7dd.jpg?x-oss-process=image/quality,Q_70'
      // }
      // // ES6 将旧的数组展开，再把imgObj合并，得到一个新的数组
      // this.looplist = [...res.data.data, imgObj]
      // console.log(this.looplist)
      // 只有当looplist不为空时，才执行轮播
      if (res.data.data !== null) {
        this.looplist = res.data.data
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .banner {
    color: blue;
    img {
      width: 100%;
      height: 213px;
    }
  }
</style>
