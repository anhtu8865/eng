const events = require('events')
const fs = require('fs')
const readline = require('readline')
async function createRandomStrings(arr) {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('test.txt'),
      crlfDelay: Infinity,
    })
    let lineNum = 0
    const arrString = []
    rl.on('line', (line) => {
      lineNum += 1
      if (arrString.length === arr.length) rl.close()
      if (!arr.includes(lineNum)) return
      const sentence = line
      arrString.push(sentence)
    })

    await events.once(rl, 'close')

    const used = process.memoryUsage().heapUsed / 1024 / 1024
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    )
    return arrString
  } catch (err) {
    console.error(err)
  }
}

async function readLine(question = 'Input: ') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  let line
  rl.question(question, (input) => {
    line = input
    rl.close()
  })
  await events.once(rl, 'close')
  return line
}
module.exports = { createRandomStrings, readLine }
