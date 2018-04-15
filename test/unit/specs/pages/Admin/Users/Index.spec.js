import * as Api from '@/api/admin/users'
import UsersPage from '@/pages/Admin/Users/Index.vue'
import { createLocalVue, shallow } from '@vue/test-utils'
import sinon from 'sinon'

describe('UsersPage', () => {
  it('is an object', () => {
    expect(UsersPage).to.be.an('object')
  })

  it('loads all users when mouted', () => {
    let localVue = createLocalVue()
    let load = sinon.stub(Api, 'loadAllUsers').resolves([])
    shallow(UsersPage, {localVue})
    expect(load.called).to.equal(true)
    load.restore()
  })
})
