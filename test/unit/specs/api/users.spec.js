import {
  loadUserDetails,
  loadUserData
} from '@/api/user'

import Vue from 'vue'
import sinon from 'sinon'

describe('users.js', () => {
  describe('loadUserDetails', () => {
    it('loads user details', () => {
      let user = {name: 'user', id: '1'}
      sinon.stub(Vue.axios, 'get').resolves({data: user})

      return loadUserDetails(1).then((res) => {
        expect(res.id).to.equal('1')
        Vue.axios.get.restore()
      })
    })
  })

  describe('loadUserData', () => {
    it('loads user data', () => {
      sinon.stub(Vue.axios, 'get').resolves({data: [1, 2, 3]})
      return loadUserData({_id: 10}).then((result) => {
        expect(Vue.axios.get.callCount).to.equal(1)
        expect(result).to.be.an('array').that.has.lengthOf(3)
        Vue.axios.get.restore()
      })
    })
  })
})
