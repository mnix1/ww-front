// const fs = require('fs');
// const path = require('path');

// const modules = '                loader: require.resolve(\'css-loader\'),\n' +
//     '                options: {\n' +
//     '                  importLoaders: 1,\n' +
//     '                },';
//
// const newModules = '                loader: require.resolve(\'css-loader\'),\n' +
//     '                options: {\n' +
//     '                  importLoaders: 1,\n' +
//     '                  modules: true,\n' +
//     '                  localIdentName: \'[name]__[local]__[hash:base64:5]\n' +
//     '                },';
//
// function addModules(file) {
//     let text = fs.readFileSync(file, 'utf8');
//     if (!text.includes(newModules)) {
//         text = text.replace(modules, newModules);
//         fs.writeFileSync(file, text, 'utf8');
//     }
// }
//
// addModules(path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js'));
// addModules(path.resolve('./node_modules/react-scripts/config/webpack.config.prod.js'));
