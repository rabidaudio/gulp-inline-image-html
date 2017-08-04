var inlineimg = require('inline-images');
var gutil = require('gulp-util');
var through = require('through2');
var fs = require('fs');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-inline-image';

function inlineImage(dir) {

  var stream = through.obj(function(file, enc, cb) {
    if (fs.existsSync(file)) {
      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        return cb();
      }
      if (file.isBuffer()) {
        file.contents = inlineimg(file.contents, dir);
        this.push(file);
        return cb();
      }
    }
    return cb(null, file); //no-op
  });

  return stream;
}

module.exports = inlineImage;