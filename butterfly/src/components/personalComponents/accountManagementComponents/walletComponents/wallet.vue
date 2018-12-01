<template>
  <div>
    <TitleItem titleName="我的钱包"></TitleItem>
    <router-view></router-view>
  </div>
</template>

<script>
  import TitleItem from '../../titleNameComponents'
  import RemarkItem from '../../remarkComponents'


  export default {
    name:"wallet",
    components:{"TitleItem":TitleItem,RemarkItem:RemarkItem}

  }
</script>

<style scoped lang="less">

</style>
