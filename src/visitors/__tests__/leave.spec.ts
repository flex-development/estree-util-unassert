/**
 * @file Unit Tests - leave
 * @module estree-util-unassert/visitors/tests/unit/leave
 */

import context from '#fixtures/context'
import testSubject from '../leave'

describe('unit:visitors/leave', () => {
  it('should return visitor function', () => {
    expect(testSubject(context)).to.be.a('function')
  })
})
