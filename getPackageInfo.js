const packageInfo = require('./package.json');

const depKeys = Object.keys(packageInfo.dependencies);
const devDepKeys = Object.keys(packageInfo.devDependencies);

console.log(`depKeys---  ${depKeys.join(' ')}`);

console.log('-----------------------');

console.log(`devDepKeys---  ${devDepKeys.join(' ')}`);
// console.log(devDepKeys.join(' '))
