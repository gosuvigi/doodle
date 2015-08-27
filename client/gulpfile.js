var path = require('path'),
    cssMinify = require('gulp-minify-css'),
    less = require('gulp-less'),
    gulp = require('gulp'),
    Builder = require('systemjs-builder');

var paths = {
    baseUrl: 'file:' + process.cwd() + '/src/',
    css: {
        files: ['src/css/*.css']
    },
    less: ['src/less/*.less'],
    assets: ['src/cache.manifest'],
    fonts: ['src/fonts/*'],
    html: ['src/html/*'],
    images: ["src/img/*"],
    destination: './dist',
    bundlejs: ['src/js/bundle.js']
};

// Copy the concatenated Javascript file to the "dist" folder
gulp.task('copy-bundle-js-files', function () {
    return gulp.src(paths.bundlejs)
        .pipe(gulp.dest(paths.destination + '/js'));
});

// Optimize application CSS files and copy to "dist" folder
gulp.task('optimize-and-copy-css', function () {
    return gulp.src(paths.css.files)
        .pipe(cssMinify())
        .pipe(gulp.dest(paths.destination + '/css'));
});

gulp.task('copy-images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.destination + '/img'));
});

gulp.task('copy-assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.destination))
});

gulp.task('copy-html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.destination + '/html'))
});

gulp.task('copy-fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.destination + '/fonts'))
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        //.pipe(cssMinify({noRebase: true}))
        .pipe(gulp.dest(paths.destination + '/css'));
});

gulp.task('build', ['copy-bundle-js-files', 'less', 'optimize-and-copy-css', 'copy-images', 'copy-assets', 'copy-html', 'copy-fonts'],
    function () {
    }
);