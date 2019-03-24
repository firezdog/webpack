# What is Webpack? 
## Part 1
* Bundle files from many different sources into a few files (bundle assets) / manage dependencies.
* loaders
* create-react-app and other cli's use webpack
* minified files (bundle.js, main.chunk.js) "eval" "__webpack__require__" etc.
* development and production modes
## Part 2
* Sample app -- a calculator with basic validations
* ./assets, src/app.js, index.html 
* getting a more complicated structure: break app (simple as it is) into utils
* Why webpack?  Apparently import statements don't work in JS files linked from html!  We would have to manually link everything in the right order (or use dynamic imports, which is annoying). Webpack would make sure that client-side JS has all the dependencies it needs to run.
* npm install --save webpack-dev webpack-cli
* "start": webpack
* need "index.js" in src on "npx webpack" -- creates a complicated "main.js" in ./dist
* now we can have our html use the "main.js" -- goal is it won't need anything else and all imports will be there.
## Part 3
* We can now bundle all imports from index.js into our application
* we need to make sure that dependencies export what we need (and we use destructuring {} to get it).