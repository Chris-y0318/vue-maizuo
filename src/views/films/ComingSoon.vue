<template>
  <div class="soon">
    <ul>
      <li v-for="data in dataList" :key="data.filmId">
          <img :src="data.poster" alt="影片封面">
          <div class="detail">
            <h3><span class="name">{{data.name}}</span><span class="item">{{data.filmType.name}}</span></h3>
            <p class="actor">主演：<span>{{data.actors | actorsFilter}}</span></p>
            <p>上映日期：{{data.premiereAt | dateFilter}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
import myaxios from '@/util/myAxios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      dataList: []
    }
  },
  computed: {
    // 在comingSoon组件中使用共享状态 cityId
    ...mapState('city', ['cityId'])
  },
  // methods: {

  // },
  mounted () {
    myaxios.request({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=890517`,
      methods: 'get',
      headers: {
        'X-Host': 'mall.film-ticket.film.list',
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1583129196382252089476","bc":${this.cityId}}`
      }
    }).then(res => {
      console.log(res.data)
      this.dataList = res.data.data.films
    })
  }
}
</script>
<style lang="scss" scoped>
  .soon {
    ul {
      li {
        width: 100%;
        height: 120px;
        padding: 13px;
        //怪异盒模型
        box-sizing: border-box;
        overflow: hidden;
        img {
          float: left;
          width: 66px;
          margin-right: 8px;
        }
        .detail {
          width: 248px;
          float: left;
          .actor {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
