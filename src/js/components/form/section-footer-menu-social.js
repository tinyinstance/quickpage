import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import CollapsableSection from './collapsable-section'
import {
  addSocial,
  editSocial,
  deleteSocial
} from '../../redux/store-helpers/social'
import generateGuid from '../../redux/common'
import { useReduxUpdatingInput } from '../common/hooks'

/**
 * Component to display, edit single social item details
 *
 * @param {string, number} param0 props
 */
export const SocialItemInput = ({ id, index }) => {
  const social = useReduxUpdatingInput(
    state => state.socials[id],
    editSocial,
    deleteSocial
  )

  return (
    <div className="input-wrapper">
      <label>{index + 1 < 10 ? '0' + (index + 1) : index}</label>
      <div className="field-wrapper-sm">
        <input
          type="text"
          data-test="title-input"
          value={social.value.title}
          placeholder="Menu title"
          onChange={social.changeProperty('title')}
        />
        <input
          type="text"
          data-test="url-input"
          value={social.value.url}
          placeholder="Social media url"
          onChange={social.changeProperty('url')}
        />
        <button onClick={social.handleDelete}>Delete</button>
      </div>
    </div>
  )
}

SocialItemInput.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

/**
 * Component to list social item details
 */
export const SocialItemsList = () => {
  const socialRefs = useSelector(state => state.socialRefs)
  const socialItems = socialRefs.map((id, index) => (
    <SocialItemInput key={id} index={index} id={id} />
  ))

  const dispatch = useDispatch()

  const handleAddSocial = () => {
    let action = addSocial(generateGuid(), '', '')
    dispatch(action)
  }

  return (
    <div className="input-wrapper">
      <button data-test="add-social" onClick={handleAddSocial}>
        Add social media link
      </button>
      {socialItems}
    </div>
  )
}

/**
 * Form footer menu social
 */
export const SectionFooterMenuSocialLinks = () => (
  <CollapsableSection
    id="section-footer-menu-social"
    title="Footer Menu Social"
  >
    <SocialItemsList />
  </CollapsableSection>
)
