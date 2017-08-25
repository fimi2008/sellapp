# CSS规范
  + 书写顺序
      + 位置属性(position, top, right, z-index, display, float等)
      + 大小(width, height, padding, margin)
      + 文字系列(font, line-height, letter-spacing, color- text-align等)
      + 背景(background, border等)
      + 其他(animation, transition等)

  + 书写规范
    + 使用CSS缩写属性
    + 去掉小数点前的“0”
    + 简写命名
    + 16进制颜色代码缩写

  + 连字符CSS选择器命名规范
    + 长名称或词组可以使用中横线来为选择器命名。
    + 不建议使用“_”下划线来命名CSS选择器


  stylus文件：
  + mixin.styl 定义了border-1px($color)css函数
  + index.styl 整合所有的styl资源，在main.js中统一引入，import './common/stylus/index.styl'
  + base.styl 针对设备像素比进行缩放操作
  + icon.styl icon图片样式定义
  
