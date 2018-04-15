<template>
  <div class="form-group">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  div.form-group {
    width: 50%;
    padding: 15px;
    &.divider {
      width: 100%;
      border-top: solid 1px $divider;
    }
    &.controls-box {
      display: flex;
      justify-content: flex-end;
    }
    &.full-width {
      width: 100%;
    }
    &.no-padding{
      padding: 0;
    }
  }
</style>

<script>
  export default {
    name: 'FormGroup'
  }
</script>
