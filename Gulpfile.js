var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('default', function() {
    gulp.src('old-browsers.js')
        .pipe(uglify({
            mangle: true,
            compress: true
            //,
            //preserveComments: function ( node, comment ) {
                //console.log(comment.value);
                //if (/^\*\*\!/.test(comment.value) && /\*\*$/.test(comment.value)) {
                    //console.log('found tri-star comment');
                    //return true;
                //}
            //}
        }))
        .pipe(rename('old-browsers.min.js'))
        .pipe(gulp.dest('./'));
});
