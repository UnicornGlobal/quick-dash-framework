<template>
  <div class="menu-item" :class="{'active': isCurrent}">
    <template v-if="hasChildren && menu.children.length > 1">
      <a href="#" @click.prevent="open = !open" class="router-link toggle">
        <span class="menu-item-with-children">
          <component v-if="menu.meta.icon" :is="menu.meta.icon"></component>
          <span class="false-icon-space" v-else></span>
          {{ menu.meta.label }}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="toggle-icon">
          <path v-if="open"
                d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/>
          <path v-else
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
        </svg>
      </a>
      <div v-show="open" class="sub-menu">
        <side-bar-menu-item
          v-for="child in menu.children"
          :menu="child" :key="child.name"
          :base="fullPath"
        >
        </side-bar-menu-item>
      </div>
    </template>

    <template v-else-if="hasChildren">
      <side-bar-menu-item
        v-for="child in menu.children"
        :menu="child" :key="child.name"
        :base="fullPath"
      >
      </side-bar-menu-item>
    </template>

    <router-link v-else :to="{name: menu.name}" class="router-link" @click.native="closeSidebar">
      <component v-if="menu.meta.icon" :is="menu.meta.icon"></component>
      <span class="false-icon-space" v-else></span>
      <span>
        {{ menu.meta.label }}
      </span>
    </router-link>

  </div>
</template>

<script>
  export default {
    name: 'side-bar-menu-item',
    props: [
      'menu',
      'base'
    ],
    computed: {
      hasChildren() {
        if (this.menu.children && this.menu.children.length) {
          return true
        }

        return false
      },
      isCurrent() {
        return this.$route.name === this.menu.name
      },
      fullPath() {
        return (this.base + '/' + this.menu.path).replace(/\/\//g, '/')
          .replace(/\/$/, '')
      }
    },
    data() {
      return {
        open: false
      }
    },
    methods: {
      closeSidebar() {
        this.$store.commit('showSideBar', false)
      }
    },
    mounted() {
      this.open = this.$route.matched.some(({path}) => {
        return path === this.fullPath
      })
    }
  }
</script>

<style lang="scss">
  .menu-item {
    &.active {
      background: $light-hover;
      color: $black;
    }
    a.router-link {
      padding: 1.5rem 0 1.5rem 1rem;
      display: flex;
      text-decoration: none;
      color: $black;
      align-items: center;
      border-bottom: 1px solid $line;
      svg {
        height: 15px;
        width: 15px;
        margin-right: 0.5em;
        fill: $primary;
        stroke: $primary;
        margin-right: 10px;
      }
      &.router-link-exact-active {
        color: $black;
        svg {
          fill: $primary;
          stroke: $primary;
        }
      }
      &:hover {
        background: $light-hover;
        color: $black;
        svg {
          fill: $primary;
          stroke: $primary;
        }
      }
      &.toggle .toggle-icon {
        margin-left: auto;
      }
    }

    .false-icon-space {
      height: 20px;
      margin-right: 28px;
    }

    .menu-item-with-children {
      display: flex;
      align-items: center;
    }

    .sub-menu > .menu-item {
      background: $white;
      &.active {
        background: $primary;
        color: $icons;
      }
    }
  }
</style>
