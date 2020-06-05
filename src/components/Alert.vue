<template>
  <div class="alert" :class="type">
    <div v-if="dismissible" @click="$emit('close')" class="close"></div>
    <div class="title text-uppercase">
      <cross v-if="type === 'danger'" class="danger"></cross>
      <info v-else-if="type === 'info'" class="info"></info>
      <warning v-else-if="type === 'warning'" class="warning"></warning>
      <check v-else-if="type === 'success'" class="success"></check>
      {{getTitle()}}
    </div>
    <div class="alert-message">
      <slot></slot>
    </div>
  </div>
</template>

<script type="application/javascript">
  import Cross from '@/icons/cross.svg'
  import Warning from '@/icons/warning.svg'
  import Info from '@/icons/info.svg'
  import Check from '@/icons/check.svg'

  export default {
    components: {Cross, Warning, Info, Check},
    props: {
      timeOut: {
        type: Number,
        required: false
      },
      title: {
        type: String,
        required: false
      },
      type: {
        type: String,
        required: false,
        default: 'success'
      },
      dismissible: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (this.timeOut) {
        setTimeout(() => {
          this.$emit('close')
        }, this.timeOut)
      }
    },
    methods: {
      getTitle() {
        if (this.title) {
          return this.title
        }

        const titles = {
          danger: 'Attention!',
          warning: 'Warning',
          info: 'Notification',
          success: 'Success!'
        }

        return titles[this.type]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alert {
    border: solid 2px;
    padding: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
    .close {
      cursor: pointer;
      position: absolute;
      width: 20px;
      height: 20px;
      background-size: cover;
      top: 8px;
      right: 8px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAbFBMVEUAAACdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ3Kqxw3AAAAI3RSTlMADQ4QERITFBUWNWZrb3Bxc3V3eHl7f4WGiImX1ebo6evt8bJJb24AAAHOSURBVGjevdjJUkIxEEbhKM4jKsRZgbz/O4oiMtxO0sMp77IX/1eVxV2clP71e7xF5/K9ZJRCKrmUobI0SCV/z+0rT6WQSl7NPUgGpeT13LbyXAqp5M3cRDIIJW/PrZUdI67k3bmJZESVvD83XR6npZBKHs5dpXQyH55vSOPjMLFKzSCVusEpLYNS2gaj9AxC6RtxRWNEFZ0RU7RGRNEbfsVieBWb4VOshkexG3bFY1gVn2FTvIZF8Ruycg0bWiVm6JSooVHiRl8hjJ7CGG2FMloKZ9QV0qgprCErb7AhK7ShUsKGQgGMroIYHQUymgpmNBTQqCqoUVFgI6VXAXmBjSw+1/gfDFapGaRSNzilZVBK22CUnkEofSOuaIyoIhjvF3NWkYwD8T/mV2QjoUrNIJW6wSktg1LaBqP0DELpG3FFY0QVnRFTtEZE0Rt+xWJ4FZvhU6yGR7EbdsVjWBWfYVO8hkWRjEjrG8OGVokZOiVqaJS40VcIo6cwRluhjJbCGXXlbniGW99lSucL0JCU2VEaKnDr+zH2Fbj1/RopnS1AY1eZjf7OGwVufVvGRoFb346xVuDWt2esFLj1fY4G59MF3PoEY6mwHe54y/gCPCLAnqZ3I+0AAAAASUVORK5CYII=);
    }

    &.danger {
      background: colour(error, light);

      .title {
        color: colour(error);
      }
    }
    &.warning {
      background: colour(warning, light);

      .title {
        color: colour(warning);
      }
    }
    &.info {
      .title {
        color: colour(primary, text);
      }
    }

    &.success {
      background: colour(success, light);

      .title {
        color: colour(success);
      }
    }

    svg {
      width: 16px;
      height: 16px;
      &.danger path {
        fill: colour(error);
      }
      &.warning path {
        fill: colour(warning);
      }
      &.info path {
        fill: colour(primary);
      }
      &.success path {
        fill: colour(success);
      }
    }
  }
</style>
