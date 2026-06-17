import React, { useRef, useState, useEffect, useCallback } from "react";
import CameraView from "./CameraView";
import { useFaceDetection } from "../hooks/useFaceDetection";
import { getFaceScore } from "../utils/faceValidator";
import { compareFaces } from "../utils/faceMatcher";

const FaceCamera = () => {
  const webcamRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [webcamReady, setWebcamReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [captureMessage, setCaptureMessage] = useState("");
  const [status, setStatus] = useState("");

  const { landmarks, faceCount } = useFaceDetection(webcamRef);

  const score = landmarks ? getFaceScore(landmarks) : 0;

  const validFace =
    landmarks &&
    score > 70 &&
    faceCount === 1;

  const videoReady =
    !!webcamRef.current?.video?.readyState &&
    webcamRef.current.video.readyState >= 3;

  const capturePhoto = useCallback(() => {
    if (
      !webcamRef.current ||
      !webcamRef.current.getScreenshot ||
      !videoReady
    ) {
      setCaptureMessage("Waiting for video...");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) {
      setCaptureMessage("Capture failed");
      return;
    }

    setCapturedImage(imageSrc);
    setCaptureMessage("Image captured!");
  }, [videoReady]);

  useEffect(() => {
    if (
      !webcamReady ||
      !videoReady ||
      !validFace ||
      capturedImage
    ) {
      setCountdown(3);
      return;
    }

    if (countdown <= 0) {
      capturePhoto();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    webcamReady,
    videoReady,
    validFace,
    capturedImage,
    countdown,
    capturePhoto,
  ]);

  const registerFace = () => {
    if (!validFace) {
      alert("Align your face properly");
      return;
    }

    if (faceCount !== 1) {
      alert("Only one face allowed");
      return;
    }

    localStorage.setItem(
      "registeredFace",
      JSON.stringify(landmarks)
    );

    setStatus("✅ Face Registered Successfully");
  };

  const authenticateFace = () => {
    if (!validFace) {
      alert("Align your face properly");
      return;
    }

    if (faceCount !== 1) {
      alert("Only one face allowed");
      return;
    }

    const registered = JSON.parse(
      localStorage.getItem("registeredFace")
    );

    if (!registered) {
      alert("No registered face found");
      return;
    }

    const matched = compareFaces(
      registered,
      landmarks
    );

    if (matched) {
      setStatus("✅ Authentication Success");
    } else {
      setStatus("❌ Authentication Failed");
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(3);
    setCaptureMessage("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📸 Face Authentication System</h2>

      <CameraView
        ref={webcamRef}
        onUserMedia={() => {
          setWebcamReady(true);
          setCameraError(null);
        }}
        onUserMediaError={(error) => {
          setCameraError(
            error?.message || "Unable to access camera"
          );
        }}
      />

      {cameraError ? (
        <p style={{ color: "red" }}>
          {cameraError}
        </p>
      ) : (
        <p>
          Face Score:{" "}
          {landmarks
            ? score.toFixed(2)
            : "Waiting for face detection..."}
        </p>
      )}

      {validFace && !capturedImage && (
        <>
          <h3>Capturing in {countdown}...</h3>
          <p>{captureMessage}</p>
        </>
      )}

      <div style={{ margin: "20px" }}>
        <button
          onClick={registerFace}
          disabled={!validFace}
        >
          Register Face
        </button>

        <button
          onClick={authenticateFace}
          disabled={!validFace}
          style={{ marginLeft: "10px" }}
        >
          Authenticate
        </button>
      </div>

      <h3
        style={{
          color: validFace ? "green" : "red",
        }}
      >
        {validFace
          ? "✔ Full Face Detected"
          : "❌ Align Full Face Properly"}
      </h3>

      {faceCount > 1 && (
        <h3 style={{ color: "red" }}>
          ❌ Multiple Faces Detected
        </h3>
      )}

      {status && <h3>{status}</h3>}

      {capturedImage && (
        <div>
          <h3>📷 Captured Photo</h3>

          <img
            src={capturedImage}
            alt="Captured"
            width="300"
          />

          <br />
          <br />

          <button onClick={retakePhoto}>
            🔄 Retake Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default FaceCamera;