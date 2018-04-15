<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div @click="$emit('close')" class="close"></div>
          <div class="modal-header">
            <slot name="header">
              Header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              Body
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="application/javascript">
  export default {
    name: 'Modal'
  }
</script>

<style lang="scss" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .modal-wrapper{
    padding: 10px;
  }

  .modal-container {
    position: relative;
    width: 650px;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    @media(max-width: 480px) {
      width: 100%;
      max-height: 100vh;
    }
  }

  .modal-body {
    margin: 20px 0;
    @media (max-width: 480px) {
      margin: 0;
    }
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    background-size: cover;
    top: 8px;
    right: 8px;
    background-image: url(data:image/png;base64,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);
  }
</style>
