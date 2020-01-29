import PouchDB from 'pouchdb'

/**
 * PouchDB database is used for saving images locally
 */
var db = new PouchDB('images', { auto_compaction: true })

PouchDB.on('created', () => {
  // Update the db reference in imageDB handle
  imageDB.getAttachment = db.getAttachment
})

/**
 * Destroys and recreates the pouchDB database when user clears the form
 */
const resetDB = () => {
  db.destroy()
    .then(response => {
      console.log('response -> ', response)
      db = new PouchDB('images', { auto_compaction: true })
    })
    .catch(err => console.log(err))
}

/**
 * Saves image into database returns Promise with image information
 *
 * @param {File} file File blob
 * @returns {id, name} Promise object with image id, name information
 */
const saveImage = file => {
  var imageEntry = {
    _id: new Date().toISOString(),
    _attachments: {
      [file.name]: {
        content_type: file.type,
        data: file
      }
    },
    name: file.name
  }

  return db
    .put(imageEntry)
    .then(response => Promise.resolve({ id: response.id, name: file.name }))
}

/**
 * Removes the image from database and returns the Promise
 *
 * @param {string} imageID Primary key value for the image in database
 * @returns {Promise} pouchDB remove promise
 */
const removeImage = imageID => {
  return db.get(imageID).then(doc => db.remove(doc))
}

/**
 * Helper API object for handling operations on the image database
 */
const imageDB = {
  save: saveImage,
  remove: removeImage,
  resetDB: resetDB,
  getAttachment: db.getAttachment
}

export default imageDB
