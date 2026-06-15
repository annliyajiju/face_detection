import React, { forwardRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const CameraView = forwardRef((props, ref) => {
  return (
    <Webcam
      ref={ref}
      audio={false}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
      style={{ width: 400, borderRadius: 10 }}
      {...props}
    />
  );
});

export default CameraView;