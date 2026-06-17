import * as faceapi from "face-api.js";

export const loadModels = async () => {
  console.log("Loading Models...");

  await faceapi.nets.tinyFaceDetector.loadFromUri(
    "/models"
  );

  console.log("Models Loaded");
};