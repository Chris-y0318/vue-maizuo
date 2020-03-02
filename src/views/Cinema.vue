<template>
  <div>
    <div class="head">
      <div class="city" @click="goToCity()">{{cityName}}<i class="iconfont icon-fdown"></i></div>
      <div class="cinema">影院</div>
      <div class="search" @click="gotoSearch()"><i class="iconfont icon-search"></i></div>
    </div>
    <div class="select">
      <div class="areachoose" @click="isAreaShow=!isAreaShow" :class="isAreaShow?'selected':''">{{current}}<span><i class="iconfont icon-fdown"></i></span></div>
      <div>App订票<span><i class="iconfont icon-fdown"></i></span></div>
      <div>最近去过<span><i class="iconfont icon-fdown"></i></span></div>
    </div>
    <div class="area" v-show="isAreaShow">
      <ul>
        <li v-for="data in areaList" :key="data" @click="handleArea(data)" :class="current===data?'active':''">
          {{data}}
        </li>
      </ul>
    </div>
    <div class="content">
      <ul>
        <cinema-item v-for="data in computedCinemalist" :key="data.cinemaId" :data="data">
        </cinema-item>
      </ul>
    </div>
  </div>
</template>
<script>
import cinemaItem from './cinema/CinemaItem'
// mapState是vuex中映射/切割共享状态的函数
import { mapState, mapActions, mapMutations } from 'vuex'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      // cinemalist: [],
      isAreaShow: false,
      current: '全城',
      isActive: false
    }
  },
  components: {
    cinemaItem
  },
  // mounted () {
  //   myaxios.request({
  //     url: '/gateway?cityId=310100&ticketFlag=1&k=8779020',
  //     method: 'get',
  //     headers: {
  //       'X-Host': 'mall.film-ticket.cinema.list'
  //     }
  //   }).then(res => {
  //     console.log(res.data)
  //     this.cinemalist = res.data.data.cinemas
  //     // const arr = this.cinemalist.map(item => item.districtName)
  //     // const areaList = Array.from(new Set(arr))
  //     // const len = areaList.unshift('全城')
  //     // console.log(areaList, len)
  //   })
  // },
  beforeMount () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
      overlay: true
    })
  },
  mounted () {
    // dispatch getCinemaAction 到actions
    // 从search页面回到cinema页面，cinema页面会再次dispatch getCinemaAction
    // 所以要判断
    if (this.cinemasList.length === 0) {
      // this.$store.dispatch('cinema/getCinemaAction')
      this.getCinemaAction(this.cityId).then(res => {
        console.log('异步数据请求已结束')
        Toast.clear()
      })
    } else {
      console.log('有缓存数据可以使用，不用再次请求数据了')
      Toast.clear()
    }
  },
  methods: {
    handleArea (data) {
      // console.log(data)
      // 改变current的值
      this.current = data
      this.isAreaShow = false
    },
    gotoSearch () {
      this.$router.push('/cinema/search')
    },
    goToCity () {
      // 点击城市名时才清空共享状态cinemasList
      this.setCinemaList([])
      this.$router.push('/city')
    },
    ...mapMutations('cinema', ['setCinemaList']),
    ...mapActions('cinema', ['getCinemaAction'])
  },
  // computed: {
  //   areaList () {
  //     const arr = this.$store.state.cinemasList.map(item => item.districtName)
  //     // 数组去重 Set结构
  //     // const newArr = Array.from(new Set(arr))
  //     // newArr.unshift('全城')
  //     const arealist = ['全城', ...new Set(arr)]
  //     return arealist
  //   },
  //   computedCinemalist () {
  //     if (this.current === '全城') {
  //       return this.$store.state.cinemasList
  //     } else {
  //       return this.$store.state.cinemasList.filter(item => item.districtName === this.current)
  //     }
  //   }
  // }
  computed: {
    // 调用mapState函数，返回一个对象，展开该对象，获取到共享状态cinemasList
    ...mapState('cinema', ['cinemasList']),
    ...mapState('city', ['cityName', 'cityId']),
    areaList () {
      const arr = this.cinemasList.map(item => item.districtName)
      // 数组去重 Set结构
      // const newArr = Array.from(new Set(arr))
      // newArr.unshift('全城')
      const arealist = ['全城', ...new Set(arr)]
      return arealist
    },
    computedCinemalist () {
      if (this.current === '全城') {
        return this.cinemasList
      } else {
        return this.cinemasList.filter(item => item.districtName === this.current)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background: white;
    // overflow: hidden;
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 44px;
    z-index: 1;
    .city {
      // float: left;
      width: 62px;
    }
    .cinema {
      // float: left;
      flex: 1;
    }
    .search {
      // float: right;
      width: 62px;
      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
  .select {
    position: fixed;
    top: 44px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    background: white;
    z-index: 2;
    div {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 48px;
    }
    .selected {
      color: #ff5f16;
    }
  }
  .content {
    margin-top: 92px;
    ul {
      width: 100%;
    }
  }
  .area {
    position: fixed;
    top: 92px;
    width: 100%;
    background: white;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        width: 25%;
        padding: 6px;
        flex-shrink: 1;
        box-sizing: border-box;
        border: 1px solid rgba(210,214,220,.5);
        border-radius: 4px;
        text-align: center;
        font-size: 12px;
      }
      .active {
        color: #ff5f16;
        border: 1px solid #ff5f16;
      }
    }
  }
</style>
