import { actionType } from '../action-types'

//  Action creators
// ---------------------------------------------
export function addBenefit(id, title, content, position, image) {
  return {
    type: actionType.benefit.add,
    payload: {
      id: id,
      title: title,
      content: content,
      position: position,
      image: image
    }
  }
}

export function editBenefit(id, title, content, position, image) {
  return {
    type: actionType.benefit.edit,
    payload: {
      id: id,
      title: title,
      content: content,
      position: position,
      image: image
    }
  }
}

export function deleteBenefit(id) {
  return {
    type: actionType.benefit.delete,
    payload: {
      id: id
    }
  }
}

export function reorderBenefit(id, toIndex) {
  return {
    type: actionType.benefit.reorder,
    payload: {
      id: id,
      toIndex: toIndex
    }
  }
}

//  Reducers
// ---------------------------------------------
export const benefitRefsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.benefit.add:
      return [...state, action.payload.id]
    case actionType.benefit.delete:
      return state.filter(id => id != action.payload.id)
    case 'RESET_FORM':
      return []
    default:
      return state
  }
}

// TODO - Implement reorder
export const benefitsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.benefit.add:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.benefit.edit:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.benefit.delete: {
      // eslint-disable-next-line no-unused-vars
      let { [action.payload.id]: deleted, ...remaining } = state
      return remaining
    }
    case 'RESET_FORM':
      return []
    default:
      return state
  }
}
