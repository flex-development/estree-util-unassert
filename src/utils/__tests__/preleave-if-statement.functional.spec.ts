/**
 * @file Functional Tests - preleaveIfStatement
 * @module estree-util-unassert/utils/tests/functional/preleaveIfStatement
 */

import context from '#fixtures/context'
import type { IfStatement, UnaryExpression } from 'estree'
import testSubject from '../preleave-if-statement'

describe('functional:utils/preleaveIfStatement', () => {
  let test: UnaryExpression

  beforeAll(() => {
    test = {
      argument: { name: 'result', type: 'Identifier' },
      operator: '!',
      prefix: true,
      type: 'UnaryExpression'
    }
  })

  describe('!node.alternate', () => {
    let node: IfStatement

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      node = {
        alternate: null,
        consequent: {
          expression: {
            arguments: [{ name: 'result', type: 'Identifier' }],
            callee: { name: 'ok', type: 'Identifier' },
            optional: false,
            type: 'CallExpression'
          },
          type: 'ExpressionStatement'
        },
        test,
        type: 'IfStatement'
      }

      testSubject(node, context.trash)
    })

    it('should add node to trash', () => {
      expect(context.trash.has(node)).to.be.true
    })
  })

  describe('is(node.alternate, "BlockStatement")', () => {
    describe('isEmpty(node.alternate)', () => {
      let node: IfStatement

      afterAll(() => {
        context.reset()
      })

      beforeAll(() => {
        node = {
          alternate: { body: [], type: 'BlockStatement' },
          consequent: { type: 'EmptyStatement' },
          test,
          type: 'IfStatement'
        }

        testSubject(node, context.trash)
      })

      it('should add node to trash if isEmpty(node.consequent)', () => {
        expect(context.trash.has(node)).to.be.true
      })

      it('should remove node.alternate', () => {
        expect(node).not.to.have.property('alternate')
      })
    })
  })
})
