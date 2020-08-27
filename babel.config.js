
function isBabelRegister(caller) {
  return !!(caller && (caller.name === "@babel/register" || caller.target === "node"));
}

module.exports = function(api) {
  const isRegister = api.caller(isBabelRegister);
  const presets = ["@babel/preset-env", "@babel/preset-react"]

  const plugins = []
  plugins.push([
      'import',
      {
        libraryName: 'zarm',
        libraryDirectory: 'lib',
        style: !isRegister,
      },
    ])
    api.cache(true)
  return {
    presets,
    plugins,
  };
}
