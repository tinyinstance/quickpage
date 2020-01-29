import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import PropTypes from 'prop-types'

const showHeaderSeparatorSelector = createSelector(
  state => state.name.length > 0,
  state => state.tagline.length > 0,
  state => state.description.length > 0,
  state => state.storeRefs.length > 0,
  (nameExists, tagExists, descriptionExists, storeExists) =>
    nameExists || tagExists || descriptionExists || storeExists
)
export const HeaderSeparator = () => (
  <Separator showSelector={showHeaderSeparatorSelector} />
)

const showFooterSeparatorSelector = createSelector(
  state => state.contact.length > 0,
  state => state.otherRefs.length > 0,
  state => state.socialRefs.length > 0,
  state => state.footerCopy.length > 0,
  (hasContact, hasInfoItems, hasSocialLinks, hasFooterCopy) =>
    hasContact || hasInfoItems || hasSocialLinks || hasFooterCopy
)
export const FooterSeparator = () => {
  return <Separator showSelector={showFooterSeparatorSelector} />
}

export const HeroSeparator = () => {
  return <Separator showSelector={state => state.hero} />
}

export const Separator = ({ showSelector }) => {
  const show = useSelector(showSelector)

  if (!show) return null
  return <div data-test="separator" className="separator"></div>
}

Separator.propTypes = {
  showSelector: PropTypes.func.isRequired
}
