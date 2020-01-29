import React from 'react'

import { actionType } from '../../../redux/action-types'
import {
  storeOptions,
  AddStoreLinkButton,
  StoreLinkDetail,
  StoreLinks
} from '../../../components/form/section-download-links'
import { useReduxUpdatingInput } from '../../../components/common/hooks'
import { mountWithStore, mockStore } from '../../common'

// Mock
jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<SectionDownloadLinks />', () => {
  describe('<AddStoreLinkButton />', () => {
    it('should work', () => {
      const store = mockStore({})
      const wrapper = mountWithStore(<AddStoreLinkButton />, store)

      const select = wrapper.find('select')
      expect(select.length).toBe(1)
      expect(select.find('option').length).toBe(
        Object.keys(storeOptions).length
      )

      const event = {
        target: {
          value: 'anything_but_0'
        }
      }
      select.simulate('change', event)
      const actions = store.getActions()
      expect(actions[0].type).toEqual(actionType.storeInfo.add)
    })
  })

  describe('<StoreLinkDetail />', () => {
    it('should render', () => {
      const store = mockStore({})
      const props = {
        storeId: 'store-id'
      }

      const mockEdit = jest.fn()
      const mockDelete = jest.fn()

      useReduxUpdatingInput.mockReturnValueOnce({
        value: {
          storeType: 'apple',
          url: 'url'
        },
        changeProperty: jest.fn(() => mockEdit),
        handleDelete: mockDelete
      })

      const wrapper = mountWithStore(<StoreLinkDetail {...props} />, store)

      const button = wrapper.find('button')
      expect(button.length).toBe(1)
      button.simulate('click')
      expect(mockDelete).toHaveBeenCalledTimes(1)
      const input = wrapper.find('input[type="text"]')
      expect(input.length).toBe(1)
      input.simulate('change')
      expect(mockEdit).toHaveBeenCalledTimes(1)
    })
  })
  describe('<StoreLinks />', () => {
    it('should render without items', () => {
      const store = mockStore({
        storeRefs: [],
        stores: {}
      })
      const wrapper = mountWithStore(<StoreLinks />, store)

      expect(wrapper.find('AddStoreLinkButton').length).toBe(1)
      expect(wrapper.find('StoreLinkDetail').length).toBe(0)
    })

    it('should render items', () => {
      const store1 = { id: '1', storeType: 'store1', url: 'https://url' }
      const store2 = { id: '2', storeType: 'store2', url: 'https://url' }
      const store3 = { id: '3', storeType: 'store3', url: 'https://url' }
      const storeRefs = ['1', '2', '3']
      const store = mockStore({
        storeRefs: storeRefs,
        stores: {
          '1': store1,
          '2': store2,
          '3': store3
        }
      })

      const mockEdit = jest.fn()
      const mockDelete = jest.fn()

      useReduxUpdatingInput
        .mockReturnValue({
          value: store1,
          changeProperty: jest.fn(() => mockEdit),
          handleDelete: mockDelete
        })
        .mockReturnValue({
          value: store2,
          changeProperty: jest.fn(() => mockEdit),
          handleDelete: mockDelete
        })
        .mockReturnValue({
          value: store3,
          changeProperty: jest.fn(() => mockEdit),
          handleDelete: mockDelete
        })

      const wrapper = mountWithStore(<StoreLinks />, store)

      expect(wrapper.find('AddStoreLinkButton').length).toBe(1)
      expect(wrapper.find('StoreLinkDetail').length).toBe(storeRefs.length)
    })
  })
})
