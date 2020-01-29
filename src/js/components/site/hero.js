import React from 'react'

import { useImageSelector } from '../common/hooks'

// App Icon
const HeroImage = () => {
  const image = useImageSelector(state => state.hero)

  const src = () => URL.createObjectURL(image.file)

  if (image.file == null) return null
  return (
    <div className="hero-image container-xl">
      <img data-image-name={image.name} src={src()} />
    </div>
  )
}

export default HeroImage
