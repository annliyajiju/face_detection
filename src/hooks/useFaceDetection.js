import { useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

export const useFaceDetection = (videoRef) => {
  const [landmarks, setLandmarks] = useState(null);

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      console.log(
        "Faces Found:",
        results.multiFaceLandmarks?.length || 0
      );

      if (
        results.multiFaceLandmarks &&
        results.multiFaceLandmarks.length > 0
      ) {
        setLandmarks(results.multiFaceLandmarks[0]);
      } else {
        console.log("NO FACE DETECTED");
        setLandmarks(null);
      }
    });

    const interval = setInterval(() => {
      const video = videoRef.current?.video;

      if (!video) return;

      clearInterval(interval);

      const camera = new Camera(video, {
        onFrame: async () => {
          await faceMesh.send({ image: video });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [videoRef]);

  return {
    landmarks,
    clearLandmarks: () => setLandmarks(null),
  };
};