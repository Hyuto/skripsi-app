import { Asset } from "expo-asset";
import { NativeModules } from "react-native";
const { ONNXModel } = NativeModules;

export interface PredInterface {
  predicted: number;
  probabilities: number[];
}

export class modelHandler {
  loadSession = async (modelName: string): Promise<void> => {
    const assets = await Asset.loadAsync(require(`../../assets/model/${modelName}`));
    const modelUri = assets[0].localUri?.slice(7); // change from 'file::/data/...' to '/data/...'
    await ONNXModel.loadModel(modelUri);
  };

  predict = async (text: string): Promise<PredInterface | undefined> => {
    const resultString: string = await ONNXModel.predict(text);
    let result: PredInterface | undefined;
    if (resultString !== "") {
      const parsed: PredInterface = JSON.parse(resultString);
      result = {
        predicted: parsed.predicted,
        probabilities: parsed.probabilities.map((num) => num * 100),
      };
    }
    return result;
  };
}
