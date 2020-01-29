import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CollapsableSection from './collapsable-section'
import { TextInput } from './generic-text-input'
import { TextAreaInput } from './generic-textarea-input'
import { toggleShowBuildBy } from '../../redux/store-helpers/footer-info'
import {
  setContact,
  setFooterCopy
} from '../../redux/store-helpers/text-fields'
import { checkSVG, squareSVG } from '../common/fa-svg'
import { name } from '../common/constants'

/**
 * Toggle component to show/hide build with QuickPage message in the footer
 */
export const BuildWithDisplay = () => {
  const show = useSelector(state => state.showBuildBy)

  const dispatch = useDispatch()

  const toggle = () => dispatch(toggleShowBuildBy())

  if (show) {
    return (
      <div className="input-wrapper">
        <label>Build with</label>
        <div className="build-with field-wrapper">
          <p data-test="showing">
            <button onClick={toggle}>{checkSVG}</button>
            Displaying build with {name} message (Thank you!){' '}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="input-wrapper">
      <label>Build with</label>
      <div className="build-with field-wrapper">
        <p data-test="hiding">
          <button onClick={toggle}>{squareSVG}</button>
          Hiding build with {name} message{' '}
        </p>
      </div>
    </div>
  )
}

/**
 * Form footer info section
 */
export const SectionFooterInfo = () => (
  <CollapsableSection id="section-footer-info" title="Footer">
    <TextInput
      label="Contact"
      placeholder="contact@example.com"
      action={setContact}
      selector={state => state.contact}
    />
    <TextAreaInput
      label="Copy"
      placeholder="e.g. Copyright 2019"
      action={setFooterCopy}
      selector={state => state.footerCopy}
    />
    <BuildWithDisplay />
  </CollapsableSection>
)
