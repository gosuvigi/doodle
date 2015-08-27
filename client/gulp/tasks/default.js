var gulp = require('gulp');

gulp.task('default', function() {
    gulp.start('less', 'images', 'markup', 'watch');
});
