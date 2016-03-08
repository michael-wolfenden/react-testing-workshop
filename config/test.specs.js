var ReactWrapper = require('enzyme').ReactWrapper;

// add helper exists method
ReactWrapper.prototype.exists = function exists(selector) {
    const result = this.find(selector);
    return result.length != 0;
};

// because we are using loaders while producing our bundle we need to create a webpack context file
// https://github.com/webpack/docs/wiki/context containing all our specs
const context = require.context('../app', true, /spec\.jsx?$/);
context.keys().forEach(context);
