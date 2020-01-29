import React from 'react'

import { actionType } from '../../../redux/action-types'
import {
  BenefitImageInput,
  SingleBenefitInput,
  BenefitsInputList
} from '../../../components/form/section-benefits'
import { useReduxUpdatingInput } from '../../../components/common/hooks'
import { mountWithStore, mockStore } from '../../common'

// Mock
jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<SectionBenefits />', () => {
  describe('<BenefitImageInput />', () => {
    it('should render add image button', () => {
      const b1 = {
        id: '1',
        title: 'benefit1',
        content: 'Content',
        position: 'left',
        image: {}
      }

      const store = mockStore({})
      const wrapper = mountWithStore(<BenefitImageInput benefit={b1} />, store)
      const button = wrapper.find('button')

      expect(button.length).toBe(1)
      expect(wrapper.find('input[type="file"]').length).toEqual(1)
    })

    it('should render image name and delete button', () => {
      const b1 = {
        id: '1',
        title: 'benefit1',
        content: 'Content',
        position: 'left',
        image: { name: 'some_image.png', id: 'image1' }
      }

      const store = mockStore({})
      const wrapper = mountWithStore(<BenefitImageInput benefit={b1} />, store)
      const button = wrapper.find('[data-test="delete-button"]')
      const name = wrapper.find('[data-test="image-title"]')

      expect(button.length).toBe(1)
      expect(name.length).toBe(1)
      expect(name.text()).toEqual(b1.image.name)
    })
  })

  describe('<SingleBenefitInput />', () => {
    it('should render', () => {
      const id = '1'
      const title = 'Title'
      const content = 'Content'
      const position = 'left'
      const image = { name: 'image1', id: 'imageID1' }
      const index = 0

      const mockEdit = jest.fn()
      const mockDelete = jest.fn()

      useReduxUpdatingInput.mockReturnValueOnce({
        value: {
          id: id,
          title: title,
          content: content,
          position: position,
          image: image
        },
        changeProperty: jest.fn(() => mockEdit),
        handleDelete: mockDelete
      })

      const store = mockStore({})
      const wrapper = mountWithStore(
        <SingleBenefitInput id={id} index={index} />,
        store
      )

      const textarea = wrapper.find('textarea')
      const input = wrapper.find('input')
      const button = wrapper.find('[data-test="delete-benefit"]')
      const label = wrapper.find('label')

      expect(textarea.length).toBe(1)
      expect(textarea.text()).toEqual(content)
      expect(input.length).toBe(1)
      expect(input.prop('value')).toEqual(title)
      expect(label.length).toBe(1)
      expect(label.text()).toEqual('01')
      expect(button.length).toBe(1)

      input.simulate('change')
      expect(mockEdit).toHaveBeenCalledTimes(1)
      textarea.simulate('change')
      expect(mockEdit).toHaveBeenCalledTimes(2)
      button.simulate('click')
      expect(mockDelete).toHaveBeenCalledTimes(1)
    })
  })

  describe('<BenefitsInputList />', () => {
    it('should not render list', () => {
      const store = mockStore({
        benefitRefs: [],
        benefits: {}
      })
      const wrapper = mountWithStore(<BenefitsInputList />, store)

      expect(wrapper.find('[data-test="add-benefit"]').length).toBe(1)
      expect(wrapper.find('SingleBenefitInput').length).toBe(0)
    })

    it('should render benefits list and work', () => {
      const b1 = {
        id: '1',
        title: 'benefit1',
        content: 'Content',
        position: 'left',
        image: {}
      }
      const b2 = {
        id: '2',
        title: 'benefit2',
        content: 'Content',
        position: 'left',
        image: {}
      }
      const b3 = {
        id: '3',
        title: 'benefit3',
        content: 'Content',
        position: 'left',
        image: {}
      }
      const benefitRefs = ['1', '2', '3']
      const store = mockStore({
        benefitRefs: benefitRefs,
        benefits: {
          '1': b1,
          '2': b2,
          '3': b3
        }
      })

      useReduxUpdatingInput
        .mockReturnValue({
          value: b1,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })
        .mockReturnValue({
          value: b2,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })
        .mockReturnValue({
          value: b3,
          changeProperty: jest.fn(() => jest.fn()),
          handleDelete: jest.fn()
        })

      const wrapper = mountWithStore(<BenefitsInputList />, store)

      const addButton = wrapper.find('[data-test="add-benefit"]')
      expect(addButton.length).toBe(1)
      expect(wrapper.find('SingleBenefitInput').length).toBe(benefitRefs.length)

      addButton.simulate('click')
      const actions = store.getActions()
      expect(actions[0].type).toEqual(actionType.benefit.add)
    })
  })
})
