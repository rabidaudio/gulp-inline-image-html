## gulp-inline-image-html

A [Gulp](http://gulpjs.com) task for inlining images inside HTML. For example,

```html
<img src="test.png"/>
```
becomes

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..."/>
```

This is a wrapper for [inline-images](https://www.npmjs.com/package/inline-images) by [Max Ogden](http://github.com/maxogden).

### Usage

```js
var gulp = require('gulp')
var inlineimg = require('gulp-inline-image-html')

gulp.task('default', function () {
  gulp.src('src/**/*.html')
    .pipe(inlineimg('src')) // optionally pass in the base directory for looking for images
    .pipe(gulp.dest('dest/'))

})
```

### License

[MIT](LICENSE)
