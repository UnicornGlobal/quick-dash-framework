import Alert from '@/components/Alert.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('Alert.vue', () => {
  it('is an object', () => {
    expect(Alert).to.be.an('Object')
  })

  it('is of type success by default', () => {
    const alert = shallowMount(Alert, {localVue})
    expect(alert.vm.type).to.equal('success')
  })

  it('is not dismissible by default', () => {
    const alert = shallowMount(Alert, {localVue})
    expect(alert.vm.dismissible).to.equal(false)
    expect(alert.find('div.close').exists()).to.equal(false)
  })

  it('shows close button if dismissible', () => {
    const alert = shallowMount(Alert, {localVue, propsData: {dismissible: true}})
    expect(alert.vm.dismissible).to.equal(true)
    expect(alert.find('div.close').exists()).to.equal(true)
  })

  it('changes type based on prop', () => {
    const alert = shallowMount(Alert, {localVue, propsData: {type: 'warning'}})
    expect(alert.vm.type).to.equal('warning')
  })

  it('has a default title for every type', () => {
    const alert = shallowMount(Alert, {localVue})
    const titles = {
      danger: 'Attention!',
      warning: 'Warning',
      info: 'Notification',
      success: 'Success!'
    }

    expect(alert.vm.getTitle).to.be.a('function')

    Object.keys(titles).forEach((style) => {
      alert.setProps({type: style})
      expect(alert.vm.getTitle()).to.equal(titles[style])
    })
  })

  it('renders title when configured', () => {
    const alert = shallowMount(Alert, {
      localVue,
      propsData: {
        title: 'xxxx'
      }
    })

    expect(alert.vm.getTitle).to.be.a('function')
    expect(alert.vm.getTitle()).to.equal('xxxx')
  })

  it('emits close event when close button is clicked', () => {
    const alert = shallowMount(Alert, {localVue, propsData: {dismissible: true}})
    alert.find('div.close').trigger('click')
    expect(alert.emitted()).to.have.all.keys('close')
  })

  it('auto closes if timeout is set', () => {
    const alert = shallowMount(Alert, {localVue, propsData: {timeOut: 0}})
    setTimeout(() => {
      expect(alert.emitted()).to.have.all.keys('close')
    }, 2000)
  })

  it('renders the content passed to it', () => {
    const content = {template: '<div>this is an alert</div>'}
    const alert = shallowMount(Alert, {localVue, slots: {default: content}})
    expect(alert.text()).to.include('this is an alert')
  })
})
