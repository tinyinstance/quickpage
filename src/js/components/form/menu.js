import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleIsHome, toggleDrawer } from '../../redux/store-helpers/ui'
import { githubSVG, homeSVG, openSVG, closeSVG } from '../common/fa-svg'

/**
 * Form top menu component
 */
const Menu = () => {
  const drawerIsOpen = useSelector(state => state.ui.drawer)

  const dispatch = useDispatch()

  const className = () => {
    if (drawerIsOpen) return 'open'
    return 'close'
  }

  const handleToggleDrawer = () => dispatch(toggleDrawer())

  const toggleToggleHome = () => dispatch(toggleIsHome())

  return (
    <nav className={'main-nav ' + className()}>
      <ul>
        <li>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://github.com/tinyinstance/quickpage.git"
          >
            {githubSVG}
          </a>
        </li>
        <li data-test="home-toggle" onClick={toggleToggleHome}>
          {homeSVG}
        </li>
        <li data-test="drawer-toggle" onClick={handleToggleDrawer}>
          {drawerIsOpen ? closeSVG : openSVG}
        </li>
      </ul>
    </nav>
  )
}

export default Menu
