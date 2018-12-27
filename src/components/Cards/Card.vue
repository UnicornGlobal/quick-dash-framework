<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    padding: 1em;
    background-color: #fff;
    border-radius: 0;
    overflow: hidden;
    color: $primary-text;
  }
</style>
