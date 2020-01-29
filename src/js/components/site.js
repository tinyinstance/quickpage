import React from 'react'
import { useSelector } from 'react-redux'

import Header from './site/header'
import StoreLinks from './site/store-links'
import Description from './site/description'
import HeroImage from './site/hero'
import VanityDisplay from './site/vanity'
import Benefits from './site/benefits'
import Footer from './site/footer'
import Others from './site/footer-info'
import PlayButtonOrSeparator from './site/preview-video'
import { FooterSeparator, HeroSeparator } from './site/separator'

const LandingPage = () => {
  const drawerSelector = state => state.ui.drawer
  const drawerIsOpen = useSelector(drawerSelector)

  const wrapperRef = React.useRef(null)

  const shiftWrapper = () => {
    const drawerWidth = drawerIsOpen
      ? document.getElementById('builder-form').offsetWidth
      : 0
    wrapperRef.current.style.paddingLeft = drawerWidth + 'px'
  }

  React.useEffect(() => {
    shiftWrapper()
    window.addEventListener('resize', shiftWrapper)
    return () => window.removeEventListener('resize', shiftWrapper)
  })

  return (
    <React.Fragment>
      <div id="app-site-wrapper" ref={wrapperRef} className="app-site-wrapper">
        <div className="page-wrap">
          <Header />
          <StoreLinks />
          <PlayButtonOrSeparator />
          <VanityDisplay />
          <Description />
          <HeroImage />
          <HeroSeparator />
          <Benefits />
        </div>
        <footer>
          <StoreLinks />
          <FooterSeparator />
          <Footer />
        </footer>
        <Others />
      </div>
    </React.Fragment>
  )
}

export default LandingPage
