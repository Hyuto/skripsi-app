const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["nativewind"],
      },
    },
    argv
  );

  config.module.rules.push({
    test: /\.css$/i,
    use: ["postcss-loader"],
  });

  // Copy model to static file
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: "node_modules/onnxruntime-web/dist/*.wasm", to: "static/js/[name].[ext]" },
        { from: "assets/model", to: "static/model" },
      ],
    })
  );

  return config;
};
