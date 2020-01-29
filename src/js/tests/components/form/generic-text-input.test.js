import React from 'react'
import { shallow } from 'enzyme'

import { TextInput } from '../../../components/form/generic-text-input'
import { useTextInput } from '../../../components/common/hooks'

jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<TextInput />', () => {
  it('should work', () => {
    const labelText = 'Dummy Label'
    const placeholderText = 'Dummy Placeholder'
    const value = 'Dummy Value'
    const props = {
      selector: jest.fn(),
      action: jest.fn(),
      label: labelText,
      placeholder: placeholderText
    }

    const mockOnChange = jest.fn()
    useTextInput.mockReturnValueOnce({
      value: value,
      onChange: mockOnChange
    })
    const wrapper = shallow(<TextInput {...props} />)

    expect(wrapper.find('label').text()).toEqual(labelText)

    const input = wrapper.find('input[type="text"]')
    expect(input.length).toBe(1)
    expect(input.prop('placeholder')).toEqual(placeholderText)
    expect(input.prop('value')).toEqual(value)

    input.simulate('change')
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })
})
