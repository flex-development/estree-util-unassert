const { ok } = await import('devlop')
const assert = await import('node:assert/strict')

const centuryFromYear = year => {
  ok(typeof year === 'number', 'expected `year` to be a number')
  assert.notEqual(Number.isNaN(year), true, 'expected `year` not to be NaN')
  return Math.ceil(year / 100)
}

export default centuryFromYear
