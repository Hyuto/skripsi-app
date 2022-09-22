import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform, Pressable, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Description from "./components/description";
import Card from "./components/card";
//import { modelHandler } from "./modelHandler";

const App = () => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const { colorScheme, setColorScheme } = useColorScheme();
  //const model = new modelHandler();

  // handle toggle theme on web
  useEffect(() => {
    if (Platform.OS === "web")
      document.getElementsByTagName("html")[0].className = colorScheme === "dark" ? "dark" : "";
  }, [colorScheme]);

  useEffect(() => {
    /* model.loadSession().then(async () => {
      const words = "jokowi mau makan";
      const result = await model.predict(words);
      console.log(result);
    }); */
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View
        className={`flex-1 items-center justify-between mx-4 mb-4 ${
          Platform.OS === "web" ? "mt-4" : "mt-9"
        }`}
      >
        <View className="flex-row items-center w-full justify-between">
          <View className="px-2.5 pt-1.5 pb-2 bg-black dark:bg-violet-900 rounded-lg">
            <Text className="text-3xl text-white font-semibold">Showcase</Text>
          </View>
          <Pressable
            onPress={() => {
              setColorScheme(colorScheme === "dark" ? "light" : "dark");
            }}
          >
            {colorScheme === "dark" ? (
              <MaterialCommunityIcons name="weather-sunny" size={35} color="white" />
            ) : (
              <MaterialCommunityIcons name="weather-night" size={35} color="black" />
            )}
          </Pressable>
        </View>
        <View className="flex items-center w-full">
          <Description />
          <View className="flex w-full max-w-[550px] my-4">
            <TextInput
              onChangeText={setText}
              value={text}
              placeholder="Any words to detect?"
              multiline
              className="p-3 mx-5 border rounded text-md text-center dark:border-violet-800 dark:text-white"
            />
            <View className="flex-row justify-center my-4">
              <Pressable
                className="bg-black p-2.5 pt-3 rounded mx-2 dark:bg-violet-800"
                onPress={() => {
                  // TODO: Implement detect()
                  if (text !== "") setPrediction(text);
                  else Alert.alert("Null text submitted!", "Please type a text to detect.");
                }}
              >
                <Text className="text-white font-bold">Predict</Text>
              </Pressable>
              <Pressable
                className="bg-transparent border-2 border-black p-2.5 rounded mx-2 dark:border-violet-800"
                onPress={() => {
                  setText("");
                  setPrediction(null);
                }}
              >
                <Text className="font-bold dark:text-violet-800">Reset</Text>
              </Pressable>
            </View>
            {prediction && (
              <View className="flex justify-center items-center">
                <View className="flex-row justify-center flex-wrap mt-1 max-w-sm">
                  <Card emoji="😲" label="Surprise" percentage={70.5216} />
                  <Card emoji="😲" label="Surprise" percentage={70} />
                  <Card emoji="😲" label="Surprise" percentage={70} />
                  <Card emoji="😲" label="Surprise" percentage={70} />
                  <Card emoji="😲" label="Surprise" percentage={70} />
                  <Card emoji="😲" label="Surprise" percentage={70} />
                </View>
              </View>
            )}
          </View>
        </View>
        <View>
          <Text className="text-base text-center dark:text-white">
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
