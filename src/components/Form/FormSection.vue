<template>
  <div class="form-section">
    <slot></slot>
  </div>
</template>
<div class="form-section">

</div>
<style lang="scss" scoped>
  div.form-section {
    display: flex;
    flex-direction: row;

    @media(max-width: 420px) {
      flex-direction: column;
      .form-group {
        width: 100%;
      }
    }
    .width-100 {
      width: 100% !important;
    }
  }
</style>
<script type="application/javascript">
  export default {
    name: 'FormSection'
  }
</script>
