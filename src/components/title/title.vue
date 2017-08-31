<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{content}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      content: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .title
    display: flex
    .line
      flex: 1
      position: relative
      top: -7px
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    .text
      padding: 0 12px
      font-size: 14px
      font-weight: 700
</style>
