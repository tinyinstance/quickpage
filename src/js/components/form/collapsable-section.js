import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { toggleCollapse, toggleInfo } from '../../redux/store-helpers/ui'
import { infoSVG } from '../common/fa-svg'

const CollapsableSection = ({ id, title, infoMsg, children }) => {
  const collapsedSections = useSelector(state => state.ui.collapsed)
  const shownInfo = useSelector(state => state.ui.info)
  const dispatch = useDispatch()

  const sectionIsNotCollapsed = () => !collapsedSections.includes(id)
  const infoIsShown = () => shownInfo.includes(id)

  const handleCollapse = () => {
    if (id) dispatch(toggleCollapse(id))
  }

  const handleToggle = e => {
    if (sectionIsNotCollapsed()) e.stopPropagation()
    else if (!sectionIsNotCollapsed() && infoIsShown()) return

    if (id) dispatch(toggleInfo(id))
  }

  const infoBox = infoIsShown() ? (
    <div className="info-box" data-test="info-box">
      <p>{infoMsg}</p>
    </div>
  ) : null

  const infoIcon = infoMsg ? (
    <a className="info-icon" onClick={handleToggle}>
      {infoSVG}
    </a>
  ) : null

  return (
    <div className="form-section">
      <div onClick={handleCollapse} className="section-header">
        <span>{sectionIsNotCollapsed() ? '-' : '+'}</span>
        <h3>
          {title}
          {infoIcon}
        </h3>
      </div>

      {sectionIsNotCollapsed() ? infoBox : null}
      {sectionIsNotCollapsed() ? children : null}
    </div>
  )
}

CollapsableSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  infoMsg: PropTypes.string,
  children: PropTypes.node
}

export default CollapsableSection
