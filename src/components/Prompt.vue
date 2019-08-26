<template>
  <div class="wrapper">
    <a @click.prevent="show = true" href="" :class="linkClass" :style="linkStyle">
      {{linkText}}
    </a>
    <modal v-if="show" @close="cancel()">
      <h4 class="header" slot="header">
        {{title || 'Confirm Action'}}
      </h4>
      <div slot="body">
        <alert v-if="errors.has('global')" type="danger">
          {{errors.first('global')}}
        </alert>
        <p>
          <slot>
            {{message || 'Are you sure you want to do this?'}}
          </slot>
        </p>
      </div>
      <div slot="footer" class="text-right">
        <button @click.prevent="cancel()" :disabled="bSending" class="btn-blue cancel-button">Cancel</button>
        <button @click.prevent="ok()" :disabled="bSending" class="btn-pink ok-button">
          <loader fill="#ffffff" class="load" v-if="bSending"></loader>
          Ok
        </button>
      </div>
    </modal>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    display: inline-block
  }
  .text-right{
    display: flex;
    justify-content: flex-end;
  }
  button{
    margin-left: 4px;
  }

  h4.header{
    border-bottom: 1px solid $primary-dark;
  }

  .load {
    transform: translate(-8px, 2px);
  }

  .ok-button {
    display: flex;
    align-items: center;
  }
</style>

<script>
  import Modal from '@/components/Modal.vue'
  import Loader from '@/components/Loader.vue'

  export default {
    components: {
      Modal,
      Loader
    },
    props: ['method', 'url', 'link-text', 'link-class', 'data', 'title', 'message', 'link-style'],
    data() {
      return {
        show: false,
        bSending: false,
        requestMethod: (this.method || 'GET').toLowerCase()
      }
    },
    methods: {
      cancel() {
        this.show = false
        this.$emit('cancelled')
      },
      ok() {
        if (this.url) {
          this.doAction()
        } else {
          this.show = false
          this.$emit('confirmed')
        }
      },
      doAction() {
        let params = this.data || {}
        if (this.requestMethod === 'get') {
          params = {params}
        }

        // put/patch method spoofing
        if (this.requestMethod === 'patch' || this.requestMethod === 'put') {
          params._method = this.requestMethod
          this.requestMethod = 'post'
        }

        this.bSending = true
        return this.$http[this.requestMethod](this.url, params)
          .then((response) => {
            this.$emit('success', response.data)
            this.show = false
          })
          .catch((error) => {
            this.$emit('failed', error.response)
            this.$eventBus.$emit('toast', {
              type: 'error',
              message: error.message,
              title: 'Error'
            })
          })
          .finally(() => {
            this.bSending = false
          })
      }
    }
  }
</script>
