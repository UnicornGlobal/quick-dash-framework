<template>
  <div class="form-group">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  div.form-group {
    width: 100%;
    padding: 0.5em 0;
    margin-bottom: 1rem;

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

    @media (max-width: 540px) {
      width: 100%;
    }
  }
</style>

<script>
  export default {
    name: 'FormGroup'
  }
</script>
