var path = require('path');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');

var destPath = path.dirname(require.main.filename) + '/../../ww-server/src/main/resources/static';
var srcPath = path.dirname(require.main.filename) + '/../build';

ncp.limit = 16;

rimraf(destPath, function () {
    console.log('Deleted static folder');
    console.log('Copying build files...');
    ncp(srcPath, destPath, function (err) {
        if (err) {
            return console.error(err);
        }
        ncp(destPath + '/index.html', destPath.replace('static', 'templates/index.html'));
        console.log('Copying build files complete.');

    });
});


