var inlineimg = require('inline-images');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-inline-image';

function inlineImage() {

  var stream = through.obj(function(file, enc, cb) {
    if (file.isBuffer()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
      return cb();
    }

    console.log(file);

    if (file.isStream()) {

      var streamer = through(function(chunk, enc, callback){
        this.push(inlineimg(chunk));
        callback();
      });

      streamer.on('error', this.emit.bind(this, 'error'));
      file.contents = file.contents.pipe(streamer);
    }

    this.push(file);
    cb();
  });

  return stream;
}

module.exports = inlineImage;