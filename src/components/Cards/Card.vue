<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    padding: spacing(loose);
    background-color: colour(white);
    border-radius: border-radius();
    overflow: hidden;
    color: colour(primary, text)
  }
</style>
