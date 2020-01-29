import React from 'react'

import { Separator } from '../../../components/site/separator'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

describe('<Separator />', () => {
  it('should render', () => {
    const store = mockStore({
      mockValue: true
    })
    const mockSelector = state => state.mockValue
    const wrapper = mountWithStore(
      <Separator showSelector={mockSelector} />,
      store
    )
    expect(findTestAttr(wrapper, 'separator').length).toBe(1)
  })

  it('should not render', () => {
    const store = mockStore({
      mockValue: false
    })
    const mockSelector = state => state.mockValue
    const wrapper = mountWithStore(
      <Separator showSelector={mockSelector} />,
      store
    )
    expect(findTestAttr(wrapper, 'separator').length).toBe(0)
  })
})
