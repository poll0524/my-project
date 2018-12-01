<template>
    <div class="agreement-container">
      <AgreementNav/>
      <router-view/>
    </div>
</template>

<script>
  import AgreementNav from './agreementsNav'
    export default {
        name: "agreement",
        components:{
          AgreementNav
        }
    }
</script>

<style scoped lang="less">
  .agreement-container{
      padding-top: 100px;
      width: 1200px;
      margin: 0 auto;
      min-height: calc(100vh - 225px);
      display: flex;
  }
</style>
