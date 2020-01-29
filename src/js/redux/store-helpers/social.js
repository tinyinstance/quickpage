import { actionType } from '../action-types'

//  (sync) action creators
// ---------------------------------------------
export function addSocial(id, title, url) {
  return {
    type: actionType.social.add,
    payload: {
      id: id,
      title: title,
      url: url
    }
  }
}

export function editSocial(id, title, url) {
  return {
    type: actionType.social.edit,
    payload: {
      id: id,
      title: title,
      url: url
    }
  }
}

export function deleteSocial(id) {
  return {
    type: actionType.social.delete,
    payload: {
      id: id
    }
  }
}

export function reorderSocial(id, toIndex) {
  return {
    type: actionType.social.reorder,
    payload: {
      id: id,
      toIndex: toIndex
    }
  }
}

//  Reducers
// ---------------------------------------------
export const socialRefsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.social.add:
      return [...state, action.payload.id]
    case actionType.social.delete:
      return state.filter(id => id != action.payload.id)
    case 'RESET_FORM':
      return []
    default:
      return state
  }
}

// TODO Implement reorder
export const socialReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.social.add:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.social.edit:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.social.delete: {
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
