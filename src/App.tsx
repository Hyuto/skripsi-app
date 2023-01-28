import { FC, useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform, Pressable, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Picker } from "@react-native-picker/picker";
import Predictions from "./components/predictions";
import Loading from "./components/loading";
import { modelHandler, PredInterface } from "./modelHandler";
import { Preprocessing } from "./modelHandler/preprocessing";

const App: FC = () => {
  const [loading, setLoading] = useState<string | null>("Loading Model...");
  const [text, setText] = useState<string>("");
  const [prediction, setPrediction] = useState<PredInterface | null>(null);
  const { colorScheme, setColorScheme } = useColorScheme();
  const model = new modelHandler();
  const [selectedModel, setSelectedModel] = useState<string>("model-svm-linear-small.ort");
  const preprocessing = useRef<Preprocessing | null>(null);

  const predict = async () => {
    if (text !== "") {
      const cleanedText = preprocessing.current?.run(text) as string;
      const pred = await model.predict(cleanedText);
      if (pred) setPrediction(pred);
    } else Alert.alert("Null text submitted!", "Please type a text to detect.");
  };

  // handle toggle theme on web
  useEffect(() => {
    if (Platform.OS === "web")
      document.getElementsByTagName("html")[0].className = colorScheme === "dark" ? "dark" : "";
  }, [colorScheme]);

  useEffect(() => {
    const prepare = async (): Promise<void> => {
      await model.loadSession(selectedModel);

      if (Platform.OS === "web") {
        setLoading("Loading Pyodide...");
        const pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");
        const micropip = pyodide.pyimport("micropip");

        setLoading("Installing pydeps on pyodide...");
        await micropip.install(["indoNLP", "PySastrawi"]);

        (window as any).pyodide = pyodide;
      }

      preprocessing.current = new Preprocessing();
      await preprocessing.current.init();
      setLoading(null);
    };

    prepare();
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
          <View className="flex items-center justify-center">
            <Text className="text-3xl font-semibold text-center dark:text-white">
              Emotion Detector [ID]
            </Text>
            <Text className="text-sm text-center mx-2 dark:text-white">
              Text emotion detector using <Text className="font-bold">SVM</Text> live in{" "}
              {Platform.OS === "web" ? "browser" : "mobile"} powered by
              <Text className="text-sm font-bold italic">
                {Platform.OS === "web" ? " onnxruntime-web" : " onnxruntime-mobile"}
              </Text>
            </Text>
            {Platform.OS === "web" && (
              <Picker
                style={{
                  marginTop: "6px",
                  padding: "5px",
                  paddingTop: "3px",
                  backgroundColor: "black",
                  color: "#A3E635",
                  borderRadius: 4,
                  fontSize: 14,
                  lineHeight: 20,
                }}
                selectedValue={selectedModel}
                onValueChange={async (itemValue) => {
                  setLoading(`Loading model ${itemValue}`);
                  await model.loadSession(itemValue);
                  setSelectedModel(itemValue);
                  setLoading(null);
                }}
              >
                <Picker.Item
                  label="model-svm-linear-small.ort"
                  value="model-svm-linear-small.ort"
                />
                <Picker.Item
                  label="model-svm-linear-medium.ort"
                  value="model-svm-linear-medium.ort"
                />
                <Picker.Item
                  label="model-svm-linear-large.ort"
                  value="model-svm-linear-large.ort"
                />
              </Picker>
            )}
          </View>

          <View className="flex w-full max-w-[550px] mb-4 mt-3">
            <TextInput
              onChangeText={setText}
              value={text}
              placeholder="Any words to detect?"
              multiline
              className="p-3 mx-5 border rounded text-md text-center dark:border-violet-800 dark:text-white"
              onKeyPress={(e: any) => {
                if (e.nativeEvent.ctrlKey && e.nativeEvent.key == "Enter") {
                  e.preventDefault();
                  predict();
                } else if (e.nativeEvent.ctrlKey && e.nativeEvent.key == "Backspace") {
                  e.preventDefault();
                  setText("");
                  setPrediction(null);
                }
              }}
            />
            <View className="flex-row justify-center mt-4">
              <Pressable
                className="bg-black p-2.5 pt-3 rounded mx-2 dark:bg-violet-800"
                onPress={predict}
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
            <Predictions prediction={prediction} />
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
      <Loading progress={loading} />
    </View>
  );
};

export default App;
