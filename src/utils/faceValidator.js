

export const getFaceScore = (lm) => {
  if (!lm || lm.length < 468) {
    console.log("No face detected");
    return 0;
  }
  console.log("Calculating face score with landmarks:", lm.length);
  // Face bounds
  const leftFace = lm[234];
  const rightFace = lm[454];
  const forehead = lm[10];
  const chin = lm[152];
  const nose = lm[1];

  // Face dimensions
  const width = Math.abs(rightFace.x - leftFace.x);
  const height = Math.abs(chin.y - forehead.y);

  // -------------------------
  // Symmetry Check
  // -------------------------

  const leftDist =
    Math.abs(nose.x - leftFace.x);

  const rightDist =
    Math.abs(rightFace.x - nose.x);

  const symmetry =
    Math.min(leftDist, rightDist) /
    Math.max(leftDist, rightDist);

  if (symmetry < 0.6) {
    console.log("Face not facing forward");
    return 0;
  }

  // -------------------------
  // Eye Visibility Check
  // -------------------------

  const leftEyeWidth =
    Math.abs(lm[133].x - lm[33].x);

  const rightEyeWidth =
    Math.abs(lm[263].x - lm[362].x);

  if (
    leftEyeWidth < 0.01 ||
    rightEyeWidth < 0.01
  ) {
    console.log("Eyes not clearly visible");
    return 0;
  }

  // -------------------------
  // Mouth Visibility Check
  // -------------------------

  const mouthWidth =
    Math.abs(lm[291].x - lm[61].x);

  if (mouthWidth < 0.03) {
    console.log("Mouth not clearly visible");
    return 0;
  }

  // -------------------------
  // Score Calculation
  // -------------------------

  let score = 0;

  // Face size
  if (
    width > 0.22 &&
    width < 0.65
  ) {
    score += 30;
  }

  // Face height
  if (
    height > 0.22 &&
    height < 0.8
  ) {
    score += 30;
  }

  // Face centered
  if (
    nose.x > 0.3 &&
    nose.x < 0.7 &&
    nose.y > 0.25 &&
    nose.y < 0.75
  ) {
    score += 40;
  }

  console.log({
    width,
    height,
    symmetry,
    leftEyeWidth,
    rightEyeWidth,
    mouthWidth,
    noseX: nose.x,
    noseY: nose.y,
    score,
  });

  return score;
};

// Optional helper
export const isFullFace = (lm) => {
  return getFaceScore(lm) >= 70;
};