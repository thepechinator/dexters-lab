// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
// More info: http://webpack.github.io/docs/context.html
var templatesContext = require.context("./templates", true, /\.nunj$/);
// For each possible require path indicated by our regex,
// require it. In other words, we're loading in all our tests by
// requiring all files ending with -test (/\-test$/, the third param)
// in their filename in this directory (".", the first parameter),
// and we want to scan the subdirectories (true, the second param).
templatesContext.keys().forEach(templatesContext);
