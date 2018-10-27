<template>
  <div class="spinner">
    <svg
      class="lds-curve-bars"
      :width="width"
      :height="height"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style="margin: 0 auto; background: none;"
    >
      <g transform="translate(50,50)">
        <circle
          cx="0"
          cy="0"
          r="12.5"
          fill="none"
          :stroke="fill"
          stroke-width="4"
          stroke-dasharray="39.269908169872416 39.269908169872416"
          transform="rotate(227.921)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 0;360 0 0"
            times="0;1"
            dur="1.4s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            begin="0"
            repeatCount="indefinite"
          >
          </animateTransform>
        </circle>
      </g>
    </svg>
    <span class="text"><slot></slot></span>
  </div>
</template>

<style lang="scss" scoped>
  .spinner {
    vertical-align: middle;
    display: inline-block;
  }
</style>

<script>
  export default {
    props: {
      height: {
        type: String,
        default: '20px'
      },
      width: {
        type: String,
        default: '20px'
      },
      fill: {
        type: String,
        default: '#9C27B0'
      }
    }
  }
</script>
