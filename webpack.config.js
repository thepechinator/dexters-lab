// Template from
// https://github.com/webpack/webpack-with-common-libs/blob/master/webpack.config.js

var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: __dirname + "/public/js",
        filename: "[name].js",
        publicPath: "http://localhost:8080/js/"
    },
    module: {
        loaders: [
            // ES6 all the way! There are two frontrunners that accomplish
            // converting ES6 stuff to ES5 style:
            // - Babel (which we're using and doesn't require a runtime dependency)
            // https://babeljs.io/
            // - Traceur (Google's implementation)
            // https://github.com/google/traceur-compiler
            {
                test: /\.js$/, loader: "babel-loader", 
                exclude: /node_modules|bower_components/
            },

            // required to write "require('./style.css')"
            { test: /\.css$/, loader: "style-loader!css-loader" },

            { test: /\.scss$/, loaders: ["style", "css", "sass"]},

            // required for bootstrap icons
            { test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader?prefix=font/" },
            { test: /\.eot$/, loader: "file-loader?prefix=font/" },
            { test: /\.svg$/, loader: "file-loader?prefix=font/" }
        ],
        noParse: [

        ],
        resolve: {
            // Prefer to keep this minimal as possible, as the more
            // paths webpack has to look through will slow down the
            // compile process.
            modulesDirectories: [
                "",
                "node_modules",
                "bower_components"
            ]
            // This is somewhat trippy. Because webpack can't automatically
            // determine the main js files to import for underscore and backbone,
            // we need to help it out here and create aliases mapping that
            // relationship. That way, we can just do require('underscore') and
            // require('backbone') in our code. Or, in the ES6 way,
            // 'import "backbone"' and 'import "underscore"'
            // alias: {
            //     jquery: 'jquery/dist/jquery',
            //     waypoints: 'jquery-waypoints/lib/jquery.waypoints',
            //     'waypoints.sticky': 'jquery-waypoints/lib/shortcuts/sticky',
            //     underscore: 'underscore/underscore',
            //     backbone: 'backbone/backbone',
            //     'backbone.wreqr': 'backbone.wreqr/lib/backbone.wreqr',
            //     'backbone.babysitter': 'backbone.babysitter/lib/backbone.babysitter',
            //     'backbone.marionette': 'backbone.marionette/lib/backbone.marionette',
            //     nouislider: 'nouislider/distribute/nouislider',
            //     d3: 'd3/d3',
            //     breakpoints: 'js-breakpoints/breakpoints',
            //     machina: 'machina/lib/machina',
            //     modernizr: 'modernizr/modernizr',
            //     fastclick: 'fastclick/lib/fastclick'
            // }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
