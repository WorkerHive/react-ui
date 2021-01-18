module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    'babel-plugin-typescript-to-proptypes'
  ],
  ignore: ["node_modules", "src/stories"]
}
