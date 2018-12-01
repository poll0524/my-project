<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span class="closeModal" @click="closeModal">×</span>
          <div class="modal-header">
            <slot name="header">

            </slot>
          </div>
          <div class="modal-body" ref="modalBody">
            <slot name="body">

            </slot>
            <slot></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer" >

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    import $ from 'jquery';
    export default {
      name: "publicModal",
      props:{
        'showModal':{
          type:Boolean
        },
        'changheHintBoxShow':{
          type:Function
        },
        'hintInfo':{
          type:Object
        }
      },
      data(){
        return{
          // showModal:false
        }
      },
      methods:{
        closeModal(){
          this.$emit('changheHintBoxShow')
        }
      },
    }
</script>

<style lang="less">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    max-width: 500px;
    margin: 0px auto;
    position: relative;
    padding: 40px 30px;
    background-color: #333;
    border-radius: 2px;
    color:#fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    .headerIcon{
      display: inline-block;
      width: 50px;
      height: 50px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .headerText{
      display: inline-block;
      height: 50px;
      vertical-align: bottom;
      line-height: 65px;
      font-size: 18px;
    }
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-footer{
    .modalBtn {
      width: 150px;
      height: 40px;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      letter-spacing: 4px;
      cursor: pointer;
      background-color: #ec6538;
      border: none;
      &:focus{
        outline: none;
      }
      &:active{
        background-color: #cd562e;
      }
    }
  }


  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }
  .closeModal{
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
    background-color: #ec6538;
    transition: 0.3s;
    &:hover{
      background-color: #cd562e;
    }
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
