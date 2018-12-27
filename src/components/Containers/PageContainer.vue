<template>
  <div class="page-container">
    <h1>{{title}}</h1>
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .page-container {
    background-color: $light-bg;
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
