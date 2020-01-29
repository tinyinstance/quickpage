import React from 'react'
import { useSelector } from 'react-redux'
import { Remarkable } from 'remarkable'

const md = new Remarkable()

const Description = () => {
  const description = useSelector(state => state.description)

  const renderMarkdown = () => {
    return { __html: md.render(description) }
  }

  return (
    <section className="about text-center">
      <div
        data-test="content"
        dangerouslySetInnerHTML={renderMarkdown()}
        className="container-md "
      ></div>
    </section>
  )
}

export default Description
