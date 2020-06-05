<template>
  <div class="wrapper">
    <div id="app-component" v-if="loaded">
      <toaster></toaster>
      <transition :name="transitionStyle" v-if="enableSideBar">
        <side-bar class="side-bar" v-show="showSideBar" :menus="menu" :user="user"></side-bar>
      </transition>
      <transition name="fade" v-if="enableSideBar">
        <div class="shadow" v-show="showSideBar" @click.prevent="closeSidebar"></div>
      </transition>
      <div class="main-content" :style="layoutStyle">
        <router-view class="content-area-view"></router-view>
      </div>
    </div>
    <component :is="loaderComponent" width="100px" height="100px" v-else></component>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar'
import Loader from '@/components/Loader'
import Toaster from '@unicorns/toaster'

export default {
  name: 'app',
  components: {
    SideBar,
    Loader,
    Toaster
  },
  data() {
    return {
      loaderComponent: require('@/components/Loader').default
    }
  },
  created() {
    try {
      const customLoader = require('~/components/Loader').default
      if (customLoader) {
        this.loaderComponent = customLoader
      }
    } catch (e) {
      // No custom loader is present
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    loaded() {
      return !this.$store.getters['app/loading']
    },
    showSideBar() {
      return this.$store.getters['app/sidebar/open']
    },
    enableSideBar() {
      return (
        this.$store.getters['app/sidebar/enabled'] &&
        this.$store.getters['app/config'].sidebar.enabled
      )
    },
    layoutStyle() {
      if (this.$store.getters['app/config'].sidebar.position === 'right') {
        return 'flex-direction: column'
      }
    },
    transitionStyle() {
      if (this.$store.getters['app/config'].sidebar.position === 'right') {
        return 'slideright'
      }

      return 'slideleft'
    },
    menu() {
      const routes = Object.assign(
        [],
        this.$store.getters['app/routes'][0].children
      )
      return routes.filter(function filter(route) {
        if (route.children) {
          route.children = route.children.filter(filter)
        }
        return (
          (route.meta && route.meta.main) ||
          (route.children && route.children.length)
        )
      })
    }
  },
  methods: {
    closeSidebar() {
      if (this.$store.getters['app/sidebar/open']) {
        this.$store.commit('app/sidebar/open', false)
      }
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  height: 100%;
}

#app-component {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;

  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    @media (min-width: 1025px) {
      width: calc(100% - 300px);
    }
  }

  .side-bar {
    height: 100%;
    width: 300px;
    background: colour("white");
    z-index: 10;
    overflow: hidden;
    border-right: $sidebar_border;
    box-shadow: $sidebar_shadow;
    display: block;

    @media (max-width: 420px) {
      border-right: solid 2px colour("primary", "dark");
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (max-width: 1024px) and (min-width: 421px) {
      position: fixed;
    }

    @media (min-width: 1025px) {
      display: flex !important;
      flex-direction: column;
      height: 100%;
    }
  }
}

.content {
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: -1rem;
  height: 100%;
}

.content-area-view {
  overflow-y: hidden;
  flex: 1;
  overflow-x: hidden;
}

.slideright-enter-active {
  transition: all 0.3s ease;
}

.slideright-leave-active {
  transition: all 0.3s;
}

.slideright-enter,
.slideright-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slideleft-enter-active {
  transition: all 0.3s ease;
}

.slideleft-leave-active {
  transition: all 0.3s;
}

.slideleft-enter,
.slideleft-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

.shadow {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
