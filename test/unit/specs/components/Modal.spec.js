import Modal from '@/components/Modal.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('Modal.vue', () => {
  it('it emits close event when close button is clicked', () => {
    const localVue = createLocalVue()
    const options = {
      localVue
    }

    const modal = shallowMount(Modal, options)
    modal.find('div.close').trigger('click')
    expect(modal.emitted()).to.have.all.keys('close')
  })
})
