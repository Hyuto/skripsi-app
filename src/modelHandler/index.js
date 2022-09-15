import { Asset } from "expo-asset";
import { NativeModules } from "react-native";
const { ONNXModel } = NativeModules;

export class modelHandler {
  loadSession = async () => {
    const assets = await Asset.loadAsync(require("../../assets/model/model.with_runtime_opt.ort"));
    const modelUri = assets[0].localUri.slice(7); // change from 'file::/data/...' to '/data/...'
    await ONNXModel.loadModel(modelUri);
  };

  predict = async (text) => {
    const resultString = await ONNXModel.predict(text);
    const result = JSON.parse(resultString);
    return result;
  };
}
