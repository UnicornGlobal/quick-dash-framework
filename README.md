# @unicorns/quick-dash-framework

Do not base your projects on this one.

This is the base framework package.

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
