// http://chaijs.com/api/bdd/
import Details from '@/pages/User/Details'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('Details.vue', () => {
  it('is an Object', () => {
    expect(Details).to.be.an('Object')
  })

  it('gets an empty User', async () => {
    const localVue = createLocalVue()
    const mocks = {
      $store: {
        getters: {
          'auth/user': {}
        }
      }
    }

    const wrapper = shallowMount(Details, {
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

  it('gets a valid User', async () => {
    const localVue = createLocalVue()
    const mocks = {
      $store: {
        getters: {
          'auth/user': {
            _id: '111111111',
            username: 'user',
            first_name: 'User',
            last_name: 'Last',
            email: 'lastname@example.com',
            mobile: '+27822221111',
            about: 'Example',
            is_verified: 0,
            title: null,
            location: 'London, ON, Canada',
            company_name: 'ExtraVallis',
            referer: null,
            account_type: 'startup',
            facebook: null,
            twitter: null,
            linkedin: null,
            instagram: null,
            youtube: null,
            confirmed: false,
            roles: [
              {
                _id: '1111',
                name: 'startup'
              },
              {
                _id: '2222',
                name: 'user'
              }
            ],
            primary_startup: null,
            startup_company: null,
            primary_investment: null,
            investment_company: null,
            profile_photo: null
          }
        }
      }
    }

    const wrapper = shallowMount(Details, {
      localVue,
      mocks
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.userDetails).to.be.an('array').that.has.lengthOf(5)
    expect(wrapper.vm.userDetails[0].value).to.equal('User')
    expect(wrapper.vm.userDetails[1].value).to.equal('Last')
    expect(wrapper.vm.userDetails[2].value).to.equal('lastname@example.com')
    expect(wrapper.vm.userDetails[3].value).to.equal('+27822221111')
    expect(wrapper.vm.userDetails[4].value).to.equal('111111111')
  })
})
