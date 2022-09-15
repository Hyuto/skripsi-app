//import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
//import * as ort from "onnxruntime-web";

const App = () => {
  /* useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await ort.InferenceSession.create(
          `${window.location.origin}/static/model/model.with_runtime_opt.ort`
        );
        console.log(session);
      } catch (e) {
        alert("Can't load model!");
        throw e;
      }
    };

    //loadSession();
  }, []); */

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="flex flex-row items-center">
        <Text className="text-lg">Hello from </Text>
        <View className="px-2.5 pt-1.5 pb-2 bg-black rounded-lg">
          <Text className="text-lg text-yellow-400 italic font-semibold">src/App.js!</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
