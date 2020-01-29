import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Remarkable } from 'remarkable'

const md = new Remarkable()

export const OtherMenuItem = ({ id }) => {
  const other = useSelector(state => state.others[id])
  const otherLink = '#' + other.id
  return (
    <li>
      <a href={otherLink}>{other.title}</a>
    </li>
  )
}

OtherMenuItem.propTypes = {
  id: PropTypes.string
}

export const SocialMenuItem = ({ id }) => {
  const social = useSelector(state => state.socials[id])
  return (
    <li>
      <a href={social.url}>{social.title}</a>
    </li>
  )
}

SocialMenuItem.propTypes = {
  id: PropTypes.string
}

export const Contact = () => {
  const contact = useSelector(state => state.contact)

  if (contact.length == 0) return null
  return (
    <li>
      <a href={'mailto:' + contact}>Contact</a>
    </li>
  )
}

export const FooterMenu = () => {
  const otherRefs = useSelector(state => state.otherRefs)
  const socialRefs = useSelector(state => state.socialRefs)

  const othersMenuItems = otherRefs.map(id => (
    <OtherMenuItem key={id} id={id} />
  ))

  const socialMenuItems = socialRefs.map(id => (
    <SocialMenuItem key={id} id={id} />
  ))

  return (
    <ul className="footer-menu">
      {othersMenuItems}
      <Contact />
      {socialMenuItems}
    </ul>
  )
}

export const FooterCopy = () => {
  const footerCopy = useSelector(state => state.footerCopy)

  const renderMarkdown = () => {
    return { __html: md.render(footerCopy) }
  }

  if (footerCopy.length == 0) return null
  return <div dangerouslySetInnerHTML={renderMarkdown()}></div>
}

export const BuiltWith = () => {
  const show = useSelector(state => state.showBuildBy)
  if (!show) return null
  return (
    <span data-test="built-with">
      This web site is built with <a href="">QuickPage</a>
    </span>
  )
}

const Footer = () => {
  return (
    <div className="container-sm text-center">
      <FooterMenu />
      <FooterCopy />
      <BuiltWith />
    </div>
  )
}

export default Footer
