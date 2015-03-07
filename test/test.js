var expect = require('chai').expect;
var File = require('vinyl');
var fs = require('fs');

var inlineimg = require('../');

describe('gulp-inline-image', function(){

  describe('in buffer mode', function(){

    it('should replace images with data tags', function(done){
      var fakeFile = new File({
        contents: fs.readFileSync('test/fixtures/index.html')
      });
      var myInlineimg = inlineimg('test/fixtures');
      myInlineimg.write(fakeFile);
      myInlineimg.once('data', function(file) {

        expect(file.isBuffer()).to.be.true;
        expect(file.contents.toString('utf8')).not.to.contain('peppers.png');
        expect(file.contents.toString('utf8')).to.contain('src="data:');

        done();
      });
    });

  });
});