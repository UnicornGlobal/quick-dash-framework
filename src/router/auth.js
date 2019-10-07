import Vue from 'vue'
import config from '@/config'
import { logout } from '@/api/user'

function redirectIfAuthenticated(to, from, next) {
  if (Vue.auth && Vue.auth.check()) {
    next(false)
  } else {
    next()
  }
}

export default [
  {
    name: 'Root',
    path: '/',
    component: require('@/App.vue').default
  },
  {
    name: 'Login',
    path: '/login',
    component: require('@/pages/Login.vue').default,
    beforeEnter(to, from, next) {
      redirectIfAuthenticated(to, from, next)
    },
    props: {
      headerComponent: config.login.customHeader ? config.login.customHeader : null,
      footerComponent: config.login.customFooter ? config.login.customFooter : null
    }
  },
  {
    name: 'Signup',
    path: '/signup',
    component: require('@/pages/Signup.vue').default,
    beforeEnter(to, from, next) {
      redirectIfAuthenticated(to, from, next)
    },
    props: {
      headerComponent: config.signup.customHeader ? config.signup.customHeader : null,
      footerComponent: config.signup.customFooter ? config.signup.customFooter : null
    }
  },
  {
    name: 'Confirmed',
    path: '/confirmed',
    async beforeEnter(to, from, next) {
      await logout()
      next(false)
    }
  },
  {
    name: 'Logout',
    path: '/logout',
    async beforeEnter(to, from, next) {
      await logout()
      next(false)
    }
  },
  {
    name: 'ResetPassword',
    path: '/password-reset',
    component: require('@/pages/PasswordResetRequest.vue').default,
    props: {
      headerComponent: config.login.customHeader ? config.login.customHeader : null,
      footerComponent: config.login.customFooter ? config.login.customFooter : null
    }
  },
  {
    name: 'ResetPasswordForm',
    path: '/password-reset/:email/:token',
    component: require('@/pages/PasswordResetForm.vue').default,
    props: {
      headerComponent: config.login.customHeader ? config.login.customHeader : null,
      footerComponent: config.login.customFooter ? config.login.customFooter : null
    }
  }
]
