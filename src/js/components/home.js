import React from 'react'
import { useDispatch } from 'react-redux'

import { toggleIsHome } from '../redux/store-helpers/ui'

import { name, githubURL, contact } from './common/constants'

const Home = () => {
  const dispatch = useDispatch()
  const handleToggleHome = () => dispatch(toggleIsHome())

  return (
    <div className="home-page">
      <div className="home-bg"></div>
      <div className="header">
        <div className="wrapper">
          <h1>{name}</h1>
          <p>
            Create a clean and beautiful static landing page for your mobile app
            in minutes, for free.
          </p>
        </div>
      </div>

      <section className="wrapper">
        <div className="steps">
          <button className="cta header-cta" onClick={handleToggleHome}>
            Start now
          </button>
          <h3>Step 1</h3> <p>Fill in the form</p>
          <h3>Step 2</h3> <p>Download the site files</p>
          <h3>Step 3</h3> <p>Host anywhere</p>
        </div>
      </section>

      <div className="about">
        <div className="wrapper">
          <p>
            {name} allows me to quickly create beautiful and minimalist static
            pages for my hobby apps, with the information and assets already
            available for publishing to an app store. Hope you find it useful
            too.
          </p>{' '}
          <p>
            No sign up or account needed. Everything happens locally in your
            browser, and it is open source. Here is{' '}
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://theprocessapp.com"
            >
              {' '}
              an example site
            </a>{' '}
            made with {name}.
          </p>
          <p>
            You can{' '}
            <a href="" onClick={handleToggleHome}>
              start using it
            </a>{' '}
            now in your browser. For development please check{' '}
            <a href={githubURL}>github</a>, for everything else feel free to{' '}
            <a href={'mailto:' + contact}>email</a> me.
          </p>
        </div>
      </div>

      <section className="footer">
        <div className="wrapper">
          <div className="line"></div>
          <p>
            <a href={'mailto:' + contact}>Contact</a> |{' '}
            <a href={githubURL}>Github</a> | MIT Licence - Copyright 2019
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
