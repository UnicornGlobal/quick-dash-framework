<template>
  <div class="menu-item" :class="{'active': isCurrent}">
    <template v-if="hasChildren && menu.children.length > 1">
      <a href="#"
         @click.prevent="open = !open"
         class="router-link toggle"
         :class="{'menu-item-with-children-opened': open,
          'menu-item-space': !open}"
      >
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
          :menu="child"
          :key="child.name"
          :base="fullPath"
        >
        </side-bar-menu-item>
      </div>
    </template>

    <template v-else-if="hasChildren">
      <side-bar-menu-item
        v-for="child in menu.children"
        :menu="child"
        :key="child.name"
        :base="fullPath"
      >
      </side-bar-menu-item>
    </template>

    <router-link v-else :to="{name: menu.name}" class="router-link menu-item-space" @click.native="closeSidebar">
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
        if (this.$store.getters['app/sidebar/open']) {
          this.$store.commit('app/sidebar/open', false)
        }
      },
      close() {
        this.open = false
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
    border-bottom: 1px solid $line;

    &.active {
      color: $black;
      background: $light-hover;
    }
    a.router-link {
      display: flex;
      text-decoration: none;
      color: $black;
      align-items: center;

      svg {
        height: 15px;
        width: 15px;
        fill: $primary;
        stroke: $primary;
        margin-right: 10px;
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

    .menu-item-with-children-opened {
      padding: 1.5rem 0 1.5rem calc(1rem - 4px);
    }

    .sub-menu > .menu-item, .menu-item-with-children-opened {
      border-left: 4px solid $blue-2;
    }

    .sub-menu > .menu-item > .router-link {
      padding: 1.5rem 0 1.5rem calc(1rem - 4px);
    }

    .sub-menu > .menu-item {
      border-bottom: none;
      &:hover {
        background: $light-hover;
        color: $black;
        svg {
          fill: $primary;
          stroke: $primary;
        }
      }
    }

    .sub-menu > .active {
      background: $light-hover;
    }

    .closed {
      transition: transform .70s;
      transform: rotate(-90deg)
    }

    .menu-item-space {
      padding: 1.5rem 0 1.5rem 1rem;
    }

    .open {
      transition: transform .70s;
      transform: rotate(0deg)
    }
  }
</style>
