import React from 'react'

import Header, {
  AppIcon,
  AppName,
  AppTagLine
} from '../../../components/site/header'
import { mountWithStore, mockStore, findTestAttr } from '../../common'
import { useImageSelector } from '../../../components/common/hooks'

// Mock
jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<Header />', () => {
  const filename = 'filename.jpg'
  const mockState = {
    icon: { id: '1', name: filename },
    tagline: 'mock tagline',
    name: 'mock app name'
  }
  const file = new File(['image_data'], filename)
  const store = mockStore(mockState)

  describe('<AppIcon />', () => {
    it('should render', () => {
      // Mocks
      URL.createObjectURL = jest.fn(file => '/' + file.name)
      useImageSelector.mockReturnValueOnce({
        file: file,
        id: mockState.icon.id,
        name: mockState.icon.name
      })

      const wrapper = mountWithStore(<AppIcon />, store)
      expect(useImageSelector).toHaveBeenCalledTimes(1)
      expect(wrapper.find('img').length).toBe(1)
      expect(wrapper.find('img').prop('src')).toEqual('/' + filename)
    })

    it('should not render', () => {
      useImageSelector.mockReturnValueOnce({
        file: null,
        id: null,
        name: null
      })

      const wrapper = mountWithStore(<AppIcon />, store)
      expect(useImageSelector).toHaveBeenCalledTimes(1)
      expect(wrapper.find('img').length).toBe(0)
    })
  })

  describe('<AppName />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<AppName />, store)
      expect(findTestAttr(wrapper, 'app-name').length).toBe(1)
      expect(findTestAttr(wrapper, 'app-name').text()).toEqual(mockState.name)
    })

    it('should not render', () => {
      const wrapper = mountWithStore(<AppName />, mockStore({ name: '' }))
      expect(findTestAttr(wrapper, 'app-name').length).toBe(0)
    })
  })

  describe('<AppTagLine />', () => {
    it('should render', () => {
      const wrapper = mountWithStore(<AppTagLine />, store)
      expect(findTestAttr(wrapper, 'tagline').length).toBe(1)
      expect(findTestAttr(wrapper, 'tagline').text()).toEqual(mockState.tagline)
    })

    it('should not render', () => {
      const wrapper = mountWithStore(<AppTagLine />, mockStore({ tagline: '' }))
      expect(findTestAttr(wrapper, 'tagline').length).toBe(0)
    })
  })

  describe('<Header />', () => {
    it('should render', () => {
      // Mocks
      URL.createObjectURL = jest.fn(file => '/' + file.name)
      useImageSelector.mockReturnValueOnce({
        file: file,
        id: mockState.icon.id,
        name: mockState.icon.name
      })

      const wrapper = mountWithStore(<Header />, store)
      expect(wrapper.find('AppIcon').length).toBe(1)
      expect(wrapper.find('AppName').length).toBe(1)
      expect(wrapper.find('AppTagLine').length).toBe(1)
    })
  })
})
