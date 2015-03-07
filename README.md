## gulp-inline-image-html

A [Gulp](http://gulpjs.com) task for inlining images inside HTML. For example,

```html
<img src="test.png"/>
```
becomes

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU...."/>
```

This is mearly a wrapper for [inline-images](https://www.npmjs.com/package/inline-images) by [Max Ogden](http://github.com/maxogden).

### Usage

```javascript
var gulp = require('gulp');
var inlineimg = require('gulp-inlie-image-html');

gulp.task('default', function () {
  gulp.src('src/**/*.html')
    .pipe(inlineimg('src'))  // takes in the directory to use as the root when looking for images
    .pipe(gulp.dest('dest/'));
```
