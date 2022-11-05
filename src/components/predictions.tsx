import { FC } from "react";
import { View } from "react-native";
import { PredInterface } from "../modelHandler";
import Card from "./card";

interface PredictionsInterface {
  prediction: PredInterface | null;
}

const Predictions: FC<PredictionsInterface> = ({ prediction }) => {
  return (
    <>
      {prediction && (
        <View className="flex justify-center items-center">
          <View className="flex-row justify-center flex-wrap mt-2 max-w-sm">
            <Card
              emoji="😲"
              label="Surprise"
              percentage={prediction.probabilities[1]}
              selected={prediction.predicted == 1}
            />
            <Card
              emoji="😊"
              label="Happiness"
              percentage={prediction.probabilities[2]}
              selected={prediction.predicted == 2}
            />
            <Card
              emoji="😠"
              label="Anger"
              percentage={prediction.probabilities[3]}
              selected={prediction.predicted == 3}
            />
            <Card
              emoji="😨"
              label="Fear"
              percentage={prediction.probabilities[4]}
              selected={prediction.predicted == 4}
            />
            <Card
              emoji="🤢"
              label="Disgust"
              percentage={prediction.probabilities[5]}
              selected={prediction.predicted == 5}
            />
            <Card
              emoji="😢"
              label="Sadness"
              percentage={prediction.probabilities[6]}
              selected={prediction.predicted == 6}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default Predictions;
