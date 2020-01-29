import { actionType } from '../action-types'

//  Action creators
// ---------------------------------------------
export function addVanity(id, image, url) {
  return {
    type: actionType.vanity.add,
    payload: {
      id: id,
      image: image,
      url: url
    }
  }
}

export function editVanity(id, image, url) {
  return {
    type: actionType.vanity.edit,
    payload: {
      id: id,
      image: image,
      url: url
    }
  }
}

export function deleteVanity(id) {
  return {
    type: actionType.vanity.delete,
    payload: {
      id: id
    }
  }
}

export function reorderVanity(id, toIndex) {
  return {
    type: actionType.vanity.reorder,
    payload: {
      id: id,
      toIndex: toIndex
    }
  }
}

//  Reducers
// ---------------------------------------------
export const vanityRefsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.vanity.add:
      return [...state, action.payload.id]
    case actionType.vanity.delete:
      return state.filter(id => id != action.payload.id)
    case 'RESET_FORM':
      return []
    default:
      return state
  }
}

// TODO - Implement reorder
export const vanityReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.vanity.add:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.vanity.edit:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.vanity.delete: {
      // eslint-disable-next-line no-unused-vars
      let { [action.payload.id]: deleted, ...remaining } = state
      return remaining
    }
    case 'RESET_FORM':
      return {}
    default:
      return state
  }
}
