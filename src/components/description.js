import { Platform, Text, View } from "react-native";

const Description = () => {
  return (
    <View className="flex items-center justify-center">
      <Text className="text-3xl font-semibold text-center">Emotion Detector [ID]</Text>
      <Text className="text-sm text-center mx-2">
        Text emotion detector using <Text className="font-bold">SVM</Text> live in{" "}
        {Platform.OS === "web" ? "browser" : "mobile"} powered by
        <Text className="text-sm font-bold italic">
          {Platform.OS === "web" ? " onnxruntime-web" : " onnxruntime-mobile"}
        </Text>
      </Text>
    </View>
  );
};

export default Description;
