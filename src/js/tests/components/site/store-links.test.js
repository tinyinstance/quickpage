import React from 'react'

import StoreLinks, { StoreLink } from '../../../components/site/store-links'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

describe('<StoreLinks />', () => {
  describe('<StoreLink />', () => {
    it('should render link', () => {
      const mockLink = {
        id: '1',
        storeType: 'apple',
        url: 'URL'
      }
      const store = mockStore({
        stores: {
          [mockLink.id]: mockLink
        }
      })
      const wrapper = mountWithStore(<StoreLink storeId={mockLink.id} />, store)
      expect(findTestAttr(wrapper, 'available').length).toBe(1)
      expect(wrapper.find('a').prop('href')).toEqual(mockLink.url)
    })

    it('should render soon link', () => {
      const mockLink = {
        id: '1',
        storeType: 'apple',
        url: ''
      }
      const store = mockStore({
        stores: {
          '1': mockLink
        }
      })

      const wrapper = mountWithStore(<StoreLink storeId={mockLink.id} />, store)
      expect(findTestAttr(wrapper, 'soon').length).toBe(1)
      expect(wrapper.find('a').prop('href')).toBe(undefined)
    })
  })

  describe('<StoreLinks />', () => {
    it('should render all stores', () => {
      const refs = ['1', '2']
      const store = mockStore({
        storeRefs: refs,
        stores: {
          '1': {
            id: '1',
            storeType: 'apple',
            url: 'URL'
          },
          '2': {
            id: '2',
            storeType: 'other',
            url: 'URL'
          }
        }
      })

      const wrapper = mountWithStore(<StoreLinks />, store)
      expect(wrapper.find('StoreLink').length).toBe(refs.length)
    })
  })
})
