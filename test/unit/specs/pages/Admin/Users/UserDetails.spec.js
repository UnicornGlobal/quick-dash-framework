import UserDetails from '@/pages/Admin/Users/UserDetails.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as Api from '@/api/admin/users'
import Vue from 'vue'
import store from '@/store'

const role1 = {
  name: 'Role 1',
  _id: 'r1'
}
const role2 = {
  name: 'Role 2',
  _id: 'r2'
}

describe('UserDetails.vue', () => {
  it('is an Object', () => {
    expect(UserDetails).to.be.an('Object')
  })

  it('gets a User', () => {
    let localVue = createLocalVue()

    store.commit('admin/users',
      [
        {
          '_id': 'c3e2a355-74e3-4f5b-b854-e393f19b47a2',
          'username': '20c2f0cb-9d45-4139-bfb5-d9924dda9273',
          'first_name': 'System',
          'last_name': 'User',
          'email': 'system@example.com',
          'is_verified': 0,
          'mobile': '',
          'confirmed': false
        },
        {
          '_id': 'e000f88e-2850-4ef6-8f38-d411269a3393',
          'username': 'user',
          'first_name': 'Test',
          'last_name': 'User',
          'email': 'developer@test.co.za',
          'is_verified': 0,
          'mobile': '',
          'confirmed': false
        }
      ]
    )

    let mocks = {
      $store: store
    }

    Vue.axios = {
      get: sinon.stub().rejects({data:[]})
    }

    let wrapper = shallowMount(UserDetails, {
      localVue,
      mocks,
      propsData: {
        userId: 'c3e2a355-74e3-4f5b-b854-e393f19b47a2'
      }
    })

    expect(wrapper.vm.userDetails._id).to.equal(
      'c3e2a355-74e3-4f5b-b854-e393f19b47a2'
    )
    expect(wrapper.vm.$store.getters['admin/users']).to.be.an('array').that.has.lengthOf(2)
    expect(wrapper.vm.$store.getters['admin/users'][1]._id).to.to.equal('e000f88e-2850-4ef6-8f38-d411269a3393')
  })

  it('loads all users when mouted', () => {
    let users = sinon
      .stub(Api, 'loadAllUsers')
      .resolves({ data:
        { users:
          [
            {
              '_id': 'c3e2a355-74e3-4f5b-b854-e393f19b47a0',
              'username': '20c2f0cb-9d45-4139-bfb5-d9924dda9273',
              'first_name': 'System',
              'last_name': 'User',
              'email': 'system@example.com',
              'is_verified': 0,
              'mobile': '',
              'confirmed': false
            }
          ]
        }
      })
    expect(users).to.be.a('function')
  })

  it('it loads users roles', async () => {
    let localVue = createLocalVue()

    store.commit('admin/users', [
      {
        '_id': 'c3e2a355-74e3-4f5b-b854-e393f19b47a2',
        'username': '20c2f0cb-9d45-4139-bfb5-d9924dda9273',
        'first_name': 'System',
        'last_name': 'User',
        'email': 'system@example.com',
        'is_verified': 0,
        'mobile': '',
        'confirmed': false
      },
      {
        '_id': 'e000f88e-2850-4ef6-8f38-d411269a3393',
        'username': 'user',
        'first_name': 'Test',
        'last_name': 'User',
        'email': 'developer@test.co.za',
        'is_verified': 0,
        'mobile': '',
        'confirmed': false
      }
    ])

    let mocks = {
      $store: store
    }

    Vue.axios = {
      get: sinon.stub().rejects({data:[]})
    }

    let wrapper = shallowMount(UserDetails, {
      localVue,
      mocks,
      propsData: {
        userId: 'c3e2a355-74e3-4f5b-b854-e393f19b47a2'
      }
    })

    expect(wrapper.vm.availableRoles).to.equal(null)
    wrapper.vm.$store.state.allRoles = [role1, role2]
    expect(wrapper.vm.availableRoles).to.equal(null)

    wrapper.setData({userRoles: [role1]})

    await wrapper.vm.$nextTick(async () => {
      await setTimeout(() => {
        expect(wrapper.vm.availableRoles).to.be.an('array').that.has.lengthOf(1)
        expect(wrapper.vm.availableRoles[0]._id).to.equal(role2._id)
        expect(wrapper.vm.availableRoles).to.equal(null)
      }, 500)
    })
  })
})
