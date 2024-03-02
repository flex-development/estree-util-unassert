import { deprecate, equal, ok } from 'devlop'

function add(a, b) {
  ok(typeof a === 'number', 'expected `a` to be a number')
  ok(typeof b === 'number', 'expected `b` to be a number')

  if (process.env.NODE_ENV !== 'production') {
    equal(Number.isNaN(a), false, 'expected `a` not to equal NaN')
    equal(Number.isNaN(b), false, 'expected `b` not to equal NaN')
  } else {
    ok(!Number.isNaN(a), 'expected `a` not to be NaN')
    ok(!Number.isNaN(b), 'expected `b` not to be NaN')
  }

  return a + b
}

export default deprecate(add)
