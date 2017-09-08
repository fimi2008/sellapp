# sellapp

> xx sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

+ vue 架手架使用
  
      vue list   查询可用脚手架模板
      vue init webpack <工程名>    使用webpack脚手架
    

+ 下面三个样式搭配使用，只显示一行，多出部分显示。。。

      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      
+ 实现滤镜效果
    
      filter: blur(10px)

+ 背景毛玻璃效果（仅支持ios，安装不支持）   
       
       backdrop-filter: blur(10px)
       
+ "better-scroll": "^0.1.7" 插件使用
  
       使用版本："0.1.15" v-el 更改为 ref
    
       几个重要接口
       this.foodsScroll.on('scroll', (pos) => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      
       this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
                        
        this.foodsScroll.scrollToElement(el, 300)
        
        // 设置图片展示区域可以横向滚动
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
        
+ export 一个属性解释（个人理解）
    
      export default{
          props:{
              // 定义传递而来的参数
          },
          data(){
              // 定义该组件下的全局参数
          },
          computed:{
              // 定义计算参数(注意：所以的计算属性的值都要return)
          },
          created(){
              // 类似于init方法
          },
          methods(){
              // 定义函数
          },
          filters:{
              // 定义过滤器
          },
          mounted(){
              // 生命周期钩子，该钩子在服务器端渲染期间不被调用
          },
          watch：{
              // 类型：{ [key: string]: string | Function | Object }
              // 一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
          }
          components:{
             // 定义该组件所引用的其他组件
          }
        }

+ vue 中阻止事件冒泡修饰符
  
      @click.stop.prevent
      
+ vue 中函数命名准则
  + 内部组件使用的函数，函数名以“_”开头
  + 外部组件调用的函数，函数名不以“_”开头
  + 可仿照本例中goods组件
  
+ vue 中子组件调用父组件的方法
    
      子组件通过
      this.$emit('add', target)
      调用父组件中
      <food  @add="addFood" :food="selectedFood" ref="food"></food>
      @add 对应的方法 addFood
      
+ vue 中过滤器的使用

      如何调用：
       {{rating.rateTime | formatDate}}
      组件如何定义过滤器：
       filters: {
          formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
          }
       }
      如何引用common中的js
        import {formatDate} from '../../common/js/date.js'
        因为js中formatDate是如下定义的，所以import的时候需要加‘{}’
        export function formatDate (date, fmt){/.../}
        
+ 如何兼容小屏幕样式(@media 判断屏幕宽度)
  
      .overview-right
          flex: 1
          padding: 6px 0 6px 24px
          @media only screen and (max-width: 320px)
            padding-left: 6px
      
       
