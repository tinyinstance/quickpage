import React from 'react'
import { shallow } from 'enzyme'

import { TextAreaInput } from '../../../components/form/generic-textarea-input'
import { useTextInput } from '../../../components/common/hooks'

jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})
describe('<TextAreaInput />', () => {
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
    const wrapper = shallow(<TextAreaInput {...props} />)

    expect(wrapper.find('label').text()).toEqual(labelText)

    const textarea = wrapper.find('textarea')
    expect(textarea.length).toBe(1)
    expect(textarea.prop('placeholder')).toEqual(placeholderText)
    expect(textarea.prop('value')).toEqual(value)

    textarea.simulate('change')
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })
})
