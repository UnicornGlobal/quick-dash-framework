# @unicorns/quick-dash-framework

*v3.x* is *NOT* compatible with v2.x you will need to upgrade your
host application to support the new v3 functionality.

## v3.x Changelog

## Vue v3

The entire framework has been updated to use the composition API which
will be available in the final Vue 3 release.

You need to upgrade your host application to be compatible with the
composition API.

You can see the UnicornGlobal/quick-dash project template to see the
new structure your host app should be following.

Overview: https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4

## Styles

Styles have been completely reworked.

Host applications can replace their local v2 `_variables.scss` file with
the new, modular `variables` folder, and can override the variables from
the host app.

## Validation

The new Vee Validate in v3 is not compatible with v2 apps.

See the Vee Validation documentation for upgrading to v3


Do not base new projects on this one.

This is the base framework package that should be included as a dependency.

Use or fork https://github.com/UnicornGlobal/quick-dash for your
projects.

Designed to work with UnicornGlobal/strong-lumen

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Environment

Inside the `config` folder is a file `secrets.env.js.example`. You must
copy this file to `secrets.env.js` and set your secrets up in there.

Do not commit secrets, put them in the .env file.

## CI

There are scripts for travis included

Tests are run against the master version of UnicornGlobal/strong-lumen

### Custom Routes vs Static Routes

Load up your custom in-app (authenticated) routes in your ~/router
folder.

To include "static" routes (ones that do not require authentication
and which do not load up in the app sidebar) add them to a special
directory called ~/router/static

Any files placed in ~/router/static will not be loaded into the
authenticated area of the app.

Examples include terms and conditions pages and contact forms.

**NB** Do not add any custom routes that have the path `/`.

This is a special route that redirects to `/home`.

**NB** You *must* have a `home.js` file in your router directory
that sits on the path `/home` - this is the default logged in route that
the base route `/` will always redirect to.

This may change in the future but is the convention for now.

**NB** You *must* att `static:true` to the `meta` field of your static
routes. This may change in the future but is convention for now.

#### Allow Any Role

To allow any role on a route just set role to `false`

### Config Loading

The values in `/src/config/*.js` will be overridden by any values
present in the matching file in the host app.

Any additional values in the host app will be appended.

### Component References

All components in the framework can be accessed with the `@` import tag.

All components in the host app can be accessed with the `~` import tag.

Example:

To load a framework component:

`import component from '@/components/FrameworkComponent'`

To load a component from the host app:

`import component from '~/components/LocalComponent'`

#### Loader

If you place a `Loader.vue` file in `/src/components` it will override the
base framework loader with your custom component.
