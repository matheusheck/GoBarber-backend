module.exports = {
  presets: [
  ['@babel/preset-env', { tardets: { node: 'current' } }],
  '@babel/preset-typescript'
  ],
  plugins:[
    ['module.resolver', {
      alias: {
      "@module": "./src/modules",
      "@config": "./src/config",
      "@shared": "./src/shared"
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true}]
  ],
}
