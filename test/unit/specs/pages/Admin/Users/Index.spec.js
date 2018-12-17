import UsersPage from '@/pages/Admin/Users/Index.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

describe('Admin All Users', () => {
  it('is an object', () => {
    expect(UsersPage).to.be.an('object')
  })

  it('loads all users when mouted', async () => {
    const localVue = createLocalVue()
    const loadUsers = sinon.stub().resolves([])

    let wrapper = shallowMount(UsersPage, {
      localVue,
      methods: {
        loadUsers
      },
      mocks: {
        $http: {
          get: sinon.stub().resolves({data: {}})
        },
        $store: {
          state: {
            users: []
          }
        }
      }
    })

    await wrapper.vm.$nextTick()

    sinon.assert.called(loadUsers)
    expect(wrapper.vm.users).to.be.an('array').that.is.empty
  })
})
