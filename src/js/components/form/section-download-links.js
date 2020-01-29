import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import CollapsableSection from './collapsable-section'
import {
  addStoreInfo,
  deleteStoreInfo,
  editStoreInfo
} from '../../redux/store-helpers/store-links'
import generateGuid from '../../redux/common'
import { useReduxUpdatingInput } from '../common/hooks'

/**
 *  Component to display and edit store link information
 *
 * @param {string} param0 props
 */
export const StoreLinkDetail = ({ storeId }) => {
  const appStore = useReduxUpdatingInput(
    state => state.stores[storeId],
    editStoreInfo,
    deleteStoreInfo
  )

  return (
    <div className="input-wrapper form-store-link">
      <label>{appStore.value.storeType}</label>
      <div className="field-wrapper">
        <input
          type="text"
          placeholder="URL or empty for coming soon"
          value={appStore.value.url}
          onChange={appStore.changeProperty('url')}
        />
        <button data-test="delete-vanity" onClick={appStore.handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

StoreLinkDetail.propTypes = {
  storeId: PropTypes.string.isRequired
}

const addKey = '0'

export const storeOptions = {
  [addKey]: 'Add download link',
  apple: 'Apple App Store',
  google: 'Google Play Store',
  amazon: 'Kindle Fire Store',
  other: 'Other'
}

/**
 * Add store link button
 */
export const AddStoreLinkButton = () => {
  const dispatch = useDispatch()

  const selectRef = React.useRef(null)

  const options = Object.keys(storeOptions).map((key, index) => (
    <option key={index} value={key}>
      {storeOptions[key]}
    </option>
  ))

  const handleChange = event => {
    if (event.target.value == addKey) return
    let action = addStoreInfo(generateGuid(), event.target.value, '')
    dispatch(action)

    // Reset selection
    selectRef.current.value = addKey
  }

  return (
    <select ref={selectRef} className="store-options" onChange={handleChange}>
      {options}
    </select>
  )
}

/**
 * Component for updating download/store link information
 */
export const StoreLinks = () => {
  const storeRefs = useSelector(state => state.storeRefs)
  const items = storeRefs.map(id => <StoreLinkDetail key={id} storeId={id} />)

  return (
    <div className="input-wrapper">
      <AddStoreLinkButton />
      {items}
    </div>
  )
}

/**
 * Form download links section
 */
export const SectionDownloadLinks = () => (
  <CollapsableSection id="section-stores" title="Download Links">
    <StoreLinks />
  </CollapsableSection>
)
