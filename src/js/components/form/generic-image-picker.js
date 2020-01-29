import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import imageDB from '../../pouchDB/imageDB'
import { useImageSelector } from '../common/hooks'
import { deleteSVG } from '../common/fa-svg'

/**
 * Thumbnail display for image
 */
export const ImageThumbnail = ({ selector, removeAction }) => {
  const image = useImageSelector(selector)

  const dispatch = useDispatch()

  const removeImage = () => {
    imageDB.remove(image.id).then(() => dispatch(removeAction()))
  }

  const src = () => URL.createObjectURL(image.file)

  if (image.file == null) return null
  return (
    <div className="field-wrapper">
      <div className="selected-image">
        <img src={src()} />
        <button className="remove-image" onClick={removeImage}>
          Remove
        </button>
      </div>
    </div>
  )
}

ImageThumbnail.propTypes = {
  selector: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired
}

/**
 * String display for image
 */
export const ImageNameDisplay = ({ selector, removeAction }) => {
  const image = useImageSelector(selector)

  const dispatch = useDispatch()

  const removeImage = () => {
    imageDB.remove(image.id).then(() => dispatch(removeAction()))
  }

  if (image.file == null) return null
  return (
    <div className="field-wrapper form-image">
      <button
        data-test="delete-button"
        className="delete-button"
        onClick={removeImage}
      >
        {deleteSVG}
      </button>
      <span data-test="image-title">{image.name}</span>
    </div>
  )
}

ImageNameDisplay.propTypes = {
  selector: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired
}

/**
 * Single file image picker
 *
 * @param {{string, }} param0 props
 */
export const ImagePicker = ({ title, setAction }) => {
  const fileInputRef = React.useRef(null)

  const triggerFileSelect = () => fileInputRef.current.click()

  const dispatch = useDispatch()

  const handleSelect = event => {
    if (event.target.files.length > 0) {
      let file = event.target.files[0]
      imageDB.save(file).then(({ id, name }) => dispatch(setAction(id, name)))
    }
  }

  return (
    <div className="field-wrapper picker-button">
      <button onClick={triggerFileSelect}>{title}</button>
      <input
        className="image-picker-input"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleSelect}
      />
    </div>
  )
}

ImagePicker.propTypes = {
  title: PropTypes.string.isRequired,
  setAction: PropTypes.func.isRequired
}

/**
 * Component for selecting and deleting single image
 */
export const ImageInput = ({ selector, label, setAction, removeAction }) => {
  const imageInfo = useSelector(selector)

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      {imageInfo == null || imageInfo.id == null ? (
        <ImagePicker title="Select image" setAction={setAction} />
      ) : (
        <ImageNameDisplay selector={selector} removeAction={removeAction} />
      )}
    </div>
  )
}

ImageInput.propTypes = {
  selector: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  setAction: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired
}

export const ImageInputWithoutWrapper = ({
  selector,
  setAction,
  removeAction
}) => {
  const imageInfo = useSelector(selector)

  return (
    <React.Fragment>
      {imageInfo == null || imageInfo.id == null ? (
        <ImagePicker title="Select image" setAction={setAction} />
      ) : (
        <ImageNameDisplay selector={selector} removeAction={removeAction} />
      )}
    </React.Fragment>
  )
}

ImageInputWithoutWrapper.propTypes = {
  selector: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  setAction: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired
}
