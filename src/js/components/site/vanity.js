import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useImage } from '../common/hooks'
import { createSelector } from 'reselect'

export const VanityItem = ({ id }) => {
  const vanity = useSelector(state => state.vanities[id])

  const image = vanity.image

  const imageFile = useImage(image.id, image.name)

  const src = () => URL.createObjectURL(imageFile)

  if (imageFile == null) return null
  return (
    <div className="vanity-item">
      <a href={vanity.url}>
        <img src={src()} />
      </a>
    </div>
  )
}

VanityItem.propTypes = {
  id: PropTypes.string
}

const VanityDisplay = () => {
  // Vanity entries with images
  const validVanityRefs = createSelector(
    state => state.vanities,
    vanities =>
      Object.keys(vanities).filter(id => vanities[id].image.id != null)
  )

  const vanityRefs = useSelector(validVanityRefs)

  const items = vanityRefs.map(id => <VanityItem key={id} id={id} />)

  if (vanityRefs.length == 0) return null
  return <section className="vanities container-xl">{items}</section>
}

export default VanityDisplay
