<template>
  <div class="tip-container">
    <h5>{{ title }}</h5>
    <div class="tip-section">
      <call-to-action-card
        v-for="(tip, index) in tips"
        :key="index"
        :title="tip.title"
        :target="tip.target"
        :link-text="tip.linkText">
        {{ tip.content }}
      </call-to-action-card>
    </div>
    <div class="tip-section">
    </div>
  </div>
</template>

<style lang="scss">
  .tip-container {
    margin: 40px 0px;
    h5 {
      margin: 0.5em;
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 300
    }
  }
  .tip-section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
</style>

<script>
  import CallToActionCard from '@/components/Cards/CallToAction.vue'

  export default {
    name: 'tips-section',
    components: {CallToActionCard},
    props: {
      title: {
        type: String,
        required: true
      },
      tips: {
        type: Array,
        required: true
      }
    }
  }
</script>

