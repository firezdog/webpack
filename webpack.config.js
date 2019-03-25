const path = require('path');

module.exports = {
  // what is the main file (what do we need to compile)?
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    // generate absolute path for compile target
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
};
