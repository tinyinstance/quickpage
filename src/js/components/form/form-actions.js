import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import imageDB from '../../pouchDB/imageDB'
import { useCreateSiteZip } from '../common/hooks'

export const FormActions = () => {
  const inProgress = useSelector(state => state.ui.zipInProgress)

  const dispatch = useDispatch()

  const handleDownload = useCreateSiteZip()

  const clearFormData = () => {
    // Reset redux store
    dispatch({ type: 'RESET_FORM' })
    // Reset database
    imageDB.resetDB()
  }

  return (
    <div className="form-section">
      <button
        data-test="download-button"
        className="download-button"
        onClick={handleDownload}
        disabled={inProgress}
      >
        Download
      </button>
      <div className="text-center">
        <button
          data-test="clear-button"
          onClick={clearFormData}
          disabled={inProgress}
        >
          Clear form to restart
        </button>
      </div>
    </div>
  )
}
