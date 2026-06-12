import React, { forwardRef } from "react";
import Webcam from "react-webcam";

const CameraView = forwardRef((props, ref) => {
  return (
    <Webcam
      ref={ref}
      audio={false}
      style={{ width: 400, borderRadius: 10 }}
      scenshotFormat="image/jpeg"
    />
  );
});

export default CameraView;