import { resendVerification, changeUserDetails } from '@/api/user'
import Vue from 'vue'
import sinon from 'sinon'

describe('user.js', () => {
  describe('resendVerification', () => {
    it('resends verification email', async () => {
      Vue.axios = {
        get: sinon.stub().resolves({ data: null })
      }

      await resendVerification().then(res => {
        expect(res).to.equal(null)
      })
    })
  })

  describe('changeUserDetails', () => {
    it('changes the users details', async () => {
      Vue.axios = {
        post: sinon.stub().resolves({data: 'OK'})
      }

      await changeUserDetails(1, {}).then(res => {
        expect(res.data).to.equal('OK')
      })
    })
  })
})
