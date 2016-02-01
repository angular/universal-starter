var webpack = require('webpack');
var path = require('path');
var angular2_webpack_prerender_1 = require('angular2-webpack-prerender');
var angular2_universal_preview_1 = require('angular2-universal-preview');
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var app_1 = require('./src/app/app');
core_1.enableProdMode();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    context: __dirname,
    target: 'web',
    entry: './src/client',
    output: {
        path: __dirname + '/dist/client',
        publicPath: __dirname,
        filename: 'bundle.js'
    },
    resolve: {
        root: __dirname + '/src',
        extensions: ['', '.ts', '.json', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [/node_modules/]
            }
        ],
        noParse: [
            path.resolve('node_modules', 'es6-shim', 'dist'),
            path.resolve('node_modules', 'angular2', 'bundles'),
            path.resolve('node_modules', 'zone.js', 'dist'),
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            comments: false
        }),
        new angular2_webpack_prerender_1.WebpackAngular2Prerender({
            App: app_1.App,
            providers: [
                core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' }),
                core_1.provide(angular2_universal_preview_1.REQUEST_URL, { useValue: '/' }),
                router_1.ROUTER_PROVIDERS,
                angular2_universal_preview_1.SERVER_LOCATION_PROVIDERS,
            ],
            preboot: true
        })
    ]
};
//# sourceMappingURL=webpack.config.js.map