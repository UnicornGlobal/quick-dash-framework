<template>
  <label @click="checked = !checked">
    <input v-model="checked" type="checkbox" :name="name">
    <span class="checkbox" :class="[{'checked': checked}]"></span>
    {{label}}
  </label>
</template>

<script>
  export default {
    props: ['label', 'value', 'color', 'name', 'props'],
    data() {
      return {
        checked: this.value
      }
    },
    watch: {
      checked(checked) {
        this.$emit('input', checked)
      }
    }
  }
</script>

<style lang="scss" scoped>
  label {
    cursor: pointer;
  }

  input[type=checkbox] {
    display: none;
  }

  span.checkbox {
    display: inline-block;
    width: 17px;
    height: 17px;
    background-color: $primary;
    border: solid 1px $accent;
    &.checked {
      background-position: center;
      background-size: contain;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAXVBMVEUAAAApYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv/2zOY8AAAAHnRSTlMAAgcIDg8QHB4iIyYsLS5KUFJncHGMnquy1+jp+/2Kg20AAAAAYUlEQVQoU93NRw6AMAxE0aG30HsCvv8xcbKKRHwA+BtL8xYGflkzRxJ1RIeALXGTTFfhT8neu6sc1T7FJ9EYJix2G6DuNyE1FtcQAbnDIAGZEYlRi8Q/NV1VmBi3UqLv9gCRVwlMbEtv8QAAAABJRU5ErkJggg==);
      background-color: $white;
      border-color: $primary;
    }
  }
</style>

