export const compareFaces = (
  registered,
  current
) => {
  if (!registered || !current)
    return false;

  let totalDiff = 0;

  for (let i = 0; i < 468; i++) {
    totalDiff += Math.abs(
      registered[i].x - current[i].x
    );

    totalDiff += Math.abs(
      registered[i].y - current[i].y
    );
  }

  const avgDiff =
    totalDiff / (468 * 2);

  console.log("Average Diff:", avgDiff);

  return avgDiff < 0.03;
};