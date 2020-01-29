import {
  iconReducer,
  setIcon,
  removeIcon
} from '../../../redux/store-helpers/app-icon'

describe('App Icon Reducer', () => {
  it('should return default state', () => {
    const state = iconReducer(undefined, {})
    expect(state).toBeNull()
  })

  it('should return new state for set action', () => {
    const icon = { id: 'image-id', name: 'image name' }
    const action = setIcon(icon.id, icon.name)
    const state = iconReducer(undefined, action)
    expect(state).toEqual(icon)
  })

  it('should return null for remove action', () => {
    const prevState = { id: 'image-id', name: 'image name' }
    const state = iconReducer(prevState, removeIcon())
    expect(state).toBeNull()
  })
})
