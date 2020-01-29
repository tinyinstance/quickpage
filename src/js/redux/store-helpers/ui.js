import { actionType } from '../action-types'

// Action creators
export function toggleIsHome() {
  return {
    type: actionType.ui.isHome.toggle
  }
}

export function toggleDrawer() {
  return {
    type: actionType.ui.drawer.toggle
  }
}

export function toggleCollapse(id) {
  return {
    type: actionType.ui.collapsed.toggle,
    payload: {
      id: id
    }
  }
}

export function toggleInfo(id) {
  return {
    type: actionType.ui.info.toggle,
    payload: {
      id: id
    }
  }
}

export function setZipProgress(isProcessing) {
  return {
    type: actionType.ui.zip.inProgress,
    payload: isProcessing
  }
}

// Reducers
export const isHomeReducer = (state = true, action) => {
  if (action.type == actionType.ui.isHome.toggle) {
    return !state
  } else if (action.type == 'RESET_FORM') return false
  return state
}

export const drawerReducer = (state = true, action) => {
  if (action.type == actionType.ui.drawer.toggle) return !state
  else if (action.type == 'RESET_FORM') return true
  return state
}

export const collapsedSectionReducer = (state = [], action) => {
  if (action.type == actionType.ui.collapsed.toggle) {
    if (state.includes(action.payload.id)) {
      return state.filter(id => id != action.payload.id)
    }
    return [...state, action.payload.id]
  } else if (action.type == 'RESET_FORM') return []
  return state
}

export const infoDisplayReducer = (state = [], action) => {
  if (action.type == actionType.ui.info.toggle) {
    if (state.includes(action.payload.id)) {
      return state.filter(id => id != action.payload.id)
    }
    return [...state, action.payload.id]
  } else if (action.type == 'RESET_FORM') return []
  return state
}

export const zipProgressReducer = (state = false, action) => {
  if (action.type == actionType.ui.zip.inProgress) return action.payload
  else if (action.type == 'RESET_FORM') return false
  return state
}
