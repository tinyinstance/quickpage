import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { HeaderSeparator } from './separator'
import { playSVG } from '../common/fa-svg'

const videoOverlayElementId = 'video-overlay'

export const VideoOverlay = ({ src }) => {
  const embed = () => {
    return {
      __html: src
    }
  }

  // TODO: video stop playing
  return (
    <div id={videoOverlayElementId} className="overlay">
      <a href="#" className="close-overlay"></a>
      <div data-test="iframe" dangerouslySetInnerHTML={embed()}></div>
    </div>
  )
}

VideoOverlay.propTypes = {
  src: PropTypes.string.isRequired
}

const PlayButtonOrSeparator = () => {
  const videoURL = useSelector(state => state.videoURL)

  if (videoURL.length == 0) return <HeaderSeparator />

  return (
    <div className="play">
      <a href={'#' + videoOverlayElementId}>{playSVG}</a>
      <VideoOverlay src={videoURL} />
    </div>
  )
}

export default PlayButtonOrSeparator
