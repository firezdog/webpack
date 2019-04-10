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
* webpack is turning our css into javascript (with css-loader) and then injects it into the DOM (with style-loader)
* laoders load in reverse order -- so we put our css-loader at the end of the array, then style-loader to inject it
* adding sass: test for ".scss" and "npm install sass-loader node-sass webpack --save-dev"
* overriding bootstrap: install bootstrap and import the bootstrap scss into main.scss. Then you can change variables e.g. $primary (note that the variable has to be defined before the import)
## Part 6: Cache Busting
* prevent browsers from caching 
* What is caching?
* Network tab informs us what files were loaded "from disk cache"
* Problem: what if browser doesn't load our updates because the site is cached? 
* use content hashes to change the filename (filename is determined by file contents)
* used on github (github-xxx)
* add [contentHash] to filename
* problem: index.html uses "main.js" -- but output is "main-[contentHash].js" ??? -- solution: we no longer put the script into the html
* solution: html plugin will inject dependencies into either a specified or made-to-order html file (note: plugins is not part of the module!)
## Part 7: Splitting Dev And Production
* Split config file into 3 -- common, dev, and production, w/ webpack-dev-server for development,  minification for production
* in dev, npm start will open a server and update automatically
* npm run build will use production and minify into a "build" directory
* webpack-dev-server provides a server as well as a "hot" option to automatically reload files on change (or you can use --hot)
* webpack-dev-server --open --watch (for changes) --hot (for HMR)
* guessing that common will be integrated with dev and prod using some kind of "merge" utility (lodash?)
* use & to build and then run server
* ran into "webpack-dev-server should not have additional options problem because I mis-spelled one of the properties in my config file (you can use --config and webpack-dev-server also compiles)
* we can use clean-webpack-plugin to get rid of old files each time we build -- but prob better to just delete dist each time?
* clean-webpack-plugin doesn't seem to delete files on rebuild (for hot dev server)
* we can use process.env.npm_lifecycle_event as a TARGET to have different builds in the same config file (this would be the script running, I believe as scripts_foo.js
## Part 8: Html-loader and file-loader
* moving the "cookies" image into assets -- now we need a loader to handle this dependency.
* we will use file-loader
* test: /\.(png|svg|jpg|gif)$/
* we can configure the name and outputPath as "options" (but then we need an object under use that specifies the "loader")
* we don't need a global "assets" folder now because webpack will make assets available as needed
* to load images from html we need html-loader (try it -- without html loader img link is broken -- or rather, we don't have the correct reference to the file webpack brought over)
* with aliasing (resolve: { alias: {} }): path.resolve(__dirname, 'src/images') -- now just use 'images/...' as the path
## Part 9: Multiple Bundles
* separating out our code from static vendor code (e.g. bootstrap) e.g. vendor.content.js
* step 1: put a new JS file in, then have webpack include it with another entrypoint.
* webpack docs encourage use of optimization.splitChunks (for node_modules)
* problem (from step 1) -- outputs all have same name (main)? -- solution: use [name] (we also use .bundle.js -- remember those first few months of work when you didn't understand where any of the JS came from?)
* now we can import bootstrap in the vendor (and not in the scss? -- doesn't seem like that works)
* now that we have bootstrap imported, we need to install its dependencies, jquery and popper.js (not popper!), or we get compile errors -- webpack just looks for the dependencies -- it doesn't install them!
* next step -- extract and minify the css (that must be part of the reason why it matters where we import it? -- no -- just has to be imported correct with the .scss prefix)
## Part 10: Extracting CSS, Minifying
* MiniCssExtractPlugin (mini-css-extract-plugin)
* use MiniCssExtractPlugin.loader as your css loader -- specify filename as "[name].css" when loading plugin
* why? better performance (don't wait for JS to inject styles -- otherwise JS has to load first)
* only put this in production so we don't wait for css files
* we want to extract the css *instead* of using style-loader (style-loader is what is currently extracting from the JS) -- so all we need to do is *replace* style-loader with the css extractor
* the above is not enough to minify -- we need to install something like optimize-css-assets-webpack-plugin, terserJSPlugin and set optimization.minimizer (an array) to contain instances of those plugins.
* we need js minification because we overrode js minification when we included the optimize option