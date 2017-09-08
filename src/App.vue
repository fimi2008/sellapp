<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!--如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  import { urlParse } from './common/js/util.js'
  import api from './api/api.js'

//  const ERR_OK = 0

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let param = urlParse()
            return param.id
          })()
        }
      }
    },
    created () {
//      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
//        // success callback
//        response = response.body
//        if (response.errno === ERR_OK) {
//          this.seller = response.data
//          this.seller = Object.assign({}, this.seller, response.data)
//        }
//      }, response => {
//        // error callback
//      })
      api.seller(this.seller.id).then(({data}) => {
        this.seller = Object.assign({}, this.seller, data)
      }).catch((e) => {
        console.error(e)
      })
    },
    components: {
      'v-header': header
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
  //border-bottom 1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align center
      & > a
        display: block
        font-size 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

</style>
