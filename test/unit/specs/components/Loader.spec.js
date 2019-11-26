import Loader from '@/components/Loader.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'

describe('Loader.vue', () => {
  it('Has expected props', () => {
    expect(Loader.props).to.be.an('object').that.has.all.keys('height', 'width', 'fill', 'strokeWidth')
  })

  it('Renders the default props', () => {
    const localVue = createLocalVue()
    const options = {
      localVue
    }

    const loader = shallowMount(Loader, options)

    expect(loader.find('svg').html()).to.contain('20px')
    expect(loader.find('svg').html()).to.contain('#9C27B0')
  })
})
