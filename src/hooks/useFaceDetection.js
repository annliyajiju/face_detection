import { useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";

export const useFaceDetection = (videoRef) => {
  const [landmarks, setLandmarks] = useState(null);
  const [faceCount, setFaceCount] = useState(0);
  const [multiLandmarks, setMultiLandmarks] = useState([]);

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      // allow detecting multiple faces so we can reject when more than one is present
      maxNumFaces: 4,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      const multi = results.multiFaceLandmarks || [];
      const faces = multi.length;
      setFaceCount(faces);
      // when there is not exactly one face, do not provide a landmarks object
      if (faces !== 1) {
        setLandmarks(null);
        setMultiLandmarks(multi);
        return;
      }

      setLandmarks(multi[0]);
      setMultiLandmarks(multi);
    });

    let isActive = true;
    const detectionLoop = async () => {
      const video = videoRef.current?.video;
      if (!isActive || !video || video.readyState < 3) return;

      try {
        await faceMesh.send({ image: video });
      } catch (error) {
        console.error("FaceMesh detection failed:", error);
      }
    };

    const interval = setInterval(() => {
      if (!isActive) return;
      const video = videoRef.current?.video;

      if (!video || video.readyState < 3) return;
      detectionLoop();
    }, 100);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [videoRef]);

  return {
    landmarks,
    multiLandmarks,
    faceCount,
    clearLandmarks: () => setLandmarks(null),
  };
};