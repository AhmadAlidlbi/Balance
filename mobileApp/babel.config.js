module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-iconify/plugin", { scale: 1.5 }],
      ["react-native-reanimated/plugin"],
    ],
  };
};
