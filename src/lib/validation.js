import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  fieldsBagName: 'formFields',
  classes: false,
  events: 'input'
})
