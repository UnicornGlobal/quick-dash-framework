<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    padding: 0.7rem 1.2rem 1.5rem;
    background-color: #fff;
    border-radius: 0;
    overflow: hidden;
    color: colour(primary, text)
  }
</style>
