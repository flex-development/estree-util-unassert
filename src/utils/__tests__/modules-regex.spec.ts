/**
 * @file Unit Tests - MODULES_REGEX
 * @module estree-util-unassert/utils/tests/unit/MODULES_REGEX
 */

import TEST_SUBJECT from '../modules-regex'

describe('unit:utils/MODULES_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
  })

  it('should match "assert"', () => {
    expect(TEST_SUBJECT.test('assert')).to.be.true
  })

  it('should match "devlop"', () => {
    expect(TEST_SUBJECT.test('devlop')).to.be.true
  })

  it('should match "node:assert"', () => {
    expect(TEST_SUBJECT.test('node:assert')).to.be.true
  })

  it('should match "node:assert/strict"', () => {
    expect(TEST_SUBJECT.test('node:assert/strict')).to.be.true
  })

  it('should match "power-assert"', () => {
    expect(TEST_SUBJECT.test('power-assert')).to.be.true
  })

  it('should match "uvu/assert"', () => {
    expect(TEST_SUBJECT.test('uvu/assert')).to.be.true
  })
})
