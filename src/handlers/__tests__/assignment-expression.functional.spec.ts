/**
 * @file Functional Tests - AssignmentExpression
 * @module estree-util-unassert/handlers/tests/functional/AssignmentExpression
 */

import context from '#fixtures/context'
import * as utils from '#src/utils'
import type { Spy } from '#tests/interfaces'
import type { AssignmentExpression } from 'estree'
import TestSubject from '../assignment-expression'

describe('functional:handlers/AssignmentExpression', () => {
  describe('is(parent, "ExpressionStatement")', () => {
    let getIdentifiers: Spy<typeof utils['getIdentifiers']>
    let node: AssignmentExpression

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      node = {
        left: { name: 'assert', type: 'Identifier' },
        operator: '=',
        right: {
          arguments: [{ raw: '\'assert\'', type: 'Literal', value: 'assert' }],
          callee: { name: 'require', type: 'Identifier' },
          optional: false,
          type: 'CallExpression'
        },
        type: 'AssignmentExpression'
      }

      context.parent = {
        expression: node,
        type: 'ExpressionStatement'
      }
    })

    beforeEach(() => {
      getIdentifiers = vi.spyOn(utils, 'getIdentifiers')
      TestSubject.call(context, node)
    })

    it('should register removal if node.right has assertion module id', () => {
      expect(context.trash.has(context.parent!)).to.be.true
      expect(getIdentifiers).toHaveBeenCalledOnce()
      expect(getIdentifiers).toHaveBeenCalledWith(node, context.identifiers)
    })
  })
})
