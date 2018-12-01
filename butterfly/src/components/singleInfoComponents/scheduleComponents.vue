<template>
    <div class="schdule-content">
      <p class="schdule-title">艺人档期</p>
      <full-calendar :events="fcEvents"/>
    </div>
</template>

<script>
  var demoEvents = [
    {
      title : '这几天我有演出',
      start : '2018-05-22',
      end : '2018-05-23',
      lang:'zh',
      cssClass  : 'selected',
    }
  ]
  import fullCalendar from 'vue-fullcalendar'
  export default {
    name:"schdule",
    components:{'full-calendar':fullCalendar},
    data () {
      return {
        fcEvents : demoEvents
      }
    },

  }
</script>

<style scoped lang="less">
  .schdule-content{
    width: 1200px;
    margin: 0 auto;
    .schdule-title{
      font-weight: bold;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
      height: 40px;
      line-height: 40px;
    }

  }

</style>
<style lang="less">
  .selected{
    background-color: #ec6538;
  }

  .comp-full-calendar {
      min-width: 1200px;
      .full-calendar-body{
          .weeks{
            height: 70px;
            line-height: 70px;
            text-align: center;
          }
        .dates{
          .week-row{

          }
          .events-week{

          }
        }
      }
  }
  .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item{
    height: 72px;
  }

</style>
