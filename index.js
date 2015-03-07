var inlineimg = require('inline-images');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-inline-image';

function inlineImage(dir) {

  var stream = through.obj(function(file, enc, cb) {

    if(file.isNull()){
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      return cb();
    }

    // must be a buffer
    file.contents = inlineimg(file.contents, dir);

      // var streamer = through(function(chunk, enc, callback){
      //   this.push(inlineimg(chunk));
      //   callback();
      // });

      // streamer.on('error', this.emit.bind(this, 'error'));
      // file.contents = file.contents.pipe(streamer);
    //       if (file.isStream()) {
    //   file.contents = file.contents.pipe(prefixStream(prefixText));
    // }
    this.push(file);
    cb();
  });

  return stream;
}

module.exports = inlineImage;