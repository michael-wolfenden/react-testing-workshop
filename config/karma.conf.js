const path = require('path');
const appDir = path.join(__dirname, '..', 'app');

// to debug open http://127.0.0.1:9876/debug.html and check console
module.exports = config => config.set({
    // run browserless
    browsers: ['PhantomJS'],

    // use the mocha test framework
    frameworks: ['mocha'],

    // just load this file
    files: [
        'test.specs.js',
    ],

    // preprocess with webpack
    preprocessors: {
        'test.specs.js': ['webpack'],
    },

    // report results in this format
    reporters: ['mocha'],

    webpackServer: {
        quiet: true
    },

    webpack: {
        // add resolve.extensions to allow importing js or jsx files
        // without having to add the file extenions
        // '' is needed to allow imports without an extension.
        resolve: {
            extensions: ['', '.js', '.jsx'],
        },

        module: {
            // run all files through eslint before
            // transpilation below
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    include: appDir,
                    loader: 'eslint',
                },
            ],

            // run all files through babel
            loaders: [
                {
                    test: /\.jsx?$/,
                    include: appDir,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015'],
                    },
                },
            ],
        },
    },
});