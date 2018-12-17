import Vue from 'vue'
import sinon from 'sinon'
import axios from 'axios'

import {
  loadUserDetails,
  loadUserData
} from '@/api/user'

Vue.axios = axios.create()

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
    it('loads user data', async () => {
      sinon.stub(Vue.axios, 'get').resolves({data: [1, 2, 3]})

      const result = await loadUserData({_id: 10})

      expect(Vue.axios.get.callCount).to.equal(1)
      expect(result).to.be.an('array').that.has.lengthOf(3)
      Vue.axios.get.restore()
    })
  })
})
