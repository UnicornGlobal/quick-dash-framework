<template>
  <div class="top-navigation">
    <div class="header" :style="headerStyle">
      <div class="menu-toggle">
        <div @click.prevent="toggleSideBar()">
          <hamburger class="hamburger"></hamburger>
        </div>
      </div>
      <div class="additional-info">
        <slot></slot>
      </div>
      <div class="page-title">{{pageTitle}}</div>
      <user-menu v-if="user" :user="user"></user-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.additional-info {
  flex: 1;
}

.top-navigation {
  height: 60px;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: $header_background;
  @media (max-width: 1025px) {
    display: block;
  }
}

.menu-toggle {
  width: 65px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: colour("white");

  @media (min-width: 1025px) {
    display: none;
  }
}

.menu-toggle {
  svg {
    width: 30px;
    height: 30px;
    fill: $sidebar_hamburger_colour;
  }
}

.header {
  width: 100%;
  padding: 0 1em;
  display: flex;
  align-items: center;
  background-color: $header_background;
  height: 61px;
  @media (max-width: 1025px) {
    padding-left: 1em;
    width: 100%;
  }
}

.page-title {
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: colour("white");
  font-size: 22px;
  text-decoration: none;

  svg {
    height: 40px;
    width: 45px;
    fill: colour("white");
  }
}

.mobile-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: colour("white");
  font-size: 22px;
  text-decoration: none;

  svg {
    height: 40px;
    width: 45px;
    fill: colour("white");
  }

  @media (min-width: 1025px) {
    display: none;
  }
}
</style>

<script>
import UserMenu from '@/components/TopNav/UserMenu'
import icons from '@/icons'

export default {
  name: 'top-nav',
  components: {
    UserMenu,
    hamburger: icons.hamburger
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    loaded: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    this.headerStyle = this.checkHeaderStyle()
    window.addEventListener('resize', () => {
      this.headerStyle = this.checkHeaderStyle()
    })
  },
  data() {
    return {
      headerStyle: null
    }
  },
  computed: {
    homeRoute() {
      return this.$store.getters['app/config'].header.homeRoute || '/'
    },
    pageTitle() {
      return ''
    },
    showLogo() {
      if (this.$store.getters['app/config'].header.logo) {
        return true
      }

      return false
    },
    showMobileLogo() {
      if (this.$store.getters['app/config'].header.mobileLogo) {
        return true
      }

      return false
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.commit(
        'app/sidebar/open',
        !this.$store.getters['app/sidebar/open']
      )
    },

    checkHeaderStyle() {
      if (this.$store.getters['app/config'].sidebar.position === 'right') {
        return 'flex-direction: row-reverse; justify-content: space-between;'
      }

      if (window.innerWidth < 1025) {
        return 'justify-content: flex-start'
      }

      return 'justify-content: space-between'
    }
  }
}
</script>
