// http://chaijs.com/api/bdd/
import AvatarOrInitials from '@/components/AvatarOrInitials'
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('AvatarOrInitials.vue', () => {
  it('mounts correctly with minimal values and renders an initial', () => {
    let avatarOrInitials = mount(AvatarOrInitials, {
      attachToDocument: true,
      localVue,
      propsData: {
        title: 'xx',
        size: 45
      }
    })

    expect(avatarOrInitials.contains('div')).to.equal(true)
    const initials = avatarOrInitials.find('.avatar-initials')
    expect(initials.is('div')).to.equal(true)
    expect(initials.text()).to.equal('x')
  })

  it('mounts correctly with full values and renders an image', () => {
    let avatarOrInitials = mount(AvatarOrInitials, {
      attachToDocument: true,
      localVue,
      propsData: {
        title: 'xx',
        size: 45,
        round: true,
        image: 'https://example.com/example.jpeg'
      }
    })

    expect(avatarOrInitials.contains('div')).to.equal(true)
    const image = avatarOrInitials.find('.avatar-image')
    expect(image.is('img')).to.equal(true)
    expect(image.element.getAttribute('width')).to.equal('45px')
    expect(image.element.style.borderRadius).to.equal('45px')
  })
})
