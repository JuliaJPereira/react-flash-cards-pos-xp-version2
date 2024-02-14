export function helperShuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    //prettier-ignore
    [shuffledArray[i], shuffledArray[j]] = 
      [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
