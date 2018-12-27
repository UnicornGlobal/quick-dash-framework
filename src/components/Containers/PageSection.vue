<template>
  <div class="page-section">
    <div class="section-details">
      <h2>{{title}}</h2>
      <h3 v-if="subtitle">{{subtitle}}</h3>
      <slot name="additional-info"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
  .section-details {
    flex: 1;
    @media (max-width: 555px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @media (max-width: 1024px) and (min-width: 556px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 0.5em;
    }
  }

  .page-section {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid lightgray;

    @media (max-width: 1024px) {
      flex-direction: column;
    }

    .section-content {

      @media (min-width: 1025px) {
        max-width: 80%;
      }
    }
  }

  .page-section:last-child {
    border-bottom: none;
  }
</style>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: false
      }
    }
  }
</script>
