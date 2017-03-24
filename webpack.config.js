// Naming 'webpack.config.js' is important

var webpack = require('webpack');
var path = require('path'); // come with node core module, no need to install it

module.exports = {
  // import
  // script file not neccessary package for webpack
  // thus need to put 'script!' (script loader npm module) before the file path
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/app.jsx'
  ],
  // provide set of key value pairs
  // key is module name, value is the variable name we want available
  // inside the external script file
  // 'foundation' use term 'jQuery' in its method for its jquery obejct
  externals: {
    jquery: 'jQuery'
  },
  // define the global variables name
  // key is the variable name to watch for
  // value is the module to replace it with
  // e.g. whenever see '$', it refer to 'jquery'
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  // export
  output: {
    path: __dirname, // '__dirname' means current directory
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    // with 'modulesDirectories', we do not need to add
    // the path of newly created custom component to 'alias'
    // webpack will automatic find it in 'modulesDirectories'
    // it first look for 'node_modules', then './app/components' etc
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/api'
    ],
    // specify where to find those file
    // so that not explicitly specify the path in 'require' statement
    alias: {
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['', '.js', '.jsx'] //list of file extension that able to process
  },
  module: {
    // purpose of loader is to convert certain file to browser readable
    loaders: [
      {
        loader: 'babel-loader', // covert jsx to es5
        // telling loader what to do with the file
        query: {
          // babel by default require preset
          // to compile the code from react, es2015
          // stage-0 contain all the plugin of es2015
          presets: ['react', 'es2015', 'stage-0']
        },
        // specify which file to apply this loader
        test: /\.jsx?$/, //regular expression, means .jsx file
        // specify which file to be excluded
        exlude: /(node_modules|bower_components)/
      }
    ]
  },
  // specify where to locate the scss details of foundation
  // this is only required if we want to load the foundation file thru css
  sassLoader: {
    includePaths: [
      // 'path.resolve' = combine 2 paths
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  // Showing original source code in debugger
  devtool: 'eval-source-map'
};

// At terminal, run 'webpack'
// At terminal, run 'webpack -w' will listen to the changes continuously
// and restart webpack automatically
