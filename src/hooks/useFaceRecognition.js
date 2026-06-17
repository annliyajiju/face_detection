import * as faceapi from "face-api.js";

export const loadModels = async () => {
  await faceapi.nets.tinyFaceDetector.loadFromUri(
    "/models"
  );

  console.log("Models Loaded");
};