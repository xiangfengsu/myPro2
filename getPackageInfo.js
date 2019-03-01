const packageInfo = require('./package.json');

const depKeys = Object.keys(packageInfo.dependencies);
const devDepKeys = Object.keys(packageInfo.devDependencies);

console.log(depKeys.join(' '));
// console.log(devDepKeys.join(' '))
