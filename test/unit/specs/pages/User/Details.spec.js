// http://chaijs.com/api/bdd/
import Details from '@/pages/User/Details'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('Details.vue', () => {
  it('is an Object', () => {
    expect(Details).to.be.an('Object')
  })

  it('gets an empty User', async () => {
    let localVue = createLocalVue()
    let mocks = {
      $store: {
        state: {
          user: {
            'first_name': '',
            'last_name': '',
            'email': '',
            'mobile': '',
            '_id': ''
          }
        }
      }
    }

    let wrapper = shallowMount(Details, {
      localVue,
      mocks
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.userDetails).to.be.an('array').that.has.lengthOf(5)
    expect(wrapper.vm.userDetails[0].value).to.equal('-')
    expect(wrapper.vm.userDetails[1].value).to.equal('-')
    expect(wrapper.vm.userDetails[2].value).to.equal('-')
    expect(wrapper.vm.userDetails[3].value).to.equal('-')
    expect(wrapper.vm.userDetails[4].value).to.equal('-')
  })
})
