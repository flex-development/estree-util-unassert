'use strict'

let assert = require('assert'), bar = 'BAR', foo = 'FOO'

function divide(a, b) {
  assert.equal(typeof a, 'number')
  assert(!isNaN(a))
  assert.equal(typeof b, 'number')
  assert.ok(!isNaN(b))
  return a / b
}

module.exports = module.exports.default = divide
