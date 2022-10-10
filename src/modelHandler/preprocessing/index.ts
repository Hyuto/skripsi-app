import { NativeModules } from "react-native";

export class Preprocessing {
  init = async (): Promise<void> => {
    const emojiData = JSON.stringify(require("./emoji-data.json"));
    const slangData = JSON.stringify(require("./slang-data.json"));

    await NativeModules.Preprocessing.init(emojiData, slangData);
  };

  run = (text: string): string => NativeModules.Preprocessing.run(text);
}
