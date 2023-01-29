const MAX = 10
const NUM_OF_STR = 10
const IN_ORDER = 1
const EXIT = 'esc'
const { createRandomStrings, readLine } = require('./read-write-file')
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function createRandomSequence(quantity) {
  const arr = []
  while (quantity > 0) {
    const num = getRandomInt(MAX) + 1
    if (arr.includes(num)) continue
    arr.push(num)
    quantity--
  }
  return arr
}

createRandomStrings(createRandomSequence(NUM_OF_STR)).then(
  async (arrStrings) => {
    // console.log('🚀 ~ file: index.js:22 ~ arrStrings', arrStrings)
    const eol = '\n'
    const exitQuestion = 'Enter esc to exit: '
    let times = []
    if (IN_ORDER) var index = 0
    while ((await readLine(exitQuestion)) !== EXIT) {
      if (times.length === NUM_OF_STR) {
        times = []
        if (IN_ORDER) index = 0
      }
      if (!IN_ORDER) {
        var index = getRandomInt(NUM_OF_STR)
        while (times.includes(index)) {
          index = getRandomInt(NUM_OF_STR)
        }
      }
      times.push(index)
      console.log('🚀 ~ file: index.js:32 ~ times', times)
      const strings = arrStrings[index].split('\t')
      console.log(`Ask ${index}: ` + strings[0] + eol)
      const result = await readLine()
      if (result === strings[1]) console.log('CORRECT!!!')
      else console.log('Answer: ' + strings[1] + eol)

      if (IN_ORDER) index++
    }
  }
)
