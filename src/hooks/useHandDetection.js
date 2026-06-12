import { useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export const useHandDetection = (videoRef) => {
  const [hands, setHands] = useState([]);

  useEffect(() => {
    const handsDetector = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    handsDetector.setOptions({
      maxNumHands: 2,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    handsDetector.onResults((results) => {
      setHands(results.multiHandLandmarks || []);
    });

    const video = videoRef.current?.video;
    if (!video) return;

    const camera = new Camera(video, {
      onFrame: async () => {
        await handsDetector.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => camera.stop();
  }, [videoRef]);

  return hands;
};