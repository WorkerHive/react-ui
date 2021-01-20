const tsj = require('silly-ts-json-schema-generator')
const fs = require('fs');

let dirs = fs.readdirSync(__dirname + '/components', {withFileTypes: true}).filter((a) => a.isDirectory()).map(dir => dir.name);

let types = {};

console.log("Making runtime react type docs")

dirs.forEach((dir, ix) => {
  const config = {
    path: __dirname + '/components/' + dir + '/index.tsx',
    tsconfig: __dirname + '/../tsconfig.json'
  }
  const schema = tsj.createGenerator(config).createSchema('*');

  types = {
    ...types,
    ...schema.definitions
  };
  console.log(`${((ix / dirs.length) * 100).toFixed(2)}%`)
})

fs.writeFileSync(__dirname+ '/../dist/prop-spec.js', `module.exports = ${JSON.stringify(types)}`)

console.log("Finished writing prop-spec.js")
