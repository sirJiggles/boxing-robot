/* eslint-disable @typescript-eslint/no-var-requires */
const createExpoWebpackConfigAsync = require('@expo/webpack-config')
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          '@ptomasroos/react-native-multi-slider',
        ],
      },
    },
    argv
  )
  return config
}
