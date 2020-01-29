import React from 'react'
import { useSelector } from 'react-redux'

import BuilderForm from './form'
import LandingPage from './site'
import Home from './home'
import Menu from './form/menu'

const App = () => {
  const isHomeSelector = state => state.ui.isHome
  const isHome = useSelector(isHomeSelector)

  if (isHome) return <Home />
  return (
    <React.Fragment>
      <LandingPage />
      <BuilderForm />
      <Menu />
    </React.Fragment>
  )
}

export default App
