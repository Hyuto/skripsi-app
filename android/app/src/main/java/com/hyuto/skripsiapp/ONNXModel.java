package com.hyuto.skripsiapp;

import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import ai.onnxruntime.OnnxTensor;
import ai.onnxruntime.OrtEnvironment;
import ai.onnxruntime.OrtException;
import ai.onnxruntime.OrtSession;
import ai.onnxruntime.OrtSession.Result;
import ai.onnxruntime.OrtSession.SessionOptions;

import java.util.Map;
import java.util.Arrays;

public class ONNXModel extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static OrtEnvironment env;
    private static OrtSession session;
    private static SessionOptions sessionOption;

    ONNXModel(ReactApplicationContext context) throws Exception {
        super(context);
    }

    @Override
    public String getName() {
        return "ONNXModel";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void loadModel(String path) {
        Log.d("ONNXModel", "loadModel from " + path);
        try {
            env = OrtEnvironment.getEnvironment();
            sessionOption = new SessionOptions();
            session = env.createSession(path, sessionOption);
            Log.d("ONNXModel", session.toString());
        } catch (OrtException e) {
            Log.e("ONNXModel", "Error on loadModel!", e);
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String predict(String word) {
        Log.d("ONNXModel", "predicting : " + word);
        String[] words = { word };
        long[] dimensions = { 1, 1 };
        try {
            OnnxTensor tensor = OnnxTensor.createTensor(env, words, dimensions);
            Map<String, OnnxTensor> inputs = Map.of("words", tensor);
            Result results = session.run(inputs);

            long[] labels = (long[]) results.get(0).getValue();
            float[][] probabilities = (float[][]) results.get(1).getValue();
            // convert to JSON formatted string
            String result = "{ \"predicted\": " + labels[0] +
                    ", \"probabilities\": " + Arrays.toString(probabilities[0]) + " }";
            Log.d("ONNXModel", "Predicted: " + result);
            return result;
        } catch (Exception e) {
            Log.e("ONNXModel", "Error on predict!", e);
            return "";
        }
    }
}
