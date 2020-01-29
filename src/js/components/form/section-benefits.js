import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import CollapsableSection from './collapsable-section'
import {
  addBenefit,
  editBenefit,
  deleteBenefit
} from '../../redux/store-helpers/benefits'
import generateGuid from '../../redux/common'
import { useResizingTextarea, useReduxUpdatingInput } from '../common/hooks'
import { deleteSVG } from '../common/fa-svg'
import imageDB from '../../pouchDB/imageDB'

export const BenefitImageInput = ({ benefit }) => {
  const fileInputRef = React.useRef(null)

  const triggerFileSelect = () => fileInputRef.current.click()

  const dispatch = useDispatch()

  const handleSelect = () => {
    if (event.target.files.length > 0) {
      let file = event.target.files[0]
      imageDB.save(file).then(({ id, name }) => {
        let image = { id: id, name: name }
        return dispatch(
          editBenefit(
            benefit.id,
            benefit.title,
            benefit.content,
            benefit.position,
            image
          )
        )
      })
    }
  }

  const handleDelete = () => {
    imageDB
      .remove(benefit.image.id)
      .then(() =>
        dispatch(
          editBenefit(
            benefit.id,
            benefit.title,
            benefit.content,
            benefit.position,
            {}
          )
        )
      )
  }

  if (benefit.image.id == null)
    return (
      <div>
        <button data-test="add-button" onClick={triggerFileSelect}>
          Add image
          <input
            className="image-picker-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelect}
          />
        </button>
      </div>
    )
  return (
    <div className="form-image">
      <button
        data-test="delete-button"
        className="delete-button"
        onClick={handleDelete}
      >
        {deleteSVG}
      </button>
      <span data-test="image-title">{benefit.image.name}</span>
    </div>
  )
}

BenefitImageInput.propTypes = {
  benefit: PropTypes.object
}

export const SingleBenefitInput = ({ id, index }) => {
  const benefit = useReduxUpdatingInput(
    state => state.benefits[id],
    editBenefit,
    deleteBenefit
  )

  const textareaRef = useResizingTextarea()

  const updatePosition = value => benefit.editProperty('position')(value)

  const positions = ['tl', 'tc', 'tr', 'cl', '.', 'cr', 'bl', 'bc', 'br']

  const positionPicker = positions.map((name, index) => {
    if (name == '.') {
      return <div key={index} className="picker-base empty"></div>
    }
    return (
      <div
        className={
          'picker-base picker ' +
          name +
          ' ' +
          (benefit.value.position == name ? 'active' : '')
        }
        onClick={() => updatePosition(name)}
        key={index}
      ></div>
    )
  })

  return (
    <div className="input-wrapper">
      <label>{index + 1 < 10 ? '0' + (index + 1) : index}</label>
      <div className="field-wrapper-sm">
        <input
          type="text"
          value={benefit.value.title}
          placeholder="Benefit title"
          onChange={benefit.changeProperty('title')}
        />
        <textarea
          rows="1"
          type="text"
          ref={textareaRef}
          value={benefit.value.content}
          placeholder="Benefit explanation"
          onChange={benefit.changeProperty('content')}
        />
        <div className="image-and-position">
          <div className="position-picker">{positionPicker}</div>
          <BenefitImageInput benefit={benefit.value} />
        </div>

        <button data-test="delete-benefit" onClick={benefit.handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

SingleBenefitInput.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

/**
 *  Component to add or update app benefit information
 */
export const BenefitsInputList = () => {
  const benefitRefs = useSelector(state => state.benefitRefs)

  const dispatch = useDispatch()

  const benefits = benefitRefs.map((id, index) => (
    <SingleBenefitInput key={id} index={index} id={id} />
  ))

  const handleAdd = () => {
    let action = addBenefit(generateGuid(), '', '', 'cl', {})
    dispatch(action)
  }

  return (
    <div className="input-wrapper">
      <button data-test="add-benefit" onClick={handleAdd}>
        Add app benefit
      </button>
      {benefits}
    </div>
  )
}

/**
 * Form app benefits sections
 */
export const SectionBenefits = () => (
  <CollapsableSection
    id="section-benefits"
    title="Benefits"
    infoMsg="Explain the benefits of using your app. Each benefit will be displayed in a new section."
  >
    <BenefitsInputList />
  </CollapsableSection>
)
