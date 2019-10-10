<template>
  <div class="spinner-block">
    <svg class="spinner" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 200 200" width="180" height="180">
      <g :fill="fill">
        <path d="M 13.5 70.8 L 18.9 57.7 L 26.2 45.8 L 35.2 35.2 L 45.8 26.2 L 57.7 18.9 L 70.8 13.5 L 85.0 10.1 L
        100.0 9.0 L 100.0 21.0 L 86.8 22.0 L 74.5 24.9 L 63.1 29.6 L 52.8 35.9 L 43.7 43.7 L 35.9 52.8 L 29.6 63.1
        L 24.9 74.5 L 22.0 86.8 L 21.0 100.0 L 22.0 113.1 L 24.9 125.4 L 29.6 136.8 L 35.9 147.1
        L 43.7 156.2 L 52.8 164.0 L 63.1 170.3 L 74.5 175.0 L 86.8 177.9 L 100.0 179.0 L 100.0 191.0 L 85.0 189.8
        L 70.8 186.4 L 57.7 181.0 L 45.8 173.7 L 35.2 164.7 L 26.2 154.1 L 18.9 142.2 L 13.5 129.1
        L 10.1 114.9 L 9.0 100.0 L 10.1 85.0 Z "></path>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
  @keyframes roll {
    0% {
      transform: rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: rotate(180deg);
      opacity: 0.5;
    }
    100% {
      transform: rotate(360deg);
      opacity: 1;
    }
  }

  .spinner-block {
    vertical-align: middle;
    display: inline-block;
    position: absolute;
    z-index: 1;
    opacity: 0.5;
  }

  .spinner {
    animation: roll 1s infinite linear;
  }
</style>

<script>
  export default {
    props: {
      fill: {
        type: String,
        default: '#000000'
      },
      strokeWidth: {
        type: String,
        default: '6px'
      }
    }
  }
</script>
