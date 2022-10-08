# Skripsi Application

Skripsi application to test model trained on research live in the browser and android powered by
`react-native` and `onnxruntime-web`.

## TODO

1. Deploy trained model
2. Make preprocessing on native
3. Make server side prediction for mobile

## Known Issues

1. Theme toggler in android

## Used Technologies

1. React Native with Expo
2. onnxruntime: `custom-build-onnxruntime-mobile` on android and `onnxruntime-web` on web

## Build

**Production build using EAS**

```bash
eas build --platform android
```
