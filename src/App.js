import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import Description from "./components/description";
import Card from "./components/card";
//import { modelHandler } from "./modelHandler";

const App = () => {
  // const model = new modelHandler();
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    /* model.loadSession().then(async () => {
      const words = "jokowi mau makan";
      const result = await model.predict(words);
      console.log(result);
    }); */
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-between mx-4 mt-9 lg:mt-4 mb-4">
        <View className="flex-row items-center w-full">
          <View className="px-2.5 pt-1.5 pb-2 bg-black rounded-lg">
            <Text className="text-3xl text-white font-semibold">Showcase</Text>
          </View>
        </View>
        <View className="flex items-center w-full">
          <Description />
          <View className="flex w-full max-w-[550px] my-4">
            <TextInput
              onChangeText={setText}
              value={text}
              placeholder="Any words to detect?"
              multiline
              className="p-3 mx-5 border rounded text-md text-center"
            />
            <View className="flex-row justify-center my-4">
              <Pressable
                className="bg-black p-2.5 pt-3 rounded mx-2"
                onPress={() => {
                  // TODO: Implement detect()
                  setPrediction(text);
                }}
              >
                <Text className="text-white font-bold">Predict</Text>
              </Pressable>
              <Pressable
                className="bg-transparent border-2 border-black p-2.5 rounded mx-2"
                onPress={() => {
                  setText("");
                  setPrediction(null);
                }}
              >
                <Text className="font-bold">Reset</Text>
              </Pressable>
            </View>
            {prediction && (
              <View className="flex-row justify-center flex-wrap mt-2">
                <Card emoji="😲" label="Surprise" percentage={70.5216} />
                <Card emoji="😲" label="Surprise" percentage={70} />
                <Card emoji="😲" label="Surprise" percentage={70} />
                <Card emoji="😲" label="Surprise" percentage={70} />
                <Card emoji="😲" label="Surprise" percentage={70} />
                <Card emoji="😲" label="Surprise" percentage={70} />
              </View>
            )}
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
