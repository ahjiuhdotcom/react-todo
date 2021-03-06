// Naming 'webpack.config.js' is important

var webpack = require('webpack');
// come with node core module, no need to install it
var path = require('path');
// used to load in custom env file e.g. config/test.env and config/development.env
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// we use try-catch to throw the error if the file doesn't exist
// which is exactly happen in production because the 'config' directory
// is not exist in production
// we doesn't really care of the error in production, we can just ignore
// after we create the env file, we still need those variables inside our bundle file
// using the plugin below
try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch(e) {

}

// refer notes below on how to set env var in heroku

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
  plugins: [
    // define the global variables name
    // key is the variable name to watch for
    // value is the module to replace it with
    // e.g. whenever see '$', it refer to 'jquery'
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    // to remove warning when we run
    // 'NODE_ENV=production webpack -p'
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    // to define variable in bundle
    new webpack.DefinePlugin({
      'process.env': {
        // SUPER CONFUSING HERE
        // why use JSON.stringify()
        // const a = 1
        // if we just put b: 'a', webapck will run it as b = 1, not b = 'a'
        // we don't want: b = a, or b = 1
        // we want: b = "a" (string 'a') not b = 1
        // that's why we want stringify it
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET)
      }
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
      app: 'app', // specifying this actuall can cover all aliases and modulesDirectories
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
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
        exclude: /(node_modules|bower_components)/
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
  // 'eval-source-map' take up a lot of space in bundle.js
  // and it is not required during prouction
  // devtool: 'eval-source-map'
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map'
};

// At terminal, run 'webpack'
// At terminal, run 'webpack -w' will listen to the changes continuously
// and restart webpack automatically

// we can simulate the production mode by
// putting 'NODE_ENV=production' in front of 'webpack' in command like
// e.g. 'NODE_ENV=production webpack'
// putting '-p' flag will hv furthur optimization
// e.g. 'NODE_ENV=production webpack -p'

// READY FOR PRODUCTION
// changes here is to push the entire project file (except those in .gitignore)
// and the server will build the project it self and run
// we no longer manage bundle.js file in our local machine
// not like stephen grider method: build first then push to server
// package.json file:
// tell webpack if running/executing 'test',
// it is running in 'test' NODE_ENV environment
// same concept as simulating production by 'NODE_ENV=production webpack -p'
// 'build' responsible for running webpack
// "npm run build && node server.js" means
// run the 'build' command, then 'node servser'
// "scripts": {
//   "test": "NODE_ENV=test karma start",
//   "build": "webpack",
//   "start": "npm run build && node server.js"
// },

// remember to move all devDependencies to dependencies except 'karma' & 'mocha'
// remember to copy domain name 'react-todo-sia.herokuapp.com' to firebase
// to set up the connection
// firebase console > authentication > sign-in method > OAuth redirect domains > add domain

// Set env var in herokuapp
// command to set: heroku config:set key=value
// commnad to remove: heroku config:unset key=value
// command to view: heroku config
// e.g.: heroku config:set API_KEY=ABCDEFGH
