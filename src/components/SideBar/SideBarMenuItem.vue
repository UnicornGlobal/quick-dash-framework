<template>
  <div class="menu-item" :class="{'active': isCurrent}">
    <template v-if="hasChildren && menu.children.length > 1">
      <a href="#" @click.prevent="open = !open" class="router-link toggle" :class="`menu-toggle-${open ? 'open' : 'closed'}`">
        <span class="menu-item-with-children">
          <component v-if="menu.meta.icon" :is="menu.meta.icon"></component>
          <span class="false-icon-space" v-else></span>
          {{ menu.meta.label }}
        </span>
        <svg :class="open ? 'open' : 'closed'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="toggle-icon">
          <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/>
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
      <component v-if="menu.meta.icon && showIcons" :is="menu.meta.icon"></component>
      <span class="false-icon-space" v-else></span>
      <span class="menu-item-label">
        {{ menu.meta.label }}
      </span>
    </router-link>
    <span v-if="showHighlight && isCurrent" class="highlight"></span>

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
        return (`${this.base}/${this.menu.path}`).replace(/\/\//g, '/')
          .replace(/\/$/, '')
      },
      showIcons() {
        if (this.$store.getters['app/config'].sidebar.icons) {
          return true
        }

        return false
      },
      showHighlight() {
        if (this.$store.getters['app/config'].sidebar.highlight) {
          return true
        }

        return false
      }
    },
    data() {
      return {
        open: false
      }
    },
    methods: {
      closeSidebar() {
        if (this.$store.getters['app/sidebar/open']) {
          this.$store.commit('app/sidebar/open', false)
        }
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
  .menu-item-label {
    font-size: $sidebar_text_size;
    flex: 1;
  }
  .highlight {
    background: $accent;
    width: 4px;
    display: flex;
  }
  .menu-item {

    &.active {
      background: $light-hover;
      color: $secondary-text;
      display: flex;
    }
    a.router-link {
      flex: 1;
      padding: 1.35rem 0 1.35rem 1rem;
      display: flex;
      text-decoration: none;
      color: $primary-text;
      align-items: center;
      border-bottom: 1px solid $line;
      svg {
        height: $sidebar_icon_size;
        width: $sidebar_icon_size;
        fill: $sidebar_icon_colour;
        margin-right: $sidebar_icon_size;
        margin-left: 0.2rem;
      }
      &.router-link-exact-active {
        color: $sidebar_active_text_colour;
        svg {
          fill: $sidebar_active_icon_colour;
        }
        span {
          font-family: $sidebar_active_text_font;
        }
      }
      &:hover {
        background: $light-hover;
        color: $sidebar_active_text_colour;
        svg {
          fill: $sidebar_active_icon_colour;
        }
      }
      &.toggle .toggle-icon {
        margin-left: auto;
      }
    }

    .false-icon-space {
      height: 20px;
      margin-right: 48px;
    }

    .menu-item-with-children {
      display: flex;
      align-items: center;
      font-size: $sidebar_text_size;
    }

    .menu-toggle-open {
      background: $primary;
    }

    .sub-menu {
      background: $primary;
    }

    .sub-menu > .menu-item {
      &.active {
        background: $light-hover;
        color: $black;
      }
    }

    .closed {
      transition: transform .25s;
      transform: rotate(-90deg)
    }

    .open {
      transition: transform .35s;
      transform: rotate(0deg)
    }
  }
</style>
