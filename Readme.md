# Webpack Tutorial 
## Part 1: What Is It?
* Bundle files from many different sources into a few files (bundle assets) / manage dependencies.
* loaders
* create-react-app and other cli's use webpack
* minified files (bundle.js, main.chunk.js) "eval" "__webpack__require__" etc.
* development and production modes
## Part 2: Defining the Problem
* Sample app -- a calculator with basic validations
* ./assets, src/app.js, index.html 
* getting a more complicated structure: break app (simple as it is) into utils
* Why webpack?  Apparently import statements don't work in JS files linked from html!  We would have to manually link everything in the right order (or use dynamic imports, which is annoying). Webpack would make sure that client-side JS has all the dependencies it needs to run.
* npm install --save webpack-dev webpack-cli
* "start": webpack
* need "index.js" in src on "npx webpack" -- creates a complicated "main.js" in ./dist
* now we can have our html use the "main.js" -- goal is it won't need anything else and all imports will be there.
## Part 3: Solving the Problem
* We can now bundle all imports from index.js into our application
* we need to make sure that dependencies export what we need (and we use destructuring {} to get it).
## Part 4: Configuration
We have been using default behavior -- to create a "main.js" bundle in "./dist" based on "./src/index.js".  We can also configure this behavior to suit our needs (webpack.config.js) using "(npx) webpack --config \<config file>".  

If we set our "mode" to "development, we get more readable code -- comprehension is still difficult, however, because of "eval".  We can use "devtool: 'none'" to get rid of the "eval"s. Doing so, we see that webpack is wrapping our code in functions and replacing imports with the '\__webpack_require__' (or '\__webpack_exports__') function.
## Part 5: Bundling Other Things (Loaders)
* Loaders: allow wp to handle different files, dictate preprocessing e.g. css (sass)
* src/main.css: how to include?
* 'test' and 'use' under module.rules
* style-loader and css-loader (npm install --save-dev) -- they both do work -- test for '.css' ending.