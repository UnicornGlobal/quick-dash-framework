<template>
  <div>
    <div v-if="loaded">
      <div id="app-component">
        <top-nav class="top-nav" :loaded="loaded" :user="user"></top-nav>
        <div class="main-content">
          <transition name="slide">
            <side-bar class="side-bar" v-show="showSideBar" :menus="menu" root-path="/"></side-bar>
          </transition>
          <transition name="fade">
            <div class="shadow" v-show="showSideBar" @click.prevent="closeSidebar"></div>
          </transition>
          <router-view class="content-area"></router-view>
        </div>
      </div>
    </div>
    <loader width="100px" height="100px" v-else></loader>
  </div>

</template>

<script>
  import SideBar from '@/components/SideBar/SideBar'
  import TopNav from '@/components/TopNav/TopNav'
  import Loader from '@/components/Loader.vue'

  export default {
    name: 'app',
    components: {
      SideBar,
      TopNav,
      Loader
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
      loaded() {
        return !this.$store.getters.loading
      },
      showSideBar() {
        return this.$store.getters.sideBarState
      },
      menu() {
        let routes = Object.assign([], this.$store.state.routes[0].children)
        return routes.filter(function filter(route) {
          if (route.children) {
            route.children = route.children.filter(filter)
          }
          return (route.meta && route.meta.main) || (route.children && route.children.length)
        })
      }
    },
    methods: {
      closeSidebar() {
        this.$store.commit('showSideBar', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app-component {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .main-content {
    position: fixed;
    display: flex;
    height: calc(100% - 53px);
    width: 100%;
    top: 65px;
  }

  .side-bar {
    height: calc(100% - 65px);
    width: 250px;
    background: $primary-light;
    border-right: 1px solid $divider;
    z-index: 2;
    overflow-y: auto;

    @media (max-width: 420px) {
      border-right: solid 2px $primary-dark;
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

  .slide-enter-active {
    transition: all .3s ease;
  }

  .slide-leave-active {
    transition: all .3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0
  }

  .top-nav {
    position: fixed;
    width: 100%;
  }

  .content-area {
    overflow-y: auto;
    flex: 1;
    margin: 0 auto 1em auto;
    overflow-x: hidden;
    @media(max-width: 400px) {
      margin: 0 auto 0 auto;
    }
  }

  .shadow {
    position: fixed;
    top: 65px;
    left: 0px;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
