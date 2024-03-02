import { ok } from 'devlop'
import * as assert from 'node:assert/strict'

async function humanReadable(seconds) {
  ok(typeof seconds === 'number', 'expected `seconds` to be a number')
  await assert.doesNotReject(async () => seconds.toFixed(2))

  return new Promise(resolve => {
    let formatted = ''

    for (const converter of [3600, 60, 1]) {
      const time = seconds / converter | 0
      formatted += time < 10 ? `0${time}` : time
      if (converter !== 1) formatted += ':'
      seconds -= time * converter
    }

    return resolve(formatted)
  })
}

export default humanReadable
