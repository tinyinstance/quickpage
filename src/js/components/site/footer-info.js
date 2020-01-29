import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Remarkable } from 'remarkable'
import { timesCircleSVG } from '../common/fa-svg'

const md = new Remarkable()

export const OtherModal = ({ id }) => {
  const other = useSelector(state => state.others[id])

  const renderMarkdown = () => {
    return { __html: md.render(other.content) }
  }

  return (
    <div data-test="modal" id={other.id} className="overlay">
      <a href="" className="close-overlay"></a>
      <section>
        <h2 data-test="title">{other.title}</h2>
        <div
          data-test="content"
          dangerouslySetInnerHTML={renderMarkdown()}
        ></div>
        <a href="" className="close">
          {timesCircleSVG}
        </a>
      </section>
    </div>
  )
}

OtherModal.propTypes = {
  id: PropTypes.string.isRequired
}

const Others = () => {
  const otherRefs = useSelector(state => state.otherRefs)

  const items = otherRefs.map(id => <OtherModal key={id} id={id} />)

  return items
}

export default Others
