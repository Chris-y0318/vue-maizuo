<template>
    <div class="city">
        <div class="top"><i class="iconfont icon-back" @click="handleBack()"></i><span>当前城市 -</span></div>
        <van-index-bar :index-list="indexList" class="indexBar">
            <div v-for="(data,index) in citylist" :key="index">
                <van-index-anchor :index="data.index">{{data.index}}</van-index-anchor>
                <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click="handleClick(item)"/>
            </div>
        </van-index-bar>
    </div>
</template>
<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell } from 'vant'
import myaxios from '@/util/myAxios'
import { mapMutations, mapState } from 'vuex'
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
export default {
  data () {
    return {
    //   indexList: ['A', 'B', 'C'],
      indexList: [],
      //   模拟的数据结构
      //   datalist: [
      //     {
      //       index: 'A',
      //       list: ['A1', 'A2', 'A3']
      //     },
      //     {
      //       index: 'B',
      //       list: ['B1', 'B2', 'B3']
      //     },
      //     {
      //       index: 'C',
      //       list: ['C1', 'C2', 'C3']
      //     }
      //   ]
      citylist: []
    }
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  mounted () {
    myaxios.request({
      url: '/gateway?k=1922465',
      methods: 'get',
      headers: {
        'X-Host': 'mall.film-ticket.city.list',
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1583129196382252089476","bc":${this.cityId}}`
      }
    }).then(res => {
      console.log(res.data.data.cities)
      this.dataFilter(res.data.data.cities)
    })
  },
  methods: {
    dataFilter (cities) {
      // 创建26个大写英文字母
      var letterArr = []
      for (let i = 65; i < 91; i++) {
        // console.log(i, String.fromCharCode(i))
        letterArr.push(String.fromCharCode(i))
      }
      console.log(letterArr)
      // 遍历letterArr，与cities中每一项的pinyin属性的首字母转换为大写之后的数据进行匹配
      var cityArr = []
      for (let j = 0; j < letterArr.length; j++) {
        // console.log(cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[j]))
        var temArr = cities.filter(item => item.pinyin.substr(0, 1).toUpperCase() === letterArr[j])
        // if (temArr.length !== 0) {
        //   cityArr.push({
        //     index: letterArr[j],
        //     list: temArr
        //   })
        // }
        // citylist 数据
        temArr.length && cityArr.push({
          index: letterArr[j],
          list: temArr
        })
        // indexList 数据
        temArr.length && this.indexList.push(letterArr[j])
      }
      console.log(cityArr)
      this.citylist = cityArr
    },
    // 点击城市名处理函数
    handleClick (data) {
    //   console.log('666')
      // 修改vuex中共享的状态cityId,cityName
      this.setCityName(data.name)
      this.setCityId(data.cityId)
      //   // 手动把数据存在localStorage中
      //   localStorage.setItem('cityId', data.cityId)
      //   localStorage.setItem('cityName', data.CityName)
      this.$router.back()
    },
    handleBack () {
      this.$router.back()
    },
    // 在city命名空间中，commit setCityName()和setCityId()方法
    ...mapMutations('city', ['setCityName', 'setCityId'])
  }
}
</script>
<style lang="scss" scoped>
  .city {
    width: 100%;
    height: 100%;
  }
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background: white;
    z-index: 2;
    i {
      position: absolute;
      left: 0;
      display: inline-block;
      margin-top: 13px;
      margin-left: 10px;
      width: 18px;
      height: 18px;
      font-size: 18px;
    }
    span {
      display: block;
      width: 298px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      margin: 0 auto;
    }
  }
  .indexBar {
    margin-top: 44px;
  }
</style>
