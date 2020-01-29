import React from 'react'

import { useReduxUpdatingInput } from '../../../components/common/hooks'
import {
  SocialItemInput,
  SocialItemsList
} from '../../../components/form/section-footer-menu-social'
import { mountWithStore, mockStore } from '../../common'

// Mock
jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<SectionFooterMenuItems />', () => {
  describe('<SocialItemInput />', () => {
    it('should render and work', () => {
      const id = '1'
      const title = 'Title'
      const url = 'Url'
      const index = 0

      const mockEdit = jest.fn()
      const mockDelete = jest.fn()

      useReduxUpdatingInput.mockReturnValueOnce({
        value: {
          id: id,
          title: title,
          url: url
        },
        changeProperty: jest.fn(() => mockEdit),
        handleDelete: mockDelete
      })

      const wrapper = mountWithStore(
        <SocialItemInput id={id} index={index} />,
        mockStore({})
      )

      const button = wrapper.find('button')
      const titleInput = wrapper.find('[data-test="title-input"]')
      const urlInput = wrapper.find('[data-test="url-input"]')
      const label = wrapper.find('label')
      expect(button.length).toBe(1)
      expect(urlInput.length).toBe(1)
      expect(titleInput.length).toBe(1)
      expect(label.length).toBe(1)

      expect(titleInput.prop('value')).toEqual(title)
      expect(urlInput.prop('value')).toEqual(url)
      expect(label.text()).toEqual('01')

      titleInput.simulate('change')
      expect(mockEdit).toHaveBeenCalledTimes(1)
      urlInput.simulate('change')
      expect(mockEdit).toHaveBeenCalledTimes(2)
      button.simulate('click')
      expect(mockDelete).toHaveBeenCalledTimes(1)
    })
  })

  describe('<SocialItemsList />', () => {
    it('should not render list', () => {
      const store = mockStore({
        socialRefs: [],
        socials: {}
      })
      const wrapper = mountWithStore(<SocialItemsList />, store)
      expect(wrapper.find('SocialItemInput').length).toBe(0)
    })

    it('should render list', () => {
      const s1 = { id: '1', title: 'title1', url: 'url' }
      const s2 = { id: '2', title: 'title2', url: 'url' }
      const s3 = { id: '3', title: 'title3', url: 'url' }
      const socialRefs = ['1', '2', '3']
      const store = mockStore({
        socialRefs: socialRefs,
        social: {
          '1': s1,
          '2': s2,
          '3': s3
        }
      })

      useReduxUpdatingInput
        .mockReturnValueOnce({
          value: s1,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })
        .mockReturnValueOnce({
          value: s2,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })
        .mockReturnValueOnce({
          value: s3,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })

      const wrapper = mountWithStore(<SocialItemsList />, store)
      expect(wrapper.find('SocialItemInput').length).toBe(socialRefs.length)
    })
  })
})
