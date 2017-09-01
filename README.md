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
