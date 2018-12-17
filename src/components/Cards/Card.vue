<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    flex: 0 48%;
    flex-grow: 1;
    margin: 0.5em;
    padding: 1.2em;
    background-color: #fff;
    border-radius: 0;
    overflow: hidden;
    color: $primary-text;
  }
</style>
