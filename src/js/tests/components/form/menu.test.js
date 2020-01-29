import React from 'react'

import Menu from '../../../components/form/menu'
import { toggleIsHome, toggleDrawer } from '../../../redux/store-helpers/ui'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

describe('<Menu />', () => {
  const storeOpen = mockStore({
    ui: {
      drawer: true,
      isHome: false
    }
  })

  const storeClose = mockStore({
    ui: {
      drawer: false,
      isHome: false
    }
  })

  beforeEach(() => {
    // Mocks
    document.getElementById = jest.fn(() => {
      return { offsetWidth: 200 }
    })
  })

  it('should be open', () => {
    const wrapper = mountWithStore(<Menu />, storeOpen)
    const nav = wrapper.find('nav')

    expect(nav.length).toBe(1)
    expect(nav.hasClass('open')).toEqual(true)
  })

  it('should be close', () => {
    const wrapper = mountWithStore(<Menu />, storeClose)
    const nav = wrapper.find('nav')

    expect(nav.length).toBe(1)
    expect(nav.hasClass('close')).toEqual(true)
  })

  it('should work', () => {
    const wrapper = mountWithStore(<Menu />, storeOpen)

    const homeToggle = findTestAttr(wrapper, 'home-toggle')
    expect(homeToggle.length).toBe(1)
    const drawerToggle = findTestAttr(wrapper, 'drawer-toggle')
    expect(drawerToggle.length).toBe(1)

    homeToggle.simulate('click')
    drawerToggle.simulate('click')
    const actions = storeOpen.getActions()
    expect(actions[0]).toEqual(toggleIsHome())
    expect(actions[1]).toEqual(toggleDrawer())
  })
})
