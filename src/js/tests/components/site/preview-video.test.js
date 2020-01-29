import React from 'react'

import { VideoOverlay } from '../../../components/site/preview-video'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

describe('<VideoOverlay />', () => {
  it('should render overlay', () => {
    const src = '<iframe></iframe>'
    const store = mockStore({
      videoURL: src
    })

    const wrapper = mountWithStore(<VideoOverlay src={src} />, store)
    const iframeWrapper = findTestAttr(wrapper, 'iframe')
    expect(iframeWrapper.length).toBe(1)
    expect(iframeWrapper.html()).toContain(src)
  })
})
