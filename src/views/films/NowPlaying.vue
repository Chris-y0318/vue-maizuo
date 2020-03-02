<template>
  <div class="box">
    <ul>
      <li v-for="data in dataList" :key="data.filmId" @click="handleClick(data.filmId)">
          <img :src="data.poster" alt="影片封面">
          <div class="detail">
            <h3><span class="name">{{data.name}}</span><span class="item">2D</span></h3>
            <p>观众评分<span class="grade">{{data.grade}}</span></p>
            <p class="actor">主演：<span>{{data.actors | actorsFilter}}</span></p>
            <p>{{data.nation}} | {{data.runtime}}分钟</p>
          </div>
          <div class="ticket">购票</div>
      </li>
    </ul>
    <div class="no-more">-无更多电影-</div>
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
  mounted () {
    console.log(this.cityId)
    myaxios.request({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=9123751`,
      method: 'get',
      headers: {
        'X-Host': 'mall.film-ticket.film.list',
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1583129196382252089476","bc":${this.cityId}}`
      }
    }).then(res => {
      console.log(res.data)
      this.dataList = res.data.data.films
    })
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/film/${id}`)
    }
    // handleTicket() {
    //   this.$router.push('/film/4645/cinemas')
    // }
  }
  // // 组件内过滤器，只有当前组件可以用
  // filters: {
  //   actorsFilter: function (value) {
  //     console.log(value)
  //     let arr = []
  //     for (let i = 0; i < value.length; i++) {
  //       arr.push(value[i].name)
  //     }
  //     let str = arr.join(' ')
  //     return str
  //   }
  // }
}
</script>
<style lang="scss" scoped>
  .box {
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
        div {
          float: left;
          width: 220px;
          h3 {
            font-weight: normal;
            font-size: 16px;
            color: #191a1b;
            .name {
              margin-right: 6px;
              vertical-align: middle;
            }
            .item {
              font-size: 10px;
              color: #fff;
              background: #d2d6dc;
              padding: 0 2px;
              display: inline-block;
              vertical-align: middle;
            }
          }
          p {
          color: #797d82;
          font-size: 14px;
          .grade {
            color: #ffb232;
            font-size: 16px;
            }
          }
          .actor {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .ticket {
          float: right;
          width: 50px;
          height: 26px;
          border: 1px solid #ff5f16;
          box-sizing: border-box;
          border-radius: 4px;
          text-align: center;
          font-size: 14px;
          color: #ff5f16;
          line-height: 26px;
          margin-top: 34px;
        }
      }
    }
    .no-more {
      width: 100%;
      height: 59px;
      background: #ededed;
      color: #bdc0c5;
      font-size: 12px;
      text-align: center;
      line-height: 59px;
    }
  }
</style>
