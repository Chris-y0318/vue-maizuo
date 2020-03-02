<template>
  <!-- v-if条件渲染，初始化时，为空，filmInfo为false，不渲染页面 -->
  <!-- 等数据请求回来后，v-if为true，开始渲染页面 -->
  <div class="detail" v-if="filmInfo">
      <m-title v-title="44" @back="handleBack">
        {{filmInfo.name}}
      </m-title>
      <div class="banner">
        <img src="@/assets/imgs/prev.png" alt="" class="backto" @click="handlebackto()">
        <img :src="filmInfo.poster" alt="电影封面" class="poster">
      </div>
      <!-- filmInfo.filmType为undefined，它没有name属性 ，所以会报错-->
      <h3><span>{{filmInfo.name}}</span><span>{{filmInfo.filmType.name}}</span></h3>
      <p class="category">{{filmInfo.category}}</p>
      <p class="prem"><span>{{filmInfo.premiereAt | dateFilter}}</span>待定</p>
      <p>{{filmInfo.nation}} | {{filmInfo.runtime}}</p>
      <div :class="isActive?'synopsis':''" class="bgIntro">
        {{filmInfo.synopsis}}
      </div>
      <div class="toggle">
        <i class="iconfont icon-fdown" @click="handleClick()" v-if="isBtnShow"></i>
        <i class="iconfont icon-bup" @click="handleClick()" v-else></i>
      </div>
      <div class="actors">
        <h3>演职人员</h3>
        <!-- 前面v-if做了判断，只有请求的数据返回，插入到dom树，才初始化swiper -->
        <swiper :perview="{
          slidesPerView: 3,
          spaceBetween: 20,
          freeMode: true
        }" defineClass="actors">
          <div class="swiper-slide" v-for="(data,index) in filmInfo.actors" :key="index">
            <img :src="data.avatarAddress" alt="演职人员图片">
          </div>
        </swiper>
      </div>
      <div class="photo">
        <div class="heading">
          <h3>剧照</h3>
          <p @click="isPhotoShow=true">全部({{filmInfo.photos.length}})<i class="iconfont icon-boldnext"></i></p>
        </div>
        <swiper :perview="{
          slidesPerView: 2,
          spaceBetween: 10,
          freeMode: true
        }" defineClass="photos">
          <div class="swiper-slide" v-for="(data,index) in filmInfo.photos" :key="data" @click="handlePreview(index)">
            <img :src="data" alt="剧照图片">
          </div>
        </swiper>
      </div>
      <m-photos v-show="isPhotoShow" :list="filmInfo.photos" @evt="handlePreview($event)">
        <m-title @back="handlePhotoShow">
          剧照({{filmInfo.photos.length}})
        </m-title>
      </m-photos>
  </div>
</template>
<script>
import myaxios from '@/util/myAxios'
import swiper from '@/components/Swiper'
import photos from './Detail/Photos'
import Vue from 'vue'
import { ImagePreview, Toast } from 'vant'
import { mapState } from 'vuex'
Vue.use(ImagePreview).use(Toast)
export default {
  components: {
    swiper,
    'm-photos': photos
  },
  data () {
    return {
      // 初始化时，filmInfo若为空对象或者空数据
      filmInfo: null,
      isActive: true,
      isPhotoShow: false,
      isBtnShow: true
    }
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
    // 怎么利用唯一的id请求数据？
    console.log(this.$route, this.$route.params.filmDetail)
    myaxios.request({
      url: `/gateway?filmId=${this.cityId}&k=2841023`,
      method: 'get',
      headers: {
        'X-Host': 'mall.film-ticket.film.info',
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1583129196382252089476","bc":${this.cityId}}`
      }
    }).then(res => {
      Toast.clear()
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  },
  methods: {
    handlebackto () {
      this.$router.back()
    },
    handleBack () {
      this.$router.back()
    },
    handlePhotoShow () {
      this.isPhotoShow = false
      // 点击返回按钮handleBack已经触发，回到上一页
      // 若再次执行下面的语句会返回到nowPlaying页面
      // this.$router.back()
    },
    handleClick () {
      this.isActive = !this.isActive
      this.isBtnShow = !this.isBtnShow
    },
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left',
        loop: false,
        onClose () {
          // do something
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .detail {
      // background: skyblue;
      margin-bottom: 60px;
    .poster {
      width: 100%;
    }
    .bgIntro {
      font-size: 13px;
      color: #797d82;
      line-height: 22px;
      padding-left: 15px;
      padding-right: 15px;
    }
    .synopsis {
      height: 44px;
      overflow: hidden;
      // font-size: 14px;
      // color: #797d82;
    }
    .toggle {
      text-align: center;
    }
  }
  .actors .swiper-slide img {
    width: 85px;
  }
  .photos .swiper-slide img {
    height: 82px;
  }
  .heading {
    overflow: hidden;
    width: 100%;
    h3 {
      float: left;
    }
    p {
      float: right;
      margin-right: 10px;
      font-size: 14px;
      color: #797d82;
    }
  }
  .banner {
    position: relative;
    .backto {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: white;
    }
  }
</style>
