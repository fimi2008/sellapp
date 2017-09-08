<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="seller-info">
        <div class="content border-1px">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favorite" @click="_toggleFavorite">
            <i class="icon-favorite" :class="{'active':favorite}"></i>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <div class="delivery-wrapper">
          <div class="item">
            <h2 class="title">起送价</h2>
            <p class="text"><span class="data">{{seller.minPrice}}</span>元</p>
          </div>
          <div class="item">
            <h2 class="title">商家配送</h2>
            <p class="text"><span class="data">{{seller.deliveryPrice}}</span>元</p>
          </div>
          <div class="item">
            <h2 class="title">平均配送时间</h2>
            <p class="text"><span class="data">{{seller.deliveryTime}}</span>分钟</p>
          </div>
        </div>
      </div>
      <split></split>
      <div class="notice-wrapper">
        <h1 class="title">公告与活动</h1>
        <p class="bulletin border-1px">{{seller.bulletin}}</p>
        <ul>
          <li v-for="item in seller.supports" class="support-item border-1px">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="picsWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="item in seller.pics">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos-wrapper">
        <h1 class="title  border-1px">商家信息</h1>
        <p v-for="item in seller.infos" class="item border-1px">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import { saveToLocal, loadFromLoacl } from '../../common/js/store.js'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLoacl(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created () {
//      在created方法中定义一个classMap来定义折扣类型
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {click: true})
        } else {
          this.scroll.refresh()
        }
      },
      _initPic () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picsWrapper, {scrollX: true, eventPassthrough: true})
            } else {
              this.picScroll.refresh()
            }
          })
        }
      },
      _toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this._initScroll()
          this._initPic()
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPic()
      })
    },
    components: {
      star, split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-info
      padding: 18px
      .content
        position: relative
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1))
        .name
          margin-bottom: 8px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .star-wrapper
          font-size: 0
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .sell-count, .rating-count
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
          .rating-count
            margin-right: 12px
        .favorite
          position: absolute
          width: 50px
          top: 0
          right: -7px
          text-align: center
          .icon-favorite
            display: block
            margin-bottom: 4px
            line-height: 24px
            font-size: 24px
            color: #d4d6d9
            &.active
              color: rgb(240, 20, 20)
          .text
            line-height: 10px
            font-size: 10px
            color: rgb(77, 85, 93)
      .delivery-wrapper
        display: flex
        padding-top: 18px
        .item
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border-right: 0
          .title
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
            margin-bottom: 4px
          .text
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .data
              font-size: 24px
    .notice-wrapper
      padding: 0 18px
      .title
        margin-top: 18px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .bulletin
        padding: 8px 12px 16px 12px
        line-height: 24px
        font-size: 12px
        color: rgb(240, 20, 20)
        border-1px(rgba(7, 17, 27, .1))
      .support-item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 16px
          height: 16px
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .pics-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .infos-wrapper
      padding: 18px 18px 0 18px
      .title
        padding-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, .1))
      .item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, .1))
        line-height: 16px
        font-size: 12px
        color: rgb(7, 17, 27)
        &:last-child
          border-none()
</style>
