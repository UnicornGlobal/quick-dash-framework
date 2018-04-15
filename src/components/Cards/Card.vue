<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .card {
    flex: 0 48%;
    flex-grow: 1;
    margin: 0.5em;
    padding: 1em;
    background-color: #fff;
    border: 2px solid $primary;
    border-radius: 0;
    overflow: hidden;
    color: $primary-text;
  }
</style>

<script>
  export default {
    name: 'card'
  }
</script>
