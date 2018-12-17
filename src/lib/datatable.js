import Vue from 'vue'
import DataTable from 'unicorn-vue-datatable'

Vue.use(DataTable, {
  theme: {
    primary: '#B7C7E0',
    primaryText: 'black',
    secondaryText: '#1B2638',
    secondary: '#343',
    padding: '1em',
    rowHeight: '65px'
  }
})
