import React from 'react'
import { Remarkable } from 'remarkable'

import Description from '../../../components/site/description'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

describe('<Description />', () => {
  it('should render', () => {
    const mockDescription = '### mock description markdown'
    const store = mockStore({
      description: mockDescription
    })

    const wrapper = mountWithStore(<Description />, store)
    const md = new Remarkable()
    const content = findTestAttr(wrapper, 'content')

    expect(content.length).toEqual(1)
    expect(content.html()).toContain(md.render(mockDescription))
  })
})
