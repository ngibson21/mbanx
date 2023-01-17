import { mount } from '@vue/test-utils'
import Avatar from '@/components/Shared/Avatar.vue'
import axios from 'axios'

describe('Avatar.vue', () => {
  const wrapper = mount(Avatar, {
    axios,
    propsData: {
      email: 'john@thedough.da',
      initials: 'John Snow'
    }
  })

  it('sets gravatarExists to true', async (done) => {
    jest.spyOn(axios, 'get').mockImplementation(() => {
      return Promise.resolve({ data: 'cat.jpg' })
    })
    await wrapper.vm.checkGravatar()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.gravatarExists).toBeTruthy()
      done()
    })
  })

  it('catches error and sets gravatarExists to false', async (done) => {
    jest.spyOn(axios, 'get').mockImplementation(() => {
      return Promise.reject(new Error('Request failed with status code 404'))
    })
    await wrapper.vm.checkGravatar()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.gravatarExists).toBeFalsy()
      done()
    })
  })

  it('sets gravatarExists to false', async (done) => {
    wrapper.setProps({
      user: {
      }
    })
    await wrapper.vm.checkGravatar()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.gravatarExists).toBeFalsy()
      done()
    })
  })

  it('should render user initials', () => {
    wrapper.setProps({
      email: 'john@thedough.da',
      initials: 'John Snow'
    })
    expect(wrapper.vm.getInitials()).toBe('JS')
  })
})
