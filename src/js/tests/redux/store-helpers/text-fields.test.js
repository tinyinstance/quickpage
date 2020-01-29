import {
  textFieldActionCreator,
  textFieldReducer
} from '../../../redux/store-helpers/text-fields'

describe('Text field reducer', () => {
  it('should return default empty string', () => {
    const actionType = 'action_type'
    const reducer = textFieldReducer(actionType)
    expect(reducer(undefined, {})).toEqual('')
  })
})

describe('Text field action creator', () => {
  it('should return action for type', () => {
    const actionType = 'action_type'
    const expected = {
      type: actionType,
      payload: {
        text: 'Text'
      }
    }
    const action = textFieldActionCreator(actionType)('Text')
    expect(action).toEqual(expected)
  })
})
