/**
 * Created by ratoico on 8/26/15.
 */
var gulp = require('gulp');
var less = require('gulp-less')
var config = require('../config').less;

gulp.task('less', function () {
    return gulp.src(config.src)
        .pipe(less())
        .pipe(gulp.dest(config.dest));
});
