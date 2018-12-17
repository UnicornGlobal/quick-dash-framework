import UserDetails from '@/pages/Admin/Users/UserDetails.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as Api from '@/api/admin/users'
import * as RolesApi from '@/api/admin/roles'

const role1 = {
  name: 'Role 1',
  _id: 'hf7rhfesf37rfef'
}
const role2 = {
  name: 'Role 2',
  _id: 'ejkesksdsdsd'
}

describe('UserDetails.vue', () => {
  it('is an Object', () => {
    expect(UserDetails).to.be.an('Object')
  })

  it('gets a User', () => {
    let localVue = createLocalVue()
    let mocks = {
      $store: {
        state: {
          users: [
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
              'email': 'developer@everframe.co.za',
              'is_verified': 0,
              'mobile': '',
              'confirmed': false
            }
          ]
        }
      }
    }

    let loadUserRoles = sinon.stub(RolesApi, 'loadUserRoles').resolves(null)

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
    expect(wrapper.vm.$store.state.users).to.be.an('array').that.has.lengthOf(2)
    expect(wrapper.vm.$store.state.users[1]._id).to.to.equal('e000f88e-2850-4ef6-8f38-d411269a3393')
    loadUserRoles.restore()
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

  it('it loads users roles', () => {
    let localVue = createLocalVue()
    let mocks = {
      $store: {
        state: {
          users: [
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
              'email': 'developer@everframe.co.za',
              'is_verified': 0,
              'mobile': '',
              'confirmed': false
            }
          ]
        }
      }
    }

    let loadUserRoles = sinon.stub(RolesApi, 'loadUserRoles').resolves(null)

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

    return wrapper.vm.$nextTick(() => {
      setTimeout(() => {
        expect(wrapper.vm.availableRoles).to.be.an('array').that.has.lengthOf(1)
        expect(wrapper.vm.availableRoles[0]._id).to.equal(role2._id)
        expect(wrapper.vm.availableRoles).to.equal(null)
        loadUserRoles.restore()
      }, 500)
    })
  })
})
