import AssignRoleForm from '@/pages/Admin/Users/AssignRoleForm.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as RolesApi from '@/api/admin/roles'
import sinon from 'sinon'
import { ToasterEvents } from 'unicorn-vue-toaster'

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

    form.setData({currentRoleId: 'ui83jkqwq'})

    let assignRole = sinon.stub(RolesApi, 'assignRole').resolves({status: 'ok'})
    form.vm.assignRole().then((result) => {
      expect(form.emitted()).to.have.key('success')
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

    form.setData({currentRoleId: 'ui83jkqwq'})

    let assignRole = sinon.stub(RolesApi, 'assignRole').rejects({status: 'not ok'})
    return form.vm.assignRole().then(() => {
      expect(form.emitted()).to.have.key('error')
      assignRole.restore()
    })
  })
})
