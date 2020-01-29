import { actionType } from '../action-types'

//  (sync) action creators
// ---------------------------------------------
export function addInfoItem(id, title, content) {
  return {
    type: actionType.other.add,
    payload: {
      id: id,
      title: title,
      content: content
    }
  }
}

export function editInfoItem(id, title, content) {
  return {
    type: actionType.other.edit,
    payload: {
      id: id,
      title: title,
      content: content
    }
  }
}

export function deleteInfoItem(id) {
  return {
    type: actionType.other.delete,
    payload: {
      id: id
    }
  }
}

export function toggleShowBuildBy() {
  return {
    type: actionType.showBuildBy.toggle
  }
}

//  Reducers
// ---------------------------------------------
export const otherRefsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.other.add:
      return [...state, action.payload.id]
    case actionType.other.delete:
      return state.filter(id => id != action.payload.id)
    case 'RESET_FORM':
      return []
    default:
      return state
  }
}

export const othersReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.other.add:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.other.edit:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.other.delete: {
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

export const showBuildByReducer = (state = true, action) => {
  if (action.type == actionType.showBuildBy.toggle) return !state
  else if (action.type == 'RESET_FORM') return true
  return state
}
