import React, { useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Stemmer, Tokenizer } from "sastrawijs";
import { Bar } from "react-chartjs-2";
import Loader from "./components/loader";
import * as style from "./style/Main.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Main = () => {
  // TODO: Update labels and background color on chart
  const labels = ["Negatif", "Netral", "Positif"];
  const stemmer = new Stemmer();
  const tokenizer = new Tokenizer();
  const [words, setWords] = useState("");
  const [prediction, setPrediction] = useState({
    class: null,
    probability: new Array(labels.length).fill(0),
  });
  const [loading, setLoading] = useState({ state: true, message: "Loading model..." });
  const [model, setModel] = useState(null);
  const chart = useRef(null);

  const preprocess = (words) => {
    const tokens = tokenizer.tokenize(words);
    return tokens.map((word) => stemmer.stem(word)).join(" ");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (words === "") alert("Please input words!");
    else if (model) {
      const input = new ort.Tensor("string", [preprocess(words)], [1, 1]);
      console.log(input);
      await model
        .run({ words: input })
        .then((results) => {
          setPrediction({
            class: labels[results.label.data[0]],
            probability: Array.from(results.probabilities.data),
          });
        })
        .catch((error) => {
          alert("Failed to predict!.");
          console.error(error);
        });
    } else alert("Model isn't loaded!");
  };

  return (
    <main>
      {/* TODO : Create main content */}
      <div className={style.SADWrapper}>
        <div className={style.title}>
          <h2>{/* TODO: Update Title */}TITLE</h2>
          <p>
            Text emotion detector using <strong>{/* TODO: Update this */}DESCRIPTION</strong> live
            in browser powered by <code>onnxruntime-web</code> with <code>wasm</code> backend.{" "}
            <strong>
              {/* TODO: Update source code link */}
              <a href="#" rel="noreferrer" target="_blank">
                source code
              </a>
            </strong>
          </p>
        </div>
        <div className={style.content}>
          <Loader style={{ display: loading.state ? "inherit" : "none" }}>{loading.message}</Loader>
          <div className={style.main}>
            <form className={style.form}>
              <div className={style.title}>Words</div>
              <textarea
                className={style.words}
                value={words}
                onChange={(e) => setWords(e.target.value)}
              ></textarea>
            </form>
            <div className={style.chart}>
              <Bar
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "# Probabilitiy",
                      data: prediction.probability,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                      ],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  indexAxis: "y",
                  elements: {
                    bar: {
                      borderWidth: 2,
                    },
                  },
                  responsive: true,
                  scales: {
                    x: {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                    y: {
                      stacked: true,
                    },
                  },
                }}
                ref={chart}
              />
            </div>
          </div>
          <div className={style.btnWrapper}>
            <button onClick={onSubmit}>Submit</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setWords("");
                setPrediction({ class: null, proba: null });
              }}
            >
              Reset
            </button>
          </div>
          <div className={style.prediction}>
            {prediction.class ? `Prediction : ${prediction.class}` : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
