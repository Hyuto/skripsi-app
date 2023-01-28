module.exports = {
  expo: {
    name: "skripsi-app",
    slug: "skripsi-app",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FFFFFF",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.hyuto.skripsiapp",
    },
    web: {
      description:
        "Indonesian language emotion detector right in the browser using onnxruntime-web",
      lang: "id",
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "b8a0037d-5ad3-4ef0-9e4d-49f99988f935",
      },
    },
  },
};