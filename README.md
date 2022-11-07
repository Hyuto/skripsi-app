# Skripsi Application

![Typescript](https://img.shields.io/badge/Typescript-white?logo=typescript)
![expo](https://img.shields.io/badge/Expo-white?logo=expo&logoColor=black)
![react-native](https://img.shields.io/badge/React_Native-white?logo=react)
![onnxruntime](https://img.shields.io/badge/onnxruntime-white?logo=onnx&logoColor=black)
![tailwindcss](https://img.shields.io/badge/tailwindcss-white?logo=tailwindcss)

Skripsi application to test model trained on research live in the browser and android powered by
`React Native` and `onnxruntime`.

## Status

| Platforms |                                       Status                                       |                                                                                                 |
| :-------: | :--------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------- |
|  Android  | ![android](https://img.shields.io/badge/Passed-green?logo=android&logoColor=white) | Run preprocessing and model nattively, there is bug on theme toggler.                           |
|    IOS    |         ![ios](https://img.shields.io/badge/Not_implemented-red?logo=ios)          | Can't afford ☕                                                                                 |
|    Web    |          ![android](https://img.shields.io/badge/Passed-blue?logo=react)           | Run preprocessing on python side using `pyodide` and run model natively using `onnxruntime-web` |

## TODO

1. Update model
2. Fixing theme toggler in android
3. Reducing wasm size on `onnxruntime-web` (if possible)

## Used Technologies

1. `React Native` with `Expo`
2. `Nativewind` to use `tailwindcss` on rn app.
3. `Pyodide` to run python on the web using web assembly
4. `Sastrawi`: `PySastrawi` on the web and `Jsastrawi` on android.
5. onnxruntime: `custom-build-onnxruntime-mobile` on android and `onnxruntime-web` on web

## Build

**Android** : Production build using EAS

```bash
eas build --platform android
```

**Web**

```bash
npx expo export:web
```

## Model

View used model architecture in this application in [netron.app](https://netron.app/?url=https://raw.githubusercontent.com/Hyuto/skripsi-app/master/assets/model/model.with_runtime_opt.ort).
