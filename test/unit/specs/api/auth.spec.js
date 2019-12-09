import { resendVerification, logout } from '@/api/auth'
import Vue from 'vue'
import sinon from 'sinon'

describe('api/auth.js', () => {
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
})
