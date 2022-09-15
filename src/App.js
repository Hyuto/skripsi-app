import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { modelHandler } from "./modelHandler";

const App = () => {
  const model = new modelHandler();

  useEffect(() => {
    model.loadSession().then(async () => {
      const words = "jokowi mau makan";
      const result = await model.predict(words);
      console.log(result);
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-between mx-4 mt-8 mb-6">
        <View className="flex flex-row items-center justify-between w-full">
          <View className="px-2.5 pt-1.5 pb-2 bg-black rounded-lg">
            <Text className="text-3xl text-white font-semibold">Showcase</Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg">Hello from </Text>
          <View className="px-2.5 pt-1.5 pb-2 bg-black rounded-lg">
            <Text className="text-lg text-yellow-400 italic font-semibold">src/App.js!</Text>
          </View>
        </View>
        <View>
          <Text className="text-base text-center">
            <Text className="font-bold">Copyright © {new Date().getFullYear()} Wahyu Setianto</Text>
            , Built with React Native and {"\u2764"}
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default App;
