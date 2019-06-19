var inlineImages = require('inline-images')
var PluginError = require('plugin-error')
var through = require('through2')

const PLUGIN_NAME = 'gulp-inline-image'

//
// From the rvagg/through2 documentation:
//
// "A minimal implementation should call the callback function to
// indicate that the transformation is done, even if that transformation
// means discarding the chunk."
//
// See: https://github.com/rvagg/through2/tree/4383b10#transformfunction
//
function makeTransformFunc (baseDir) {
  return function (chunk, enc, cb) {
    if (chunk.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'))
      return cb()
    }

    if (chunk.isBuffer()) {
      chunk.contents = inlineImages(chunk.contents, baseDir)
      this.push(chunk)
      return cb()
    }

    // Pass through
    return cb(null, chunk)
  }
}

module.exports = function (baseDir) {
  return through.obj(makeTransformFunc(baseDir))
}
