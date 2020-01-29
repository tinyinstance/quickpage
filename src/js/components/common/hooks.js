import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver'
import { fetch } from 'whatwg-fetch'

import { setZipProgress } from '../../redux/store-helpers/ui'
import imageDB from '../../pouchDB/imageDB'

/**
 * Gets the image with id and name from database
 *
 * @param {string} imageID Primary key for the image in database
 * @param {string} imageName Attachment name for the image in database
 * @returns {File} File/Blob for the image
 */
export function useImage(imageID, imageName) {
  const [imageFile, setImageFile] = React.useState(null)

  React.useEffect(() => {
    if (imageID == null) setImageFile(null)
    else {
      imageDB
        .getAttachment(imageID, imageName)
        .then(blob => setImageFile(blob))
        .catch(err => console.log('Error while getting image\n', err))
    }
  }, [imageID, imageName])

  return imageFile
}

/**
 * Gets the image with selector from database
 *
 * @param {string} imageID Primary key for the image in database
 * @param {string} imageName Attachment name for the image in database
 * @returns {File} File/Blob for the image
 */
export function useImageSelector(selector) {
  const imageData = useSelector(selector)

  const [imageFile, setImageFile] = React.useState(null)

  React.useEffect(() => {
    if (imageData == null) setImageFile(null)
    else {
      imageDB
        .getAttachment(imageData.id, imageData.name)
        .then(blob => setImageFile(blob))
        .catch(err =>
          console.log('useImageSelector: Error while getting image\n', err)
        )
    }
  }, [imageData])

  return {
    file: imageFile,
    id: imageData == null ? null : imageData.id,
    name: imageData == null ? null : imageData.name
  }
}

/**
 * Input helper hook to sync input/textarea fields' value with the redux store
 * field pointed by the selector. Displays the value in the input area, and
 * updates the store as the input changes.
 *
 * @param {func} selector Redux selector function
 * @param {func} action Redux action creator that takes input
 * value as a parameter
 * @returns {object} value and onChange methods for the input
 */
export function useTextInput(selector, action) {
  const value = useSelector(selector)
  const dispatch = useDispatch()
  const handleChange = event => dispatch(action(event.target.value))

  return {
    value: value,
    onChange: handleChange
  }
}

/**
 * Input helper function for updating redux store
 *
 * @param {func} selector Redux selector function
 * @param {func} editAction Redux edit action creator
 * @param {func} deleteAction Redux delete action creator
 * @returns {object} Object with store value, and update and delete
 * helper methods
 *
 */
export function useReduxUpdatingInput(selector, editAction, deleteAction) {
  const value = useSelector(selector)
  const dispatch = useDispatch()

  const changeProperty = property => event => {
    // let updated = { ...value, [property]: event.target.value }
    let updated = Object.assign({}, value, { [property]: event.target.value })
    dispatch(editAction(...Object.values(updated)))
  }

  const editProperty = property => propertyValue => {
    // let updated = { ...value, [property]: propertyValue }
    let updated = Object.assign({}, value, { [property]: propertyValue })
    dispatch(editAction(...Object.values(updated)))
  }

  const handleDelete = () => dispatch(deleteAction(value.id))

  return {
    value: value,
    changeProperty: changeProperty,
    handleDelete: handleDelete,
    editProperty: editProperty
  }
}

/**
 * Textarea reference hook that dynamically resizes textarea height with
 * the content
 *
 * @returns React ref object
 */
export function useResizingTextarea(heightLimit = 0) {
  const textareaRef = React.useRef(null)

  // Update text area height dynamically
  React.useEffect(() => {
    textareaRef.current.style.height = 'auto'
    if (heightLimit == 0)
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 2 + 'px'
    else
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, heightLimit) + 2 + 'px'
  })

  return textareaRef
}

/**
 * Hook that returns the function to create zipped site files
 */
export function useCreateSiteZip() {
  const iconInfo = useSelector(state => state.icon)
  const heroInfo = useSelector(state => state.hero)
  const benefits = useSelector(state => state.benefits)
  const metaDescription = useSelector(state => state.seo.metaDescription)
  const metaTitle = useSelector(state => state.seo.metaTitle.length)
  const name = useSelector(state => state.name)

  const dispatch = useDispatch()

  const JSZip = require('jszip')
  const zip = new JSZip()

  const renderIndexHTML = () => {
    const getAppBody = () => {
      let bodyString = document.getElementById('app-site-wrapper').innerHTML
      var body = document.createElement('body')
      body.innerHTML = bodyString
      let imageTags = [...body.querySelectorAll('img[data-image-name]')]

      // Update image tags
      for (var index in imageTags) {
        let tag = imageTags[index]
        tag.src = tag.getAttribute('data-image-name')
        tag.removeAttribute('data-image-name')
      }

      return body.innerHTML
    }

    const body = { __html: getAppBody() }

    let siteHTML = (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content={metaDescription} />
          <title>{metaTitle.length > 0 ? metaTitle : name}</title>
          <link rel="stylesheet" href="main.css"></link>
        </head>
        <body>
          <div
            className="app-site-wrapper"
            dangerouslySetInnerHTML={body}
          ></div>
        </body>
      </html>
    )

    let render = ReactDOMServer.renderToStaticMarkup(siteHTML)

    return render
  }

  const zipIndexHTML = () => zip.file('index.html', renderIndexHTML())

  const zipStyles = () => {
    let cssPromise = fetch('/download.css').then(response =>
      Promise.resolve(response.arrayBuffer())
    )
    zip.file('main.css', cssPromise)
  }

  const zipImages = () => {
    // App icon
    if (iconInfo != null) {
      zip.file(iconInfo.name, imageDB.getAttachment(iconInfo.id, iconInfo.name))
    }

    // Hero image
    if (heroInfo != null) {
      zip.file(heroInfo.name, imageDB.getAttachment(heroInfo.id, heroInfo.name))
    }

    // Images in benefits
    Object.keys(benefits).forEach(key => {
      const item = benefits[key]
      if (item.image != null && item.image.id.length > 0) {
        const image = item.image
        zip.file(image.name, imageDB.getAttachment(image.id, image.name))
      }
    })
  }

  const handleDownload = () => {
    dispatch(setZipProgress(true))

    zipIndexHTML()
    zipStyles()
    zipImages()

    // zip fonts and hand-in the app-site.zip file
    fetch('/fonts.zip')
      .then(response => zip.loadAsync(response.arrayBuffer()))
      .then(zip => zip.generateAsync({ type: 'blob' }))
      .then(content => saveAs(content, 'app-site.zip'))
      .then(() => dispatch(setZipProgress(false)))
      .catch(() => dispatch(setZipProgress(false)))
  }

  return handleDownload
}
