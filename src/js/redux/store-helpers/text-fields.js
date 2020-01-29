import { actionType } from '../action-types'

// Generic action creator for text fields
export function textFieldActionCreator(actionType) {
  return text => {
    return {
      type: actionType,
      payload: {
        text: text
      }
    }
  }
}

// Generic reducer creator for text fields
export function textFieldReducer(actionType) {
  return (state = '', action) => {
    if (action.type == actionType) return action.payload.text
    else if (action.type == 'RESET_FORM') return ''
    return state
  }
}

// Action creators
export const setName = textFieldActionCreator(actionType.name.set)
export const setTagline = textFieldActionCreator(actionType.tagline.set)
export const setDescription = textFieldActionCreator(actionType.description.set)
export const setFooterCopy = textFieldActionCreator(actionType.footerCopy.set)
export const setContact = textFieldActionCreator(actionType.contact.set)
export const setVideoURL = textFieldActionCreator(actionType.videoURL.set)
export const setMetaTitle = textFieldActionCreator(actionType.seo.metaTitle.set)
export const setMetaDescription = textFieldActionCreator(
  actionType.seo.metaDescription.set
)

// Reducers
export const nameReducer = textFieldReducer(actionType.name.set)
export const taglineReducer = textFieldReducer(actionType.tagline.set)
export const descriptionReducer = textFieldReducer(actionType.description.set)
export const footerCopyReducer = textFieldReducer(actionType.footerCopy.set)
export const contactReducer = textFieldReducer(actionType.contact.set)
export const videoURLReducer = textFieldReducer(actionType.videoURL.set)
export const metaTitleReducer = textFieldReducer(actionType.seo.metaTitle.set)
export const metaDescriptionReducer = textFieldReducer(
  actionType.seo.metaDescription.set
)
