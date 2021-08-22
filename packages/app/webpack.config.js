const createExpoWebpackConfigAsync = require("@expo/webpack-config");
module.exports = async function (env, argv) {
  console.log('we are being called')
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          "@ptomasroos/react-native-multi-slider",
        ],
      },
    },
    argv
  );
  return config;
};