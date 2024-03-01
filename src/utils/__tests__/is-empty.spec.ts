/**
 * @file Unit Tests - isEmpty
 * @module estree-util-unassert/utils/tests/unit/isEmpty
 */

import type { BlockStatement } from 'estree'
import testSubject from '../is-empty'

describe('unit:utils/isEmpty', () => {
  describe('is(node, "BlockStatement")', () => {
    it('should return false if node.body.length', () => {
      // Arrange
      const node: BlockStatement = {
        body: [{ type: 'EmptyStatement' }],
        type: 'BlockStatement'
      }

      // Act + Expect
      expect(testSubject(node)).to.be.false
    })

    it('should return true if !node.body.length', () => {
      expect(testSubject({ body: [], type: 'BlockStatement' })).to.be.true
    })
  })

  describe('is(node, "EmptyStatement")', () => {
    it('should return true', () => {
      expect(testSubject({ type: 'EmptyStatement' })).to.be.true
    })
  })
})
