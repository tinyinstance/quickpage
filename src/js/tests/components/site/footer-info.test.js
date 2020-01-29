import React from 'react'
import { Remarkable } from 'remarkable'

import Others, { OtherModal } from '../../../components/site/footer-info'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

describe('<Others />', () => {
  const infoItem = {
    id: '1',
    title: 'Title',
    content: '### mock content markdown'
  }
  const otherRefs = ['1']
  const store = mockStore({
    otherRefs: otherRefs,
    others: {
      '1': infoItem
    }
  })

  describe('<OtherModal />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<OtherModal id="1" />, store)
      const title = findTestAttr(wrapper, 'title')
      expect(title.length).toBe(1)
      expect(title.text()).toEqual(infoItem.title)

      const modal = findTestAttr(wrapper, 'modal')
      expect(modal.prop('id')).toEqual(infoItem.id)

      const md = new Remarkable()
      const content = findTestAttr(wrapper, 'content')
      expect(content.length).toBe(1)
      expect(content.html()).toContain(md.render(infoItem.content))
    })
  })

  describe('<Others />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<Others key="1" id="1" />, store)
      expect(wrapper.find('OtherModal').length).toEqual(otherRefs.length)
    })
  })
})
