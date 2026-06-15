import React, { useRef, useState, useEffect } from "react";
import CameraView from "./CameraView";
import { useFaceDetection } from "../hooks/useFaceDetection";
import { getFaceScore } from "../utils/faceValidator";

const FaceCamera = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [webcamReady, setWebcamReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [captureMessage, setCaptureMessage] = useState("");
  const { landmarks,faceCount } = useFaceDetection(webcamRef);
  const score = landmarks ? getFaceScore(landmarks) : 0;
  const validFace = score > 70&& faceCount === 1; // Ensure only one face is detecteds
  const videoReady = !!webcamRef.current?.video?.readyState && webcamRef.current.video.readyState >= 3;

  useEffect(() => {
    if (!webcamReady || !videoReady || !validFace || capturedImage) {
      setCountdown(3);
      setCaptureMessage("");
      return;
    }

    if (!webcamRef.current?.getScreenshot) {
      setCaptureMessage("Waiting for webcam screenshot readiness...");
      return;
    }

    setCaptureMessage("Preparing to capture...");

    if (countdown <= 0) {
      capturePhoto();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [webcamReady, videoReady, validFace, capturedImage, countdown]);

  const capturePhoto = () => {
    console.log("capturePhoto called", {
      webcamReady,
      videoReady,
      validFace,
      capturedImage,
      countdown,
      screenshotReady: !!webcamRef.current?.getScreenshot,
      videoSrcObject: !!webcamRef.current?.video?.srcObject,
      readyState: webcamRef.current?.video?.readyState,
    });

    if (!webcamRef.current || !webcamRef.current.getScreenshot || !videoReady) {
      setCaptureMessage("Waiting for video to become ready...");
      setCountdown(1);
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    console.log("screenshot result", { imageSrc });

    if (!imageSrc) {
      setCaptureMessage("Capture failed. Retrying...");
      setCountdown(1);
      return;
    }

    setCaptureMessage("Image captured!");
    setCapturedImage(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(3);
    setCaptureMessage("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📸 Full Face Capture System</h2>

      <CameraView
        ref={webcamRef}
        onUserMedia={() => {
          setWebcamReady(true);
          setCameraError(null);
        }}
        onUserMediaError={(error) => {
          setCameraError(error?.message || "Unable to access camera.");
        }}
      />

      {cameraError ? (
        <p style={{ color: "red" }}>{cameraError}</p>
      ) : (
        <p>Face Score: {landmarks ? score : "Waiting for face detection..."}</p>
      )}

      {validFace && !capturedImage ? (
        <>
          <h3>Capturing in {countdown}...</h3>
          <p style={{ color: "#555" }}>{captureMessage}</p>
          <p style={{ color: "#999", fontSize: "0.9rem" }}>
            Webcam ready: {webcamReady ? "yes" : "no"}
          </p>
        </>
      ) : null}

      <h3 style={{ color: validFace ? "green" : "red" }}>
        {validFace ? "✔ Full Face Detected" : "❌ Align Full Face Properly"}
      </h3>

      {!capturedImage && !validFace && (
        <p style={{ color: "#555" }}>
          Automatic capture starts when your face is fully aligned.
        </p>
        
      )}
      {faceCount > 1 && (
  <h3 style={{ color: "red" }}>
    ❌ Multiple Faces Detected
  </h3>
)}

      {capturedImage ? (
        <div>
          <h3>📷 Captured Photo</h3>
          <img src={capturedImage} alt="Captured" width="300" />
          <br />
          <br />
          <button type="button" onClick={retakePhoto}>
            🔄 Retake Photo
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FaceCamera;
