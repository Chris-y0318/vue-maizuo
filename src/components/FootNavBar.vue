<template>
    <div class="navbar">
        <ul>
            <!-- <li v-for="data in datalist" :key="data.id">{{data.text}}</li> -->
            <router-link :to="data.path" tag="li" activeClass="highlight" v-for="data in datalist" :key="data.id">
              <i class="iconfont" :class="data.icon"></i>
              <span>{{data.text}}</span>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      datalist: [
        {
          id: 0,
          text: '电影',
          path: '/films',
          icon: 'icon-movie'
        },
        {
          id: 1,
          text: '影院',
          path: '/cinema',
          icon: 'icon-cinema'
        },
        {
          id: 2,
          text: '我的',
          path: '/center',
          icon: 'icon-wode'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .navbar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    padding: 8px;
    box-sizing: border-box;
    z-index: 2;
    background: skyblue;
    ul {
      display: flex;
      list-style: none;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        line-height: 22px;
        text-align: center;
        font-size: 12px;
      }
    }
  }
  .highlight {
      color: rgb(255, 127, 36);
  }
</style>
