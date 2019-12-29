<template id="modal-template">
  <transition name="modal">
    <div class="modal-wrapper">
      <div class="modal-mask" @click.prevent="$emit('close')"></div>
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            Header
          </slot>
          <div @click="$emit('close')" class="close">X</div>
        </div>

        <div class="modal-body">
          <slot name="body">
            Body
          </slot>
        </div>
        <slot name="footer" class="modal-footer">
        </slot>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
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
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .modal-container {
    z-index: 9999;
    position: relative;
    max-width: 100%;
    width: 650px;
    padding: 0rem 1.5rem 1rem 1rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    @media(max-width: 480px) {
      width: 100%;
      max-height: 100vh;
    }
  }

  .modal-body {
    margin: 20px 0px 0px 8px;
    padding-bottom: 1rem;
    @media (max-width: 480px) {
      margin: 0;
    }
  }

  .modal-footer {
    padding: 1rem 0.6rem 0.5rem;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: opacity(0.5);
    transform: opacity(0.5);
  }

  .close {
    color: darkgrey;
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    background-size: cover;
    top: 1.1rem;
    right: 0.6rem;
  }
</style>
