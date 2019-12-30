import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  delay: 0,
  fastExit: true,
  fieldsBagName: 'formFields',
  classes: false,
  events: 'input'
})
