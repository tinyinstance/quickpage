import React from 'react'
import { useSelector } from 'react-redux'

import { useImageSelector } from '../common/hooks'

// App Icon
export const AppIcon = () => {
  const image = useImageSelector(state => state.icon)

  const src = () => URL.createObjectURL(image.file)

  if (image.file == null) return null
  return <img className="app-icon" data-image-name={image.name} src={src()} />
}

// App Name
export const AppName = () => {
  const appName = useSelector(state => state.name)

  if (appName.length == 0) return null
  return (
    <h1 data-test="app-name" className="app-name">
      {appName}
    </h1>
  )
}

// App tagline
export const AppTagLine = () => {
  const tagline = useSelector(state => state.tagline)

  if (tagline.length == 0) return null
  return (
    <span data-test="tagline" className="tagline">
      {tagline}
    </span>
  )
}

// App header section
const Header = () => {
  return (
    <header>
      <div className="container-md text-center">
        <AppIcon />
        <AppName />
      </div>
      <div className="container-sm text-center">
        <AppTagLine />
      </div>
    </header>
  )
}

export default Header
