// This file used to test the app
// The file name, all the key name or term here are particular
// Remeber to change 'test' in package.json file to "karma start"

var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  // mocha allow us to access to 'describe' and 'it' function
  // 'sourcemap': if there is error, they are not using bundle.js file to display, but actual jsx file
  // 'reporters' showing which test passed, which test failes
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    // load the jquery and foundation here (as of webpack)
    // so that the karma test will recognize it if found the them component file
    // remark: no script loader (script!) here as not available in karma
    // instead specify where can find the file using 'node_modules' dir
    // any file (*) or sub directories (**) in 'app/tests' folder with name end with 'test.jsx'
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/foundation-sites/dist/foundation.min.js',
      'app/tests/**/*.test.jsx'
    ],
    // specify thing we want to do with the test file
    // for this case: for all the test file, we want to run webpack (load in the component using 'require') and
    // sourcemap (if there is error, they are not using bundle.js file to display, but using actual jsx file)
    preprocessors: {
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        timeout: '5000'
      }
    },
    // karma work closely with webpack
    webpack: webpackConfig,
    // We don't really care of webpackServer
    webpackServer: {
      noInfo: true
    }
  });
}
