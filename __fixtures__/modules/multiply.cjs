'use strict'

const { strict: assert } = require('assert')

const multiply = function(a, b) {
  console.assert(typeof a === 'number')
  assert(!isNaN(a))
  assert.equal(typeof b, 'number')
  assert.ok(!isNaN(b))
  return a * b
}

module.exports = module.exports.default = multiply
