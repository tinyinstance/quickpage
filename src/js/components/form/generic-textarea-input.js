import React from 'react'
import PropTypes from 'prop-types'

import { useTextInput, useResizingTextarea } from '../common/hooks'

/**
 * Creates a generic auto-resizing textarea field which updates the redux
 * store on change, using the specified action and selector.
 *
 * @param {func, func, string, string} param0 props
 */
export const TextAreaInput = ({ selector, action, label, placeholder }) => {
  const textareaRef = useResizingTextarea()
  const inputValue = useTextInput(selector, action)

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <div className="field-wrapper">
        <textarea
          type="text"
          rows="1"
          ref={textareaRef}
          placeholder={placeholder}
          {...inputValue}
        />
      </div>
    </div>
  )
}

/**
 *
 * TextAreaInput props:
 *
 * - action:      Redux action creator
 * - selector:    Redux store selector
 * - label:       Label for the input field
 * - placeholder: Placeholder string for the input field
 */
TextAreaInput.propTypes = {
  selector: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}
