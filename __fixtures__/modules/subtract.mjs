import * as assert from 'node:assert'

function subtract(a, b) {
  assert.ok(typeof a === 'number', 'expected a to be a number')
  assert.ok(typeof b === 'number', 'expected b to be a number')
  return a - b
}

export default subtract
