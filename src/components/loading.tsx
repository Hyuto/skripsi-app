import { FC } from "react";
import { ActivityIndicator, Image, Platform, Text, View } from "react-native";
import { useColorScheme } from "nativewind";

const imageUri = require("../../assets/icon.png");

const Loading: FC<{ progress: string | null }> = ({ progress }) => {
  const { colorScheme } = useColorScheme();

  return (
    <>
      {progress && (
        <View className="flex-1 absolute left-0 top-0 w-full h-full items-center justify-center bg-white dark:bg-neutral-900">
          <Image source={imageUri} className="w-80 h-80 rounded-xl" />
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="large" color={colorScheme === "dark" ? "white" : "black"} />
            <Text className="m-8 text-lg font-semibold dark:text-white">{progress}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Loading;
