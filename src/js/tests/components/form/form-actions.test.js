import React from 'react'

import { FormActions } from '../../../components/form/form-actions'
import { useCreateSiteZip } from '../../../components/common/hooks'
import imageDB from '../../../pouchDB/imageDB'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('Form Actions Menu', () => {
  it('should render and act correctly', () => {
    const store = mockStore({
      tagline: 'must be cleared',
      ui: {
        zipInProgress: false
      }
    })

    useCreateSiteZip.mockReturnValueOnce(null)
    imageDB.resetDB.mockReturnValueOnce(true)

    const wrapper = mountWithStore(<FormActions />, store)

    // Should render buttons
    const downloadButton = findTestAttr(wrapper, 'download-button')
    expect(downloadButton.length).toBe(1)
    expect(downloadButton.prop('disabled')).toEqual(false)

    const clearButton = findTestAttr(wrapper, 'clear-button')
    expect(clearButton.length).toBe(1)
    expect(clearButton.prop('disabled')).toEqual(false)

    // Buttons should behave correctly
    downloadButton.simulate('click')
    expect(useCreateSiteZip).toHaveBeenCalledTimes(1)

    clearButton.simulate('click')
    expect(imageDB.resetDB).toHaveBeenCalledTimes(1)
    const actions = store.getActions()
    expect(actions[0]).toEqual({ type: 'RESET_FORM' })
  })

  it('should render disabled buttons', () => {
    const store = mockStore({
      ui: {
        zipInProgress: true
      }
    })

    useCreateSiteZip.mockReturnValueOnce(null)

    const wrapper = mountWithStore(<FormActions />, store)

    const downloadButton = findTestAttr(wrapper, 'download-button')
    expect(downloadButton.length).toBe(1)
    expect(downloadButton.prop('disabled')).toEqual(true)

    const clearButton = findTestAttr(wrapper, 'clear-button')
    expect(clearButton.length).toBe(1)
    expect(clearButton.prop('disabled')).toEqual(true)
  })
})
