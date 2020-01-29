import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { storeSVG } from '../common/fa-svg'

export const nameForStore = storeType => {
  switch (storeType) {
    case 'apple':
      return 'App Store'
    case 'google':
      return 'Google Play'
    case 'amazon':
      return 'Kindle Fire'
    default:
      return 'Other Store'
  }
}

export const StoreLink = ({ storeId }) => {
  const store = useSelector(state => state.stores[storeId])

  const soon = (
    <a data-test="soon" className={'soon ' + store.storeType}>
      {storeSVG(store.storeType)}
      Coming Soon
    </a>
  )

  const available = (
    <a
      data-test="available"
      className="available"
      href={store.url}
      rel="noreferrer noopener"
      target="_blank"
    >
      {storeSVG(store.storeType)}
      {nameForStore(store.storeType)}
    </a>
  )

  return <li className="store">{store.url.length > 0 ? available : soon}</li>
}

StoreLink.propTypes = {
  storeId: PropTypes.string.isRequired
}

const StoreLinks = () => {
  const storeRefs = useSelector(state => state.storeRefs)

  const items = storeRefs.map(id => <StoreLink key={id} storeId={id} />)

  if (storeRefs.length == 0) return null
  return (
    <section className="download-links">
      <div className="container text-center">
        <ul className="stores">{items}</ul>
      </div>
    </section>
  )
}

export default StoreLinks
