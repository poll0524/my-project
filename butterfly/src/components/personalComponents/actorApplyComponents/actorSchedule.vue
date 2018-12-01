<template>
    <div class="schedule-box">
      <div class="schedule-title-box"><span>艺人档期</span></div>
      <full-calendar
        :events="fcEvents"
        :lang="language"
        @dayClick="dayClick"
        @changeMonth = 'changeMonth'
      />
      <div></div>
    </div>
</template>

<script>
  import fullCalendar from 'vue-fullcalendar'

  import {formatTime} from '../../../assets/js/public'
    export default {
        name: "actorSchedule",
        components:{'full-calendar':fullCalendar},
        data () {
          return {
            language:'zh',
            fcEvents:[],
            timeStampArr:['2018-05-18','2018-05-20']
          }
        },
        methods:{
          dayClick (day,jsEvent) {
              let dayStamp = formatTime(Date.parse(day),'-').split(' ')[0];
              const oldClass = jsEvent.path[0].getAttribute("class");
              if(oldClass.indexOf('schedule-selected') == -1){
                // jsEvent.path[0].setAttribute('class',oldClass+' '+'schedule-selected');
                this.fcEvents.push({
                  start: dayStamp
                })

              }
              else {
                // jsEvent.path[0].setAttribute('class',oldClass.replace('schedule-selected',''))

              }

              this.roundSchedule(dayStamp);
          },
          changeMonth(start, end){
          },
          roundSchedule(dayStamp){

          },

        },
        mounted(){
          this.roundSchedule(null);
        }
    }
</script>

<style scoped lang="less">
  .schedule-box{
    .schedule-title-box{
      height: 30px;
      line-height: 30px;

      border-bottom: 1px solid #ccc;
      span{
        padding-left: 8px;
        letter-spacing: 2px;
        border-left: 3px solid #ec6538;
      }
    }
  }

</style>

<style lang="less">
  .selected{
    background-color: #ec6538;
  }
  .comp-full-calendar {
    min-width: 900px;
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
