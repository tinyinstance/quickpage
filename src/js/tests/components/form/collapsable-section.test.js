import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import CollapsableSection from '../../../components/form/collapsable-section'

import { mockStore, findTestAttr } from '../../common'

describe('<CollapsableSection />', () => {
  const props = {
    id: 'section-id',
    title: 'section-title'
  }

  const store = mockStore({
    ui: {
      collapsed: ['section-id'],
      info: ['']
    }
  })

  const element = store => {
    return (
      <Provider store={store}>
        <CollapsableSection {...props}>
          <div data-test="check-visible">Children placeholder</div>
        </CollapsableSection>
      </Provider>
    )
  }

  it('should have title', () => {
    const wrapper = mount(element(store))
    expect(wrapper.find('h3').text()).toEqual(props.title)
  })

  it('should not render children', () => {
    const wrapper = mount(element(store))
    expect(findTestAttr(wrapper, 'check-visible').length).toEqual(0)
  })

  it('should render children', () => {
    const store = mockStore({
      ui: {
        collapsed: [''],
        info: ['']
      }
    })

    const wrapper = mount(element(store))
    expect(findTestAttr(wrapper, 'check-visible').length).toEqual(1)
  })

  it('should not render info box', () => {
    const wrapper = mount(element(store))
    expect(findTestAttr(wrapper, 'info-box').length).toEqual(0)
  })

  it('should not render info box when collapsed', () => {
    const store = mockStore({
      ui: {
        collapsed: ['section-id'],
        info: ['section-id']
      }
    })

    const wrapper = mount(element(store))
    expect(findTestAttr(wrapper, 'info-box').length).toEqual(0)
  })

  it('should render info box', () => {
    const store = mockStore({
      ui: {
        collapsed: [],
        info: ['section-id']
      }
    })

    const wrapper = mount(element(store))
    expect(findTestAttr(wrapper, 'info-box').length).toEqual(1)
  })
})
