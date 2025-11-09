export default function time(min, max) {
  const allTime = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 5) {
      if (i < 10 && j < 10) {
        allTime.push(`0${i}:0${j}`);
      } else if (i < 10 && j >= 10) {
        allTime.push(`0${i}:${j}`);
      } else if (j < 10 && i >= 10) {
        allTime.push(`${i}:0${j}`);
      } else {
        allTime.push(`${i}:${j}`);
      }
    }
    // do nothing
  }

  const minIndex = allTime.findIndex((time) => time === min);
  let maxIndex = allTime.findIndex((time) => time === max);
  maxIndex++;

  return allTime.slice(minIndex, maxIndex);
}
