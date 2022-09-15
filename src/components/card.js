import { Text, View } from "react-native";

const Card = ({ emoji, label, percentage }) => {
  return (
    <View className="flex items-center m-2 px-4 py-2 bg-yellow-200 rounded-lg">
      <Text className="text-3xl">{emoji}</Text>
      <Text className="text-sm font-semibold">{label}</Text>
      <Text className="text-sm">{percentage % 1 === 0 ? percentage : percentage.toFixed(2)}%</Text>
    </View>
  );
};

export default Card;
