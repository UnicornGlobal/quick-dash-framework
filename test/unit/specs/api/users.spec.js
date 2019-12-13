import { changeUserDetails, getSelf } from '@/api/user'
import Vue from 'vue'
import sinon from 'sinon'

describe('api/users.js', () => {
  describe('getSelf', () => {
    it('gets own details', async () => {
      Vue.axios = {
        get: sinon.stub().resolves({
          data: {
            '_id': 'a12321b'
          }
        })
      }

      await getSelf().then(res => {
        expect(res._id).to.equal('a12321b')
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
