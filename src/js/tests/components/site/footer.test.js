import React from 'react'

import Footer, {
  FooterMenu,
  FooterCopy,
  Contact,
  SocialMenuItem,
  OtherMenuItem,
  BuiltWith
} from '../../../components/site/footer'
import { mountWithStore, mockStore, findTestAttr } from '../../common'
import { Remarkable } from 'remarkable'

describe('<Footer />', () => {
  const infoItem = {
    id: '1',
    title: 'Title',
    content: '### mock content markdown'
  }
  const socialItem = {
    id: '1',
    title: 'Social Title',
    url: 'URL'
  }
  const refs = ['1']
  const mockState = {
    contact: 'email@example.com',
    footerCopy: '### mock footer copy',
    showBuildBy: true,
    otherRefs: refs,
    socialRefs: refs,
    others: { '1': infoItem },
    socials: { '1': socialItem }
  }
  const store = mockStore(mockState)

  describe('<OtherMenuItem />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<OtherMenuItem id="1" />, store)
      expect(wrapper.find('a').length).toBe(1)
      expect(wrapper.find('a').text()).toEqual(infoItem.title)
    })
  })

  describe('<SocialMenuItem />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<SocialMenuItem id="1" />, store)
      expect(wrapper.find('a').length).toBe(1)
      expect(wrapper.find('a').text()).toEqual(socialItem.title)
      expect(wrapper.find('a').prop('href')).toEqual(socialItem.url)
    })
  })

  describe('<Contact />', () => {
    it('should not render', () => {
      const wrapper = mountWithStore(<Contact />, mockStore({ contact: '' }))
      expect(wrapper.find('a').length).toBe(0)
    })

    it('should render', () => {
      const wrapper = mountWithStore(<Contact />, store)
      expect(wrapper.find('a').length).toBe(1)
      expect(wrapper.find('a').text()).toEqual('Contact')
      expect(wrapper.find('a').prop('href')).toEqual(
        'mailto:' + mockState.contact
      )
    })
  })

  describe('<FooterMenu />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<FooterMenu />, store)
      expect(wrapper.find('OtherMenuItem').length).toBe(refs.length)
      expect(wrapper.find('SocialMenuItem').length).toBe(refs.length)
      expect(wrapper.find('Contact').length).toBe(1)
    })
  })

  describe('<FooterCopy />', () => {
    it('should not render', () => {
      const wrapper = mountWithStore(
        <FooterCopy />,
        mockStore({ footerCopy: '' })
      )
      expect(wrapper.find('div').length).toBe(0)
    })

    it('should render', () => {
      const wrapper = mountWithStore(<FooterCopy />, store)
      const md = new Remarkable()
      expect(wrapper.find('div').length).toBe(1)
      expect(wrapper.find('div').html()).toContain(
        md.render(mockState.footerCopy)
      )
    })
  })

  describe('<BuiltWith />', () => {
    it('should not render', () => {
      const wrapper = mountWithStore(
        <BuiltWith />,
        mockStore({ showBuildBy: false })
      )
      expect(findTestAttr(wrapper, 'built-with').length).toBe(0)
    })

    it('should render', () => {
      const wrapper = mountWithStore(
        <BuiltWith />,
        mockStore({ showBuildBy: true })
      )
      expect(findTestAttr(wrapper, 'built-with').length).toBe(1)
    })
  })

  describe('<Footer />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<Footer />, store)
      expect(wrapper.find('FooterMenu').length).toBe(1)
      expect(wrapper.find('FooterCopy').length).toBe(1)
      expect(wrapper.find('BuiltWith').length).toBe(1)
    })
  })
})
