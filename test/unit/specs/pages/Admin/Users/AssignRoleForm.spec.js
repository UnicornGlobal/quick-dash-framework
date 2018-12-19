import AssignRoleForm from '@/pages/Admin/Users/AssignRoleForm.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as RolesApi from '@/api/admin/roles'
import sinon from 'sinon'
import { ToasterEvents } from '@unicorns/toaster'
import Vue from 'vue'

describe('AssignRoleForm', () => {
  it('emits success event', async () => {
    let localVue = createLocalVue()

    let form = shallowMount(AssignRoleForm, {
      localVue,
      propsData: {
        user: {_id: '82923232'},
        roles: []
      },
      mocks: {
        $toaster: ToasterEvents
      }
    })

    Vue.axios = {
      post: sinon.stub().resolves({data:{status:'ok'}})
    }

    form.setData({currentRoleId: 'successroleid'})

    let assignRole = sinon.stub(RolesApi, 'assignRole').resolves({status: 'ok'})

    await form.vm.assignRole().then((result) => {
      expect(form.emitted()).to.have.key('success')
      sinon.assert.called(Vue.axios.post)
      assignRole.restore()
    })
  })

  it('emits error event', async () => {
    let localVue = createLocalVue()

    let form = shallowMount(AssignRoleForm, {
      localVue,
      propsData: {
        user: {_id: '82923232'},
        roles: []
      },
      mocks: {
        $toaster: ToasterEvents
      }
    })

    form.setData({currentRoleId: 'notokrole'})

    Vue.axios = {
      post: sinon.stub().rejects({data:{status:'nok'}})
    }

    await form.vm.assignRole().then(() => {
      expect(form.emitted()).to.have.key('error')
      sinon.assert.called(Vue.axios.post)
    })
  })
})
