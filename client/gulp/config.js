var dest = "./dist";
var src = './src';

module.exports = {
    browserSync: {
        proxy: {
            target: "http://localhost:8080/doodle",
        },
        browser: "firefox",
        files: src
    },
    sass: {
        src: src + "/sass/**/*.{sass,scss}",
        dest: dest,
        settings: {
            indentedSyntax: true, // Enable .sass syntax!
            imagePath: 'images' // Used by the image-url helper
        }
    },
    less: {
        src: src + '/less/*.less',
        dest: dest
    },
    images: {
        src: src + "/img/**",
        dest: dest + "/img"
    },
    markup: {
        src: src + "/htdocs/**",
        dest: dest
    },
    iconFonts: {
        name: 'Gulp Starter Icons',
        src: src + '/icons/*.svg',
        dest: dest + '/fonts',
        sassDest: src + '/sass',
        template: './gulp/tasks/iconFont/template.sass.swig',
        sassOutputName: '_icons.sass',
        fontPath: 'fonts',
        className: 'icon',
        options: {
            fontName: 'Post-Creator-Icons',
            appendCodepoints: true,
            normalize: false
        }
    },
    browserify: {
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/js/app',
            // one bundle for development
            dest: src + "/js",
            outputName: 'bundle.js',
            // Additional file extentions to make optional
            extensions: ['.coffee', '.hbs'],
            // list of modules to make require-able externally
            require: ['jquery']
        }, {
            entries: src + '/js/app',
            // one bundle for war files
            dest: dest + "/js",
            outputName: 'bundle.js',
            // Additional file extentions to make optional
            extensions: ['.coffee', '.hbs'],
            // list of modules to make require-able externally
            require: ['jquery']
        }]
    },
    watchify: {
        poll: 1000,
        delay: 1500
    },
    production: {
        cssSrc: dest + '/*.css',
        jsSrc: dest + '/*.js',
        dest: dest
    }
};
