import React from 'react'

import { name } from '../common/constants'

/**
 * Intro section component for the form
 */
export const SectionIntro = () => {
  const introText =
    'Fill in the form and watch your site generate on the right side. \
        Download the generated site, and host anywhere!'

  return (
    <div className="form-section">
      <h2>Welcome to {name}!</h2>
      <p>{introText}</p>
    </div>
  )
}
