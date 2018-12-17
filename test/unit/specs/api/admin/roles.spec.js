import { assignRole, loadAndStoreAllRoles, loadUserRoles } from '@/api/admin/roles'

import Vue from 'vue'
import sinon from 'sinon'

describe('roles.js', () => {
  describe('loadAndStoreAllRoles', () => {
    it('loads all roles', () => {
      let roles = [{_id: '1', name: 'Role1'}]
      sinon.stub(Vue.axios, 'get').resolves({data: roles})

      return loadAndStoreAllRoles().then(res => {
        expect(res.length).to.equal(1)
        expect(res[0].name).to.equal('Role1')
        Vue.axios.get.restore()
      })
    })
  })

  describe('loadUserRoles', () => {
    it('it loads user roles', () => {
      let roles = [{_id: '1', name: 'Role2'}]
      sinon.stub(Vue.axios, 'get').resolves({data: roles})

      return loadUserRoles('someId').then(res => {
        expect(res.length).to.equal(1)
        expect(res[0].name).to.equal('Role2')
        Vue.axios.get.restore()
      })
    })
  })

  describe('assignRole', () => {
    it('it assigns new user role', () => {
      sinon.stub(Vue.axios, 'post').resolves({status: 'ok'})

      return assignRole('someUser', 'someRole').then(res => {
        expect(res.status).to.equal('ok')
        Vue.axios.post.restore()
      })
    })
  })
})
