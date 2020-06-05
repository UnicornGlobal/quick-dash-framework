<template>
  <card>
    <h4 v-if="title" class="title">{{title}}</h4>
    <div v-if="items.length" class="items">
      <div v-for="item in items" :key="item.key" class="item-box">
        <div class="key">{{ item.key }}</div>
        <div class="value">
          <key-value-card v-if="isArray(item.value)" :items="item.value"></key-value-card>
          <template v-else>
            {{item.value}}
          </template>
        </div>
      </div>
    </div>
    <div v-else>
    {{emptyText}}
    </div>
  </card>
</template>

<style lang="scss">
  .title {
    font-weight: bold;
  }

  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    .item-box {
      display: flex;
      flex-direction: column;

      @media (max-width: 480px) {
        flex: 1;
      }

      .key {
        color: colour("primary", "dark");
        font-weight: bolder;
        @media (max-width: 700px) AND (min-width: 481px)  {
          font-size: 3.0vw;
        }
        @media (max-width: 480px) {
          font-size: 4.4vw;
        }
      }

      .value {
        text-overflow: ellipsis;
        white-space: pre-line;
        @media (max-width: 700px) AND (min-width: 481px) {
          font-size: 3.0vw;
        }
        @media (max-width: 480px) {
          font-size: 4.4vw;
        }
        .card{
          margin: 0;
        }
      }
    }
  }
</style>

<script>
  import Card from '@/components/Cards/Card.vue'

  export default {
    components: {Card},
    props: {
      items: {
        type: Array,
        required: true
      },
      title: {
        type: String
      },
      emptyText: {
        type: String,
        default: 'No items'
      }
    },
    methods: {
      isArray(term) {
        return Array.isArray(term)
      }
    }
  }
</script>
