<template>
    <li>
        <div class="cinemaInfo">
            <span class="heading">{{data.name}}</span>
            <span class="addr">{{data.address}}</span>
        </div>
        <div class="ticketInfo">
            <p>￥<span>{{parseInt(data.lowPrice/100)}}</span>元起</p>
        </div>
    </li>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style lang="scss" scoped>
  li {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .cinemaInfo {
      height: 45px;
      width: 320px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .heading {
        font-size: 15px;
        color: #191a1b;
      }
      .addr {
        font-size: 12px;
        color: #797d82;
      }
    }
    .ticketInfo {
      p {
        color: #ff5f16;
        font-size: 12px;
        span {
          font-size: 16px;
        }
      }
    }
  }

</style>
