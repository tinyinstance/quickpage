import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import CollapsableSection from './collapsable-section'
import {
  addInfoItem,
  editInfoItem,
  deleteInfoItem
} from '../../redux/store-helpers/footer-info'
import generateGuid from '../../redux/common'
import { useResizingTextarea, useReduxUpdatingInput } from '../common/hooks'

/**
 * Component to display, edit single info item details
 *
 * @param {string, number} param0 props
 */
export const InfoItemInput = ({ id, index }) => {
  const otherInput = useReduxUpdatingInput(
    state => state.others[id],
    editInfoItem,
    deleteInfoItem
  )

  const textareaRef = useResizingTextarea(590)

  return (
    <div className="input-wrapper">
      <label>{index + 1 < 10 ? '0' + (index + 1) : index}</label>
      <div className="field-wrapper-sm">
        <input
          type="text"
          placeholder="Menu title"
          value={otherInput.value.title}
          onChange={otherInput.changeProperty('title')}
        />
        <textarea
          ref={textareaRef}
          type="text"
          rows="1"
          placeholder="Info text (can be markdown)"
          value={otherInput.value.content}
          onChange={otherInput.changeProperty('content')}
        />
        <button onClick={otherInput.handleDelete}>Delete</button>
      </div>
    </div>
  )
}

InfoItemInput.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

/**
 * Component to list info item details
 */
export const InfoItemsList = () => {
  const otherRefs = useSelector(state => state.otherRefs)

  const infoItems = otherRefs.map((id, index) => (
    <InfoItemInput key={id} index={index} id={id} />
  ))
  const dispatch = useDispatch()

  const handleAddInfo = () => {
    let action = addInfoItem(generateGuid(), '', '')
    dispatch(action)
  }

  return (
    <div className="input-wrapper">
      <button data-test="add-social" onClick={handleAddInfo}>
        Add info link
      </button>
      {infoItems}
    </div>
  )
}

/**
 * Form footer menu info section
 */
export const SectionFooterMenuInfoItems = () => (
  <CollapsableSection
    id="section-footer-menu-info"
    title="Footer Menu Info"
    infoMsg="Add other information (like privacy, disclaimer etc.) to footer menu. They can be markdown, and will be displayed in a modal window."
  >
    <InfoItemsList />
  </CollapsableSection>
)
