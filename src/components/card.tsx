import { FC } from "react";
import { Text, View } from "react-native";

interface CardInterface {
  emoji: string;
  label: string;
  percentage: number;
  selected: boolean;
}

const Card: FC<CardInterface> = ({ emoji, label, percentage, selected }) => {
  return (
    <View
      className={`flex items-center m-2 px-4 py-2 rounded-lg ${
        selected ? "bg-lime-400" : "bg-yellow-200"
      }`}
    >
      <Text className="text-3xl">{emoji}</Text>
      <Text className="text-sm font-semibold dark">{label}</Text>
      <Text className="text-sm">{percentage % 1 === 0 ? percentage : percentage.toFixed(2)}%</Text>
    </View>
  );
};

export default Card;
