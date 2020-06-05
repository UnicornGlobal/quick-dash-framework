<template>
  <card>
    <div class="call-to-action-card">
      <h3 class="title">{{ title }}</h3>
      <p>
        <slot></slot>
      </p>
      <div v-if="target">
        <router-link class="call-to-action-link" :to="target">{{ linkText }}</router-link>
      </div>
    </div>
  </card>
</template>

<style lang="scss" scoped>
  .call-to-action-card {
    display: flex;
    flex-direction: column;
    height: 100%;

    .title {
      font-size: 16px;
      margin: 0;
      color: colour(primary, dark)
      font-weight: bold;
    }

    p {
      height: 100%;
      font-size: 14px;
      flex: 1;
    }

    .call-to-action-link {
      border: colour(primary);
      display: inline-block;
      font-weight: 400;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      border: 1px solid colour(primary);
      padding: .375rem .75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 3px;
      transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
      color: colour(primary);
      background-color: transparent;
      background-image: none;
      text-decoration: none;

      &:hover {
        background-color: colour(primary);
        color: colour(white);
      }
    }
  }
</style>

<script>
  import Card from '@/components/Cards/Card.vue'

  export default {
    name: 'call-to-action-card',
    components: {
      Card
    },
    props: {
      title: {
        type: String,
        required: true
      },
      target: {
        required: false
      },
      linkText: {
        type: String,
        required: false
      }
    }
  }
</script>
