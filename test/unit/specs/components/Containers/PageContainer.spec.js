// http://chaijs.com/api/bdd/
import PageContainer from '@/components/Containers/PageContainer'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('PageContainer.vue', () => {
  it('Is an object', () => {
    expect(PageContainer).to.be.an('object')
  })

  it('Has correct props', () => {
    expect(PageContainer.props).to.be.an('object').that.has.all.keys('title')
  })

  it('Includes a TopNav and VerifyAccount widget', () => {
    // We have to use let because the value mutates behind the scenes
    // eslint-disable-next-line prefer-const
    let val = PageContainer.components
    expect(val).to.have.all.keys('TopNav', 'VerifyAccountCard')
  })

  it('Renders when loaded', () => {
    const wrapper = shallowMount(PageContainer, {
      localVue,
      mocks: {
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
        },
        $auth: {
          ready() {
            return true
          }
        }
      }
    })

    console.log(wrapper.html())
    expect(wrapper.contains('div')).to.equal(true)
    expect(wrapper.find('.page-container').is('div')).to.equal(true)
    expect(wrapper.find('verify-account-card-stub').exists()).to.equal(true)
  })

  it('Has expected computed methods', () => {
    const localVue = createLocalVue()
    const wrapper = shallowMount(PageContainer, {
      localVue,
      mocks: {
        $store: {
          getters: {
            'auth/user': sinon.spy(),
            'app/loading': false,
            'app/sidebar/enabled': sinon.spy(),
            'app/config': {
              sidebar: {
                enabled: true
              }
            }
          }
        },
        $auth: {
          ready() {
            return true
          }
        }
      }
    })

    expect(PageContainer.computed).to.be.an('object').that.has.all.keys('user', 'loaded', 'enableSideBar')

    expect(wrapper.vm.user).to.be.a('function')
    expect(wrapper.vm.loaded).to.equal(true)
    expect(wrapper.vm.enableSideBar).to.equal(true)
  })
})
