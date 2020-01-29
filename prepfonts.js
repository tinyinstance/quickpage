const fs = require('fs')
const archiver = require('archiver')

console.log('Prepping fonts zip')

// create a file to stream archive data to.
// eslint-disable-next-line no-undef
var output = fs.createWriteStream(__dirname + '/public/fonts.zip')
var archive = archiver('zip', {
  zlib: { level: 9 }
})

archive.pipe(output)

// append fonts
archive.directory('src/fonts', false)
archive.finalize()
