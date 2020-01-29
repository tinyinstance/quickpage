import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Remarkable } from 'remarkable'
import { useImage } from '../common/hooks'
import { createSelector } from 'reselect'

const md = new Remarkable()

export const BenefitItem = ({ id, index }) => {
  const benefit = useSelector(state => state.benefits[id])

  const image = benefit.image

  const imageFile = useImage(image.id, image.name)

  const src = () => (imageFile ? URL.createObjectURL(imageFile) : '')

  const renderMarkdown = () => {
    return { __html: md.render(benefit.content) }
  }

  return (
    <div className={index % 2 == 0 ? 'benefit-bg' : null}>
      <div className={'benefit container-lg ' + benefit.position}>
        <div className="content-wrapper">
          <h4 data-test="title">{benefit.title}</h4>
          <div
            data-test="content"
            dangerouslySetInnerHTML={renderMarkdown()}
          ></div>
        </div>
        {imageFile ? (
          <div className="image-wrapper">
            <img data-image-name={image.name} src={src()} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

BenefitItem.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number.isRequired
}

const Benefits = () => {
  // Benefit entries with content
  const validBenefitRefs = createSelector(
    state => state.benefits,
    benefits =>
      Object.keys(benefits).filter(
        id =>
          benefits[id].title.length > 0 ||
          benefits[id].content.length > 0 ||
          benefits[id].image.id != null
      )
  )

  const benefitRefs = useSelector(validBenefitRefs)

  const items = benefitRefs.map((id, index) => (
    <BenefitItem key={id} id={id} index={index} />
  ))

  return <section className="benefits">{items}</section>
}

export default Benefits
