<template>
  <label @click.prevent="clicked">
    <input v-model="checked" type="checkbox" :name="name">
    <span class="checkbox" :class="[{'checked': checked}]"></span>
    <span class="label">{{label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: ['label', 'value', 'color', 'name', 'props'],
    data() {
      return {
        checked: this.value || false
      }
    },
    methods: {
      clicked() {
        this.checked = !this.checked
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
    color: $black;
    display: flex;
    align-items: center;
  }

  .label {
    margin-left: 0.5em;
    font-family: 'Montserrat-Regular', sans-serif;
    font-size: 0.9rem;
  }

  input[type=checkbox] {
    display: none;
  }

  span.checkbox {
    display: inline-block;
    width: 17px;
    height: 17px;
    background-color: $white;
    border: solid 1px $grey-1;
    &.checked {
      background-position: center;
      background-size: contain;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAXVBMVEUAAAApYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv8pYv/2zOY8AAAAHnRSTlMAAgcIDg8QHB4iIyYsLS5KUFJncHGMnquy1+jp+/2Kg20AAAAAYUlEQVQoU93NRw6AMAxE0aG30HsCvv8xcbKKRHwA+BtL8xYGflkzRxJ1RIeALXGTTFfhT8neu6sc1T7FJ9EYJix2G6DuNyE1FtcQAbnDIAGZEYlRi8Q/NV1VmBi3UqLv9gCRVwlMbEtv8QAAAABJRU5ErkJggg==);
      background-color: $white;
      border-color: $primary;
    }
  }
</style>

