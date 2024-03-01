/**
 * @file Unit Tests - enter
 * @module estree-util-unassert/visitors/tests/unit/enter
 */

import context from '#fixtures/context'
import testSubject from '../enter'

describe('unit:visitors/enter', () => {
  it('should return visitor function', () => {
    expect(testSubject(context, {})).to.be.a('function')
  })
})
