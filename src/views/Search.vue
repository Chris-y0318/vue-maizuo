<template>
  <v-touch v-on:swiperight="handleSwipeRight()">
    <div class="search">
      <div class="head">
          <!-- <div class="searchCinema">
              <i class="iconfont icon-search"></i>
              <form action="#">
                  <input type="text" placeholder="输入影城名称" v-model="inputText">
              </form>
          </div>
          <div class="cancel" @click="backToCinema()">取消</div> -->
        <form action="/">
          <van-search
            v-model="inputText"
            show-action
            placeholder="输入影城名称"
            @cancel="onCancel"
          />
        </form>
      </div>
      <div v-show="inputText">
        <!-- 如果匹配的数据不为空 -->
        <ul v-if="matchedList.length">
          <cinema-item v-for="data in matchedList" :key="data.cinemaId" :data="data">
          </cinema-item>
        </ul>
        <div v-else>
          <img src="#" alt="">
          <p>没有找到匹配的影院</p>
          <p>提示：仅支持搜索影院，建议您检查输入的影院名称是否有误？</p>
        </div>
      </div>
      <div class="closestCinema" v-show="!inputText">
        <p class="closest">离你最近</p>
        <ul>
          <!-- 组件内部运用computed属性 -->
          <!-- <li v-for="data in recommendList" :key="data.cinemaId">
            {{data.name}}
          </li> -->
          <!-- 使用vuex的getters -->
          <!-- <li v-for="data in $store.getters.recommendList" :key="data.cinemaId">
              {{data.name}}
          </li> -->
          <!-- 使用mapGetters函数截取后的共享状态 -->
          <li v-for="data in recommendList" :key="data.cinemaId">
              {{data.name}}
          </li>
        </ul>
      </div>
    </div>
  </v-touch>
</template>
<script>
import cinemaItem from './cinema/CinemaItem'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Vue from 'vue'
import { Search } from 'vant'
Vue.use(Search)
export default {
  data () {
    return {
      inputText: ''
    }
  },
  components: {
    cinemaItem
  },
  // // 解决模板过重问题
  // computed: {
  //   recommendList () {
  //     return this.$store.state.cinemasList.slice(0, 5)
  //   },
  //   matchedList () {
  //     // stringObject.includes(substr)  返回布尔值
  //     // stringObject.indexOf(subStr)  返回-1表示没有匹配到
  //     return this.$store.state.cinemasList.filter(item => item.name.includes(this.inputText) ||
  //     item.address.includes(this.inputText) || item.name.includes(this.inputText.toUpperCase()) ||
  //     item.name.includes(this.inputText.toLowerCase()) ||
  //     item.address.includes(this.inputText.toUpperCase()))
  //   }
  // },
  computed: {
    ...mapState('cinema', ['cinemasList']),
    ...mapState('city', ['cityId']),
    ...mapGetters('cinema', ['recommendList']),
    matchedList () {
      // stringObject.includes(substr)  返回布尔值
      // stringObject.indexOf(subStr)  返回-1表示没有匹配到
      return this.cinemasList.filter(item => item.name.includes(this.inputText) ||
      item.address.includes(this.inputText) || item.name.includes(this.inputText.toUpperCase()) ||
      item.name.includes(this.inputText.toLowerCase()) ||
      item.address.includes(this.inputText.toUpperCase()))
    }
  },
  methods: {
    // backToCinema () {
    //   this.$router.back()
    // },
    onCancel () {
      this.$router.back()
    },
    handleSwipeRight () {
      this.$router.back()
    },
    ...mapMutations('navBar', ['hide', 'show']),
    ...mapActions('cinema', ['getCinemaAction'])
  },
  mounted () {
    console.log('插入dom树完成')
    // this.isNavBarShow = false
    // 提交到Mutations中
    // this.$store.commit('navBar/hide')
    this.hide()
    console.log(this.cinemasList)
    if (this.cinemasList.length === 0) {
      // this.$store.dispatch('cinema/getCinemaAction')
      this.getCinemaAction(this.cityId)
    } else {
      console.log('内存中有缓存数据可以使用')
    }
  },
  destroyed () {
    console.log('离开该组件页面')
    // this.isNavBarShow = true
    // this.$store.commit('navBar/show')
    this.show()
  }
}
</script>
<style lang="scss" scoped>
  // .head {
  //     width: 100%;
  //     height: 48px;
  //     padding: 9px 15px;
  //     box-sizing: border-box;
  //     overflow: hidden;
  //     border-bottom: 1px solid rgba(88,87,86,0.1);
  //     .searchCinema {
  //       position: relative;
  //       float: left;
  //       height: 30px;
  //       width: calc(100% - 73px);
  //       padding-left: 30px;
  //       background: #f4f4f4;
  //       i {
  //         position: absolute;
  //         left: 5px;
  //         top: 0;
  //         display: inline-block;
  //         width: 20px;
  //         height: 20px;
  //         font-size: 20px;
  //         line-height: 30px;
  //       }
  //       form {
  //         input {
  //           width: 100%;
  //           height: 30px;
  //           border: none;
  //           background: #f4f4f4;
  //         }
  //       }
  //     }
  //     .cancel {
  //       float: right;
  //       width: 43px;
  //       height: 30px;
  //       text-align: right;
  //       line-height: 30px;
  //       font-size: 14px;
  //     }
  // }
  .closestCinema {
    .closest {
      padding-left: 15px;
      margin: 16px 0;
      font-size: 13px;
      color: #bdc0c5;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 15px 0 15px;
      li {
        height: 30px;
        padding: 8px 12px;
        margin: 0 8px 8px 0;
        box-sizing: border-box;
        text-align: center;
        line-height: 14px;
        font-size: 13px;
        background: hsla(0,0%,96%,.6);
      }
    }
  }
</style>
