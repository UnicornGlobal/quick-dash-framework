<template>
  <div class="summary">
    <h2>Alert Widgets</h2>
    <div class="summary-section">
      <alert type="info" title="Info">
        This is what an info alert box looks like.
      </alert>
      <alert type="success" title="Success">
        This is what a successful alert box looks like.
      </alert>
      <alert type="danger" title="Fail">
        This is what a fail alert box looks like.
      </alert>
      <alert type="warning" title="Warning">
        This is what a warning alert box looks like.
      </alert>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .summary-section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5em;

    @media (max-width: 1023px) {
      flex-direction: column;
    }
  }

</style>

<script>
  import Alert from '@/components/Alert.vue'

  export default {
    name: 'summary-section',
    components: {
      Alert
    }
  }
</script>
