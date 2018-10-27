<template>
  <div class="page-container">
    <h2>{{title}}</h2>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .page-container {
    margin: 0.5em;
    min-height: calc(100% - 16px);

    @media (max-width: 480px) {
      margin: 0;
    }

    h2 {
      margin: 0.25em;
    }
  }
</style>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

