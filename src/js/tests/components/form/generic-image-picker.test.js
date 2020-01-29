import React from 'react'
import {
  ImageInput,
  ImageThumbnail,
  ImagePicker
} from '../../../components/form/generic-image-picker'
import { useImageSelector } from '../../../components/common/hooks'
import { mountWithStore, mockStore } from '../../common'
import imageDB from '../../../pouchDB/imageDB'

jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<ImageInput />', () => {
  describe('<ImageThumbnail />', () => {
    it('should not render', () => {
      const imageData = {
        file: null,
        id: null,
        name: null
      }

      // Mocks
      useImageSelector.mockReturnValueOnce(imageData)
      const mockSelector = jest.fn()
      const mockRemove = jest.fn()

      const wrapper = mountWithStore(
        <ImageThumbnail selector={mockSelector} removeAction={mockRemove} />,
        mockStore({})
      )

      expect(useImageSelector).toHaveBeenCalledTimes(1)
      expect(wrapper.find('img').length).toEqual(0)
      expect(wrapper.find('button').length).toEqual(0)
    })

    it('should render', () => {
      const filename = 'filename.jpg'
      const fileID = '1'
      const file = new File(['image_data'], filename)
      const imageData = {
        file: file,
        id: fileID,
        name: filename
      }

      // Mocks
      URL.createObjectURL = jest.fn(file => '/' + file.name)
      useImageSelector.mockReturnValueOnce(imageData)
      imageDB.remove.mockReturnValueOnce(Promise.resolve(true))
      const mockSelector = jest.fn()
      const mockRemove = jest.fn()

      const wrapper = mountWithStore(
        <ImageThumbnail selector={mockSelector} removeAction={mockRemove} />,
        mockStore({})
      )

      expect(useImageSelector).toHaveBeenCalledTimes(1)
      expect(wrapper.find('button').length).toEqual(1)
      wrapper.find('button').simulate('click')
      expect(imageDB.remove).toHaveBeenCalledTimes(1)
    })
  })

  describe('<ImagePicker />', () => {
    it('should render', () => {
      const mockSet = jest.fn()
      const wrapper = mountWithStore(
        <ImagePicker title="some title" setAction={mockSet} />,
        mockStore({})
      )

      expect(wrapper.find('input[type="file"]').length).toEqual(1)
      const button = wrapper.find('button').simulate('click')
      expect(button.length).toEqual(1)
    })
  })

  describe('<ImageInput />', () => {
    it('should render <ImagePicker />', () => {
      const mockSelector = jest.fn()
      const wrapper = mountWithStore(
        <ImageInput
          selector={mockSelector}
          label="dummy"
          setAction={jest.fn()}
          removeAction={jest.fn()}
        />,
        mockStore({})
      )
      expect(wrapper.find('ImagePicker').length).toEqual(1)
    })

    it('should render <ImageNameDisplay />', () => {
      const filename = 'filename.jpg'
      const fileID = '1'
      const file = new File(['image_data'], filename)
      const imageData = {
        file: file,
        id: fileID,
        name: filename
      }
      const store = mockStore({
        test: { id: fileID, name: filename }
      })

      // Mocks
      useImageSelector.mockReturnValueOnce(imageData)
      imageDB.remove.mockReturnValueOnce(Promise.resolve(true))
      const mockSelector = state => state.test
      const wrapper = mountWithStore(
        <ImageInput
          selector={mockSelector}
          label="dummy"
          setAction={jest.fn()}
          removeAction={jest.fn()}
        />,
        store
      )
      expect(wrapper.find('ImageNameDisplay').length).toEqual(1)
    })
  })
})
