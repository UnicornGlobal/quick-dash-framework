import Prompt from '@/components/Prompt.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { ErrorBag } from 'vee-validate'

describe('Prompt.vue', () => {
  it('has methods and data', () => {
    expect(Prompt.data()).to.be.an('object').that.has.all.keys('show', 'sending', 'requestMethod')
    expect(Prompt.methods).to.be.an('object').that.has.all.keys('cancel', 'ok', 'doAction')
  })

  it('it cancels when cancel button is clicked', () => {
    const localVue = createLocalVue()
    const options = {
      mocks: {
        errors: new ErrorBag(),
        $http: {
          post: sinon.stub().resolves({})
        }
      },
      localVue
    }

    const prompt = shallowMount(Prompt, options)
    const cancel = sinon.spy(prompt.vm, 'cancel')
    prompt.setData({show: true})
    prompt.find('button.cancel-button').trigger('click')
    expect(cancel.called).to.equal(true)
    expect(prompt.emitted()).to.have.all.keys('cancelled')
    expect(prompt.vm.show).to.equal(false)
  })

  it('it calls ok when ok button is clicked', () => {
    const localVue = createLocalVue()
    const options = {
      mocks: {
        errors: new ErrorBag(),
        $http: {
          post: sinon.stub().resolves({})
        }
      },
      localVue
    }

    const prompt = shallowMount(Prompt, options)
    const ok = sinon.stub(prompt.vm, 'ok')
    prompt.setData({show: true})
    prompt.find('button.ok-button').trigger('click')
    expect(ok.called).to.equal(true)
  })

  it('it sends request when url is set', () => {
    const localVue = createLocalVue()
    const options = {
      mocks: {
        errors: new ErrorBag(),
        $http: {
          post: sinon.stub().resolves({})
        }
      },
      localVue
    }

    const prompt = shallowMount(Prompt, options)
    const doAction = sinon.stub(prompt.vm, 'doAction').resolves({})
    prompt.setProps({url: 'api/test'})
    prompt.setData({show: true})
    prompt.vm.ok()
    expect(doAction.called).to.equal(true)

    doAction.resetHistory()
    prompt.setProps({url: ''})
    prompt.vm.ok()
    expect(doAction.called).to.equal(false)
    expect(prompt.emitted()).to.have.all.keys('confirmed')
    expect(prompt.vm.show).to.equal(false)
  })

  it('performs get requests', () => {
    const localVue = createLocalVue()
    const options = {
      mocks: {
        errors: new ErrorBag(),
        $http: {
          post: sinon.stub().resolves({data: {}}),
          get: sinon.stub().resolves({data: {}})
        }
      },
      propsData: {
        method: 'get',
        url: 'api/test',
        data: {id: '1'}
      },
      localVue
    }

    const prompt = shallowMount(Prompt, options)
    prompt.vm.ok()
    expect(prompt.vm.$http.get.calledWith('api/test', {params: {id: '1'}})).to.equal(true)
  })

  it('performs put requests', () => {
    const localVue = createLocalVue()
    const options = {
      mocks: {
        errors: new ErrorBag(),
        $http: {
          post: sinon.stub().resolves({data: {}}),
          put: sinon.stub().resolves({data: {}})
        }
      },
      propsData: {
        method: 'put',
        url: 'api/test',
        data: {id: '1'}
      },
      localVue
    }

    const prompt = shallowMount(Prompt, options)
    prompt.vm.ok()
    // It reroutes put to post
    expect(prompt.vm.$http.put.calledWith('api/test', {params: {id: '1'}})).to.equal(false)
    expect(prompt.vm.$http.post.calledWith('api/test', {params: {id: '1'}})).to.equal(false)
  })

  it('emits success event', () => {
    const localVue = createLocalVue()
    const options = {
      mocks: {
        errors: new ErrorBag(),
        $http: {
          post: sinon.stub().resolves({data: {}}),
          get: sinon.stub().resolves({data: {}})
        }
      },
      propsData: {
        method: 'post',
        url: 'api/test',
        data: {id: '1'}
      },
      localVue
    }

    const prompt = shallowMount(Prompt, options)
    return prompt.vm.doAction()
      .then(() => {
        expect(prompt.emitted()).to.have.key('success')
      })
  })

  it('handles failed requests', () => {
    const localVue = createLocalVue()
    const toastSpy = {
      addToast: sinon.stub().returns(true)
    }

    const options = {
      mocks: {
        $toaster: toastSpy,
        errors: new ErrorBag(),
        $http: {
          post: sinon.stub().rejects({message: 'server error'})
        }
      },
      propsData: {
        method: 'post',
        url: 'api/test',
        data: {id: '1'}
      },
      localVue
    }

    const prompt = shallowMount(Prompt, options)
    return prompt.vm.doAction()
      .then(() => {
        expect(toastSpy.addToast.called).to.equal(true)
        expect(prompt.vm.sending).to.equal(false)
      })
  })
})
