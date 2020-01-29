import { actionType } from '../action-types'

// Action creators
export function setIcon(id, name) {
  return {
    type: actionType.icon.set,
    payload: {
      id: id,
      name: name
    }
  }
}

export function removeIcon() {
  return {
    type: actionType.icon.set,
    payload: null
  }
}

// Reducer
export const iconReducer = (state = null, action) => {
  if (action.type == actionType.icon.set) return action.payload
  else if (action.type == 'RESET_FORM') return null
  return state
}
