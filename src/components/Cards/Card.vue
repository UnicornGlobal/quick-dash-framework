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
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 0;
    overflow: hidden;
  }
</style>

<script>
  export default {
    name: 'card'
  }
</script>
