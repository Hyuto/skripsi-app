import * as ort from "onnxruntime-web";

export class modelHandler {
  session;

  loadSession = async () => {
    try {
      // on web model is placed on static/model folder. see webpack.config.js
      this.session = await ort.InferenceSession.create(
        `${window.location.origin}/static/model/model.with_runtime_opt.ort`
      );
      console.log("Session loaded!");
    } catch (e) {
      alert("Can't load model!");
      throw e;
    }
  };

  predict = async (text) => {
    if (!this.session) alert("Model is not loaded!");

    let result;
    const input = new ort.Tensor("string", [text], [1, 1]);
    await this.session
      .run({ words: input })
      .then((res) => {
        result = {
          predicted: Number(res.label.data[0]),
          probabilities: Array.from(res.probabilities.data),
        };
      })
      .catch((e) => {
        alert("Failed to predict!.");
        throw e;
      });

    return result;
  };
}
