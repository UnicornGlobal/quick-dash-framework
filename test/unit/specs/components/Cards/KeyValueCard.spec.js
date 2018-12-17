import KeyValueCard from '@/components/Cards/KeyValueCard.vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'

describe('KeyValueCard', () => {
  it('tests for arrays', () => {
    const localVue = createLocalVue()

    const card = shallowMount(KeyValueCard, {localVue, propsData: {items: []}})
    expect(card.vm.isArray([])).to.equal(true)
  })
})
