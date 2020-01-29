import React from 'react'
import PropTypes from 'prop-types'

import { useTextInput } from '../common/hooks'

/**
 * A generic one line text input field which updates the redux store on change,
 * using the specified action and selector.
 *
 * @param {func, func, string, string} param0 props
 */
export const TextInput = ({ selector, action, label, placeholder }) => {
  const inputValue = useTextInput(selector, action)

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <div className="field-wrapper">
        <input type="text" placeholder={placeholder} {...inputValue} />
      </div>
    </div>
  )
}

/**
 *
 * InputText props:
 *
 * - action:      Redux action creator
 * - selector:    Redux store selector
 * - label:       Label for the input field
 * - placeholder: Placeholder string for the input field
 */
TextInput.propTypes = {
  selector: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}
