import React, { useRef, useState, useEffect } from "react";
import CameraView from "./CameraView";
import { useFaceDetection } from "../hooks/useFaceDetection";
import { getFaceScore } from "../utils/faceValidator";

const FaceCamera = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const { landmarks } = useFaceDetection(webcamRef);

  const score = capturedImage ? 0 : getFaceScore(landmarks);
  const validFace = score > 70;

  // Start a visible countdown when a valid face is detected
  useEffect(() => {
    if (!validFace || capturedImage) {
      setCountdown(3);
      return;
    }

    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          setTimeout(() => capturePhoto(), 250);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [validFace, capturedImage]);

  const capturePhoto = () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot?.();

    if (!imageSrc) {
      console.warn("No image captured — webcamRef or getScreenshot not ready");
      return;
    }

    setCapturedImage(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(3);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📸 Full Face Capture System</h2>

      <CameraView ref={webcamRef} />

      <p>Face Score: {score}</p>
      {validFace && !capturedImage && <h3>Capturing in {countdown}...</h3>}

      <h3 style={{ color: validFace ? "green" : "red" }}>
        {validFace ? "✔ Full Face Detected" : "❌ Align Full Face Properly"}
      </h3>

      {capturedImage ? (
        <div>
          <h3>📷 Captured Photo</h3>
          <img src={capturedImage} alt="Captured" width="300" />
          <br />
          <br />
          <button onClick={retakePhoto}>🔄 Retake Photo</button>
        </div>
      ) : null}
    </div>
  );
};

export default FaceCamera;
