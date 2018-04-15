<template>
  <div class="small-card">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .small-card {
    flex: 0 25%;
    flex-grow: 1;
    margin: 0.5em;
    padding: 1em;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 0;
  }
</style>

<script>
  export default {
    name: 'small-card'
  }
</script>
