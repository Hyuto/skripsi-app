import * as ort from "onnxruntime-web";

export interface PredInterface {
  predicted: number;
  probabilities: number[];
}

export class modelHandler {
  loadSession = async (): Promise<void> => {
    try {
      // on web model is placed on static/model folder. see webpack.config.js
      (window as any).session = await ort.InferenceSession.create(
        `${window.location.origin}/static/model/model.with_runtime_opt.ort`
      );
      console.log("Session loaded!");
    } catch (e) {
      alert("Can't load model!");
      throw e;
    }
  };

  predict = async (text: string): Promise<PredInterface | undefined> => {
    const session: ort.InferenceSession = (window as any).session;
    if (!session) alert("Model is not loaded!");

    let result: PredInterface | undefined;
    const input = new ort.Tensor("string", [text], [1, 1]);
    await session
      .run({ words: input })
      .then((res) => {
        result = {
          predicted: Number(res.label.data[0] as bigint),
          probabilities: Array.from(res.probabilities.data as Float32Array),
        };
      })
      .catch((e) => {
        alert("Failed to predict!.");
        throw e;
      });

    return result;
  };
}
