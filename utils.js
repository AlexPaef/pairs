function arrayToDiv(array) {
  return array.map(item => `<div>${item}</div>`).join('')
}

function splitToChunks(array, parts) {
  const arrayCopy = [...array];
  let result = [];
  let random = Math.round(Math.random());
  if (random) {
    for (let i = parts; i > 0; i--) {
      result.push(arrayCopy.splice(0, Math.ceil(arrayCopy.length / i)));
    }
  } else {
    for (let i = parts; i > 0; i--) {
      result.unshift(arrayCopy.splice(0, Math.ceil(arrayCopy.length / i)));
    }
  }
  return result;
};

function convertToArray(str) {
  return str.trim().split('\n');
}

function shuffledArray(array) {
  return array.sort((a, b) => 0.5 - Math.random())
}

export { arrayToDiv, splitToChunks, convertToArray, shuffledArray }
