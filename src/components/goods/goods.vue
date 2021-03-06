<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item menu-item-hook" :class="{'current':currentIndex===index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item  border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57px">
              </div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="desc" v-if="food.description">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月销售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopCart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"
              :selectFoods="selectFoods"></shopcart>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import food from '../food/food.vue'
  import api from '../../api/api.js'

  //  const ERR_OK = 0
  export default {
    props: {
      seller: {
        // 定义组件传递而来的参数类型
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        menuHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            if (this.menuScroll) {
              let menuList = this.$refs.menuWrapper.getElementsByClassName('menu-item-hook')
              let el = menuList[i]
              this.menuScroll.scrollToElement(el, 300)
            }
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      api.goods(this.seller.id).then(({data}) => {
        this.goods = data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }).catch((e) => {
        console.error(e)
      })
//      this.$http.get('/api/goods').then(response => {
//        // success callback
//        response = response.body
//        if (response.errno === ERR_OK) {
//          this.goods = response.data
//          this.$nextTick(() => {
//            this._initScroll()
//            this._calculateHeight()
//          })
//        }
//      }, response => {
//        // error callback
//      })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true})
        this.foodsScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        let menuList = this.$refs.menuWrapper.getElementsByClassName('menu-item-hook')
        height = 0
        this.menuHeight.push(height)
        for (let i = 0; i < menuList.length; i++) {
          let item = menuList[i]
          height += item.clientHeight
          this.menuHeight.push(height)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _drop (target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target)
        })
      },
      addFood (target) {
        this._drop(target)
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        // 调用food组件中show方法
        this.$refs.food.show()
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56x
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          font-weight: 200
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
