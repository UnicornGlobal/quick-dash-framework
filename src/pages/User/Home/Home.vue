<template>
  <div class="home-page" v-if="loaded">
    <verify-account-card
      v-if="userNotVerified"
      :user="user">
    </verify-account-card>
    <page-container title="Welcome to Quick Dash!">
      <page-section title="A framework for bootstrapping admin dashboards." class="intro">
        <p>Quick Dash is an opinionated Vue dashboard framework designed to get new dashboard applications up and running as quickly as possible.</p>
        <p>It is convention driven, and has been designed to work with Strong Lumen.</p>
      </page-section>
      <page-section title="Features" class="intro">
        <ul>
          <li>Vue</li>
          <li>Router</li>
          <li>Store (VueX)</li>
          <li>Authentication (JWT)</li>
          <li>HTTP Communications (Axios)</li>
          <li>Themeable</li>
          <li>SVG Icons</li>
          <li>i18n Support</li>
          <li>User and Role Management</li>
          <li>Environment Variables</li>
          <li>Essential Components</li>
          <li>Unit Testing</li>
          <li>End to End Testing (Cypress)</li>
          <li>CI Ready (Travis)</li>
        </ul>
      </page-section>
      <page-section title="" class="intro">
        <h3>Core Concepts</h3>
        <p>There are 2 parts to Quick Dash, the base framework, called `quick-dash-framework` which contains all the core functionality. Do not start new projects based on this code.</p>
        <p>The other part is `quick-dash`, the general starter kit. This is the project that you should use to get going.</p>
        <p>The starter kit project leverages webpack and node modules to load the base framework files.</p>
        <h4>Local vs Base</h4>
        <p>Quick Dash uses the concept of 'local' and 'base' references. To reference your local `src` directory you use the `~` alias.</p>
        <blockquote>import custom from '~/components/custom'</blockquote>
        <p>To access base functionality or components you use the `@` alias.</p>
        <blockquote>import alert from '@/components/alert'</blockquote>
        <hr />
        <h3>Getting Started</h3>
        <p>Clone / Fork / Copy the `quick-dash` repository.</p>
        <p>Install dependencies</p>
        <blockquote>npm install</blockquote>
        <p>Configure secrets by making a copy of the file in the root `config` directory. Edit this file and set the standard variables (apiUrl) and any other variables you may need. You can access the variables you set here via `process.env`, e.g. `process.env.apiUrl`</p>
        <blockquote>cd config</blockquote>
        <blockquote>cp secrets.env.js.example secrets.env.js</blockquote>
        <p>Boot your application.</p>
        <blockquote>npm run dev</blockquote>
        <p>See the included `travis.yml` file for a step-by-step guide to getting `quick-dash` up and running with a new `strong-lumen` project.
        <hr />
        <h3>Configuration</h3>
        <p>Config files are placed in `src/config`.</p>
        <p>There is an example file called `custom.js`.</p>
        <p>All files get loaded by convention into VueX. You can access these values on the `this.$store.getters['app/config']` object.</p>
        <p>There are configuration files for core functionality in the `quick-dash-framework` project. Adding configuration files to applications based on `quick-dash` will override the base configurations.</p>
        <p>This is useful for customising the base functionality. For example you can copy the base `src/config/sidebar.js` file to your local `src/config` folder and adjust your preferences for the sidebar, controlling layouts and features.</p>
        <p>Reserved filename: `index.js`.</p>
        <hr />
        <h3>Custom Components</h3>
        <p>Your custom components are placed in the `src/components` folder, and are accessed using the `~/components` alias.</p>
        <p>There is an example component included in the starter kit.</p>
        <hr />
        <h3>Custom Routes</h3>
        <p>There is an example custom route file included in the starter kit in the `src/router` folder that loaded the example custom component. Use this file as a starting point for new routes. All routes get loaded in as new root level menu items.</p>
        <p>Reserved filenames: `admin.js`, `auth.js`, `base.js`, `index.js`, `user.js`.</p>
        <hr />
        <h3>Custom Stores</h3>
        <p>These is an example custom store file included in the `src/store` folder. Any files placed in this folder will be automatically loaded into VueX as modules, and will be available on `this.$store` at runtime.</p>
        <p>Please note that convention is to use `namespaced: true` and to access the store via getters. The included example store can be accessed using `this.$store.getters['custom']` with the example object being available at `this.$store.getters['custom/customObject']`. To commit to this example you would use `this.$store.commit('custom/setCustomObject', obj)`.
        <p>Reserved filenames: `admin.js`, `app.js`, `index.js`.</p>
        <hr />
        <h3>Icons</h3>
        <p>You can place SVG icons in your `src/icons` folder. Any SVG files placed in this directory will be autoloaded and will be available after importing `@/icons`</p>
        <p>Import the icons package and all of the core and custom icons will be available to you.</p>
        <blockquote>import icons from '@/icons'</blockquote>
        <p>Once imported you will be able to access your custom icons. The filename is used as the key, so do not use special characters in your filenames. If you added an icon called `custom.svg` to your folder you will be able to access this icon on the `icons.custom` property.</p>
        <h4>Overriding Default Icons</h4>
        <p>You can override the core icons by placing an icon with the same name in your `src/icons` directory.</p>
        <p>If you add a file called `home.svg` to your local folder, the included `home.svg` icon in the base package will be replaced with your new custom version.</p>
        <hr />
        <h3>Theme</h3>
        <p>You can adjust the theme by changing the values in the included `src/assets/sass/_variables.scss` file.</p>
        <hr />
        <h3>Libraries</h3>
        <p>You can place general libraries in your `src/lib` folder. These will get automatically loaded when your application boots.</p>
        <p>Reserved filename: `index.js`.</p>
      </page-section>
    </page-container>
  </div>
</template>

<style lang="scss">
  .home-page.content-area {
    background-color: $light-bg;
    padding-left: 2em;
  }

  .intro {
    max-width: 75%;
  }
</style>

<script>
  import VerifyAccountCard from '@/components/Cards/VerifyAccountCard.vue'
  import PageContainer from '@/components/Containers/PageContainer.vue'
  import PageSection from '@/components/Containers/PageSection.vue'

  export default {
    name: 'home',
    components: {
      VerifyAccountCard,
      PageContainer,
      PageSection
    },
    mounted() {
      this.loaded = true
    },
    data() {
      return {
        loaded: false
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/user']
      },
      userNotVerified() {
        if (this.$store.getters['auth/user']) {
          return !this.$store.getters['auth/user'].confirmed
        }

        return false
      }
    }
  }
</script>

