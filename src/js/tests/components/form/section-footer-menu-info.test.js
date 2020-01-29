import React from 'react'

import { useReduxUpdatingInput } from '../../../components/common/hooks'
import { actionType } from '../../../redux/action-types'
import {
  InfoItemInput,
  InfoItemsList
} from '../../../components/form/section-footer-menu-info'
import { mountWithStore, mockStore } from '../../common'

// Mock
jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<SectionFooterMenuItems />', () => {
  describe('<InfoItemInput />', () => {
    it('should render and work', () => {
      const id = '1'
      const title = 'Title'
      const content = 'Content'
      const index = 0

      const mockEdit = jest.fn()
      const mockDelete = jest.fn()

      useReduxUpdatingInput.mockReturnValueOnce({
        value: {
          id: id,
          title: title,
          content: content
        },
        changeProperty: jest.fn(() => mockEdit),
        handleDelete: mockDelete
      })

      const wrapper = mountWithStore(
        <InfoItemInput id={id} index={index} />,
        mockStore({})
      )

      const button = wrapper.find('button')
      const textarea = wrapper.find('textarea')
      const input = wrapper.find('input')
      const label = wrapper.find('label')
      expect(button.length).toBe(1)
      expect(input.length).toBe(1)
      expect(textarea.length).toBe(1)
      expect(label.length).toBe(1)

      expect(input.prop('value')).toEqual(title)
      expect(textarea.text()).toEqual(content)
      expect(label.text()).toEqual('01')

      textarea.simulate('change')
      expect(mockEdit).toHaveBeenCalledTimes(1)
      input.simulate('change')
      expect(mockEdit).toHaveBeenCalledTimes(2)
      button.simulate('click')
      expect(mockDelete).toHaveBeenCalledTimes(1)
    })
  })

  describe('<InfoItemsList />', () => {
    it('should not render list', () => {
      const store = mockStore({
        otherRefs: [],
        others: {}
      })

      const wrapper = mountWithStore(<InfoItemsList />, store)
      expect(wrapper.find('InfoItemInput').length).toBe(0)
    })

    it('should render list', () => {
      const i1 = { id: '1', title: 'title1', content: 'url' }
      const i2 = { id: '2', title: 'title2', content: 'url' }
      const i3 = { id: '3', title: 'title3', content: 'url' }
      const otherRefs = ['1', '2', '3']
      const store = mockStore({
        otherRefs: otherRefs,
        others: {
          '1': i1,
          '2': i2,
          '3': i3
        }
      })

      useReduxUpdatingInput
        .mockReturnValueOnce({
          value: i1,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })
        .mockReturnValueOnce({
          value: i2,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })
        .mockReturnValueOnce({
          value: i3,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })

      const wrapper = mountWithStore(<InfoItemsList />, store)
      expect(wrapper.find('InfoItemInput').length).toBe(otherRefs.length)
    })
  })
})
