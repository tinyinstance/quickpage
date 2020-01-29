import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import CollapsableSection from './collapsable-section'

import {
  addVanity,
  deleteVanity,
  editVanity
} from '../../redux/store-helpers/vanity'
import { ImageInputWithoutWrapper } from './generic-image-picker'
import generateGuid from '../../redux/common'
import { useReduxUpdatingInput } from '../common/hooks'

/**
 *  Component to display and edit vanity link information
 *
 * @param {string} param0 props
 */
export const VanityLinkDetail = ({ vanityID, index }) => {
  const vanity = useReduxUpdatingInput(
    state => state.vanities[vanityID],
    editVanity,
    deleteVanity
  )
  const imageSelector = state => state.vanities[vanityID].image

  const setVanityImage = (id, name) => {
    return editVanity(vanityID, { id: id, name: name }, vanity.url)
  }

  const removeVanityImage = () => {
    return editVanity(vanityID, {}, vanity.url)
  }

  return (
    <React.Fragment>
      <div className="input-wrapper form-store-link">
        <label>{index + 1 < 10 ? '0' + (index + 1) : index}</label>
        <ImageInputWithoutWrapper
          selector={imageSelector}
          label=""
          setAction={setVanityImage}
          removeAction={removeVanityImage}
        />
        <div className="field-wrapper">
          <input
            type="text"
            placeholder="URL link (optional)"
            value={vanity.url}
            onChange={vanity.changeProperty('url')}
          />
          <button data-test="delete-vanity" onClick={vanity.handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

VanityLinkDetail.propTypes = {
  vanityID: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

/**
 * Component for updating vanity link information
 */
export const VanityLinks = () => {
  const vanityRefs = useSelector(state => state.vanityRefs)

  const items = vanityRefs.map((id, index) => (
    <VanityLinkDetail key={id} vanityID={id} index={index} />
  ))

  const dispatch = useDispatch()

  const handleAdd = () => {
    let action = addVanity(generateGuid(), {}, '')
    dispatch(action)
  }

  return (
    <div className="input-wrapper">
      <button data-test="add-vanity" onClick={handleAdd}>
        Add vanity image
      </button>
      {items}
    </div>
  )
}

/**
 * Form download links section
 */
export const SectionVanityLinks = () => (
  <CollapsableSection
    id="section-vanity"
    title="Vanity"
    infoMsg="Add vanity images and links. For example Product Hunt badge, seen on Financial Times logo etc."
  >
    <VanityLinks />
  </CollapsableSection>
)
