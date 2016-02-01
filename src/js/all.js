window.DextersLab = window.DextersLab || {};
let DextersLab = window.DextersLab;

DextersLab.libReq = require.context("./lib", true, /\.js$/);

DextersLab.requireModule = function(id) {
    if (id.indexOf('lib') === 0) {
        // it's a library
        id = id.replace('lib', '.').replace('.js', '') + '.js';
        return DextersLab.libReq(id);
    } else if (id.indexOf('templates') === 0) {
        id = id.replace('templates', '.').replace('.nunj', '') + '.nunj';
        return DextersLab.templatesReq(id);
    }
};