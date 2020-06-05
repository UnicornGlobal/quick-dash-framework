<template>
  <div class="progress-wrapper">
    <div :style="{width: value + '%'}" class="meter">
      <span></span>
    </div>
  </div>
</template>

<style lang="scss">

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px;
    }
  }

  .progress-wrapper {
    height: 10px;
    position: relative;
    background: colour(primary, dark)
    border-radius: 25px;
    overflow: hidden;

    div.meter {
      border-radius: 25px;
      display: block;
      height: 100%;
      background-color: colour(primary, light)
      position: relative;
      overflow: hidden;

      & > span{
        display: none;
      }

      &:after, & > span{
        content: "";
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        background-image: linear-gradient(
            -45deg,
            rgba(255, 255, 255, .2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, .2) 50%,
            rgba(255, 255, 255, .2) 75%,
            transparent 50%,
            transparent
        );
        z-index: 1;
        background-size: 50px 50px;
        animation: move 2s linear infinite;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        overflow: hidden;
      }
    }
  }
</style>

<script>
  export default {
    props: {
      value: {
        default: 0
      }
    }
  }
</script>
