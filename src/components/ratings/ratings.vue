<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="time-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="_selectType" @toggle="_toggleContent" :ratings="ratings" :selectType="selectType"
                    :onlyContent="onlyContent"></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="ratings && ratings.length">
          <li v-show="_needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item border-1px">
            <div class="avatar">
              <img :src="rating.avatar" height="28" width="28">
            </div>
            <div class="rating-content">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <span class="time">{{rating.rateTime | formatDate}}</span>
              </div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span v-show="rating.deliveryTime" class="time">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                <span v-for="recommend in rating.recommend" class="recommend-item">{{recommend}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import BScroll from 'better-scroll'
  import { formatDate } from '../../common/js/date.js'

  const ERR_OK = 0
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    created () {
      this.$http.get('/api/ratings').then(response => {
        // success callback
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      }, response => {
        // error callback
      })
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {click: true})
        } else {
          this.scroll.refresh()
        }
      },
      _needShow (rateType, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        }
        return this.selectType === rateType
      },
      _selectType (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      _toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      star, split, ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, .1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            margin-right: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
            margin-right: 12px
          .score
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(255, 153, 0)
        .time-wrapper
          line-height: 18px
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            margin-right: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .time
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .rating-content
          flex: 1
          .user
            margin-bottom: 4px
            overflow: hidden
            .name
              float: left
              line-height: 12px
              font-size: 10px
              color: rgb(7, 17, 27)
            .time
              float: right
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .time
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              font-weight: 200
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down,.recommend-item
              vertical-align: top
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(183, 187, 191)
            .recommend-item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, .1)
              border-radius: 2px
              color: rgb(147, 153, 159)
              &:last-child
                margin-right: 0
      .no-rating
        padding: 16px 0
        font-size: 12px
        color: rgb(147, 153, 159)
</style>
