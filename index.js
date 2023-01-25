const MAX = 7057
const NUM_OF_STR = 5
const EXIT = 'esc'
const { createRandomStrings, readLine } = require('./read-write-file')
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function createRandomSequence(quantity) {
  const arr = []
  while (quantity > 0) {
    const num = getRandomInt(MAX)
    arr.push(num)
    quantity--
  }
  return arr.sort((a, b) => a - b)
}

createRandomStrings(createRandomSequence(NUM_OF_STR)).then(
  async (arrStrings) => {
    const eol = '\n'
    const exitQuestion = 'Enter esc to exit: '
    let count = 0
    let times = []
    while ((await readLine(exitQuestion)) !== EXIT) {
      if (times.length === NUM_OF_STR) times = []
      let index = getRandomInt(NUM_OF_STR)
      while (times.includes(index)) {
        index = getRandomInt(NUM_OF_STR)
      }
      times.push(index)
      console.log('🚀 ~ file: index.js:32 ~ times', times)
      const strings = arrStrings[index].split('\t')
      console.log(`Ask ${index}: ` + strings[0] + eol)
      await readLine()
      console.log('Answer: ' + strings[1] + eol)
    }
  }
)
