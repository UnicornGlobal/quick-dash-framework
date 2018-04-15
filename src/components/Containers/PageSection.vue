<template>
  <div class="page-section">
    <div class="section-details">
      <h3>{{title}}</h3>
      <h4 v-if="subtitle">{{subtitle}}</h4>
      <slot name="additional-info"></slot>
    </div>
    <div class="section-content">
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

    @media (min-width: 1025px) {
      max-width: 225px;
    }
  }

  .page-section {
    display: flex;
    flex-direction: row;
    padding: 1em 0.5em;
    border-bottom: 1px solid lightgray;

    @media (max-width: 1024px) {
      flex-direction: column;
    }

    .section-details {

      h3 {
        font-weight: 700;
        font-size: 1em;
        margin: 7px 0px;
      }
      h4 {
        font-size: 80%;
        font-weight: 400;
        margin: 7px 0px;
      }
    }

    .section-content {
      flex: 5;

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
    name: 'page-section',
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


