'use strict'

const assert = require('http-assert')
const { ok, equal: eq, deepEqual: deq } = require('node:assert')

module.exports = module.exports.default = function(username, check) {
  try {
    assert(username == check, 401, 'authentication failed')
  } catch (err) {
    eq(err.status, 401)
    deq(err.message, 'authentication failed')
    ok(err.expose)
  }
}
