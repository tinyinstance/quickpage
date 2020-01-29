import { actionType } from '../action-types'

// Action creators
export function setHero(id, name) {
  return {
    type: actionType.hero.set,
    payload: {
      id: id,
      name: name
    }
  }
}

export function removeHero() {
  return {
    type: actionType.hero.set,
    payload: null
  }
}

// Reducer
export const heroReducer = (state = null, action) => {
  if (action.type == actionType.hero.set) return action.payload
  else if (action.type == 'RESET_FORM') return null
  return state
}
