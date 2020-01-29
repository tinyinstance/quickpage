import { actionType } from '../action-types'

//  Action creators
export function addStoreInfo(id, storeType, url) {
  return {
    type: actionType.storeInfo.add,
    payload: {
      id: id,
      storeType: storeType,
      url: url
    }
  }
}

export function editStoreInfo(id, storeType, url) {
  return {
    type: actionType.storeInfo.edit,
    payload: {
      id: id,
      storeType: storeType,
      url: url
    }
  }
}

export function deleteStoreInfo(id) {
  return {
    type: actionType.storeInfo.delete,
    payload: {
      id: id
    }
  }
}

export function reorderStoreInfo(id, toIndex) {
  return {
    type: actionType.storeInfo.reorder,
    payload: {
      id: id,
      toIndex: toIndex
    }
  }
}

//  Reducers
export const storeRefsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.storeInfo.add:
      return [...state, action.payload.id]
    case actionType.storeInfo.delete:
      return state.filter(id => id != action.payload.id)
    case 'RESET_FORM':
      return []
    default:
      return state
  }
}

export const storesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.storeInfo.add:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.storeInfo.edit:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      })
    case actionType.storeInfo.delete: {
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
