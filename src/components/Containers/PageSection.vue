<template>
  <div class="page-section">
    <div class="section-details">
      <h2 v-if="title">{{title}}</h2>
      <h3 v-if="subtitle">{{subtitle}}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.section-details {
  flex: 1;
  @media (max-width: 555px) {
    align-items: center;
  }

  @media (max-width: 1024px) and (min-width: 556px) {
    align-items: center;
    margin: 0 0.5em;
  }

  h2 {
    @media (max-width: 1024px) {
      margin: 1.5rem 1rem 0.5rem;
    }
  }
}

.page-section {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgray;
  padding: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding-top: 0;
    padding-right: 0;
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
      required: false,
      default: ''
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
