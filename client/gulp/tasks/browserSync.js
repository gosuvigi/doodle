/**
 * Created by ratoico on 8/27/15.
 */
var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config').browserSync;

gulp.task('browserSync', function () {
    browserSync(config);
});
