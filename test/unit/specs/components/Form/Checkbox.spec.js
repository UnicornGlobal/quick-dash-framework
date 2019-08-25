import Checkbox from '@/components/Form/Checkbox.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

const localVue = createLocalVue()

describe('Checkbox.vue', () => {
  it('is an object', () => {
    expect(Checkbox).to.be.an('Object')
  })

  it('is unchecked by default', () => {
    let checkbox = shallow(Checkbox, {localVue})
    expect(checkbox.vm.checked).to.equal(undefined)
  })

  it('changes checked state from prop', () => {
    let checkbox = shallow(Checkbox, {localVue, propsData: {value: true}})
    expect(checkbox.vm.checked).to.equal(true)
  })

  it('changes checked status when clicked', () => {
    let checkbox = shallow(Checkbox, {localVue})
    expect(checkbox.vm.checked).to.equal(undefined)

    checkbox.find('label').trigger('click')
    expect(checkbox.vm.checked).to.equal(true)
  })

  it('emits input event with correct value', () => {
    let checkbox = shallow(Checkbox, {localVue})
    checkbox.setData({checked: true})
    expect(checkbox.emitted()).to.have.all.keys('input')
    expect(checkbox.emitted('input')[0][0]).to.equal(true)

    checkbox.setData({checked: false})
    expect(checkbox.emitted('input')).to.be.an('Array').that.has.lengthOf(2)
    expect(checkbox.emitted('input')[1][0]).to.equal(false)
  })
})
