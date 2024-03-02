import { ok } from 'devlop'
import * as assert from 'node:assert/strict'

function digitize(n) {
  ok(typeof n === 'number', 'expected `n` to be a number')

  if (process.env.NODE_ENV !== 'production') {
    assert.notEqual(Number.isNaN(n), true, 'expected `n` not to be NaN')
  } else ok(n >= 0, 'expected `n` to be a non-negative number')

  if (n <= 9) return [n]
  const digits = []
  while (n > 0) digits.push(n % 10 | 0) && (n = n / 10 | 0)
  return digits
}

export default digitize
