import { loadAllUsers, addNewUser } from '@/api/admin/users'

import Vue from 'vue'
import sinon from 'sinon'

describe('users.js', () => {
  describe('loadAllUsers', () => {
    it('loads all users', async () => {
      let users = [{ id: '1', name: 'Daniel' }]
      sinon.stub(Vue.axios, 'get').resolves({ data: { users } })

      await loadAllUsers().then(res => {
        expect(res.users.length).to.equal(1)
        expect(res.users[0].name).to.equal('Daniel')
        Vue.axios.get.restore()
      })
    })
  })

  describe('addNewUser', () => {
    it('adds new user', async () => {
      sinon
        .stub(Vue.axios, 'post')
        .resolves({ data: { _id: 'ef3b5d09-a46b-4af6-8f23-51f814782829' } })

      await addNewUser().then(res => {
        expect(res.data._id).to.equal('ef3b5d09-a46b-4af6-8f23-51f814782829')
        Vue.axios.post.restore()
      })
    })
  })
})
