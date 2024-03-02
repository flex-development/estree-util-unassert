/**
 * @file Functional Tests - VariableDeclarator
 * @module estree-util-unassert/handlers/tests/functional/VariableDeclarator
 */

import context from '#fixtures/context'
import * as utils from '#src/utils'
import type { Spy } from '#tests/interfaces'
import type { VariableDeclarator } from 'estree'
import TestSubject from '../variable-declarator'

describe('functional:handlers/VariableDeclarator', () => {
  let getIdentifiers: Spy<typeof utils['getIdentifiers']>

  beforeEach(() => {
    getIdentifiers = vi.spyOn(utils, 'getIdentifiers')
  })

  describe('parent.declarations.length !== 1', () => {
    let node: VariableDeclarator

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      node = {
        id: { name: 'assert', type: 'Identifier' },
        init: {
          argument: {
            source: { raw: '\'assert\'', type: 'Literal', value: 'assert' },
            type: 'ImportExpression'
          },
          type: 'AwaitExpression'
        },
        type: 'VariableDeclarator'
      }

      context.parent = {
        declarations: [
          node,
          {
            id: { name: 'message', type: 'Identifier' },
            init: { raw: '\'\'', type: 'Literal', value: '' },
            type: 'VariableDeclarator'
          }
        ],
        kind: 'const',
        type: 'VariableDeclaration'
      }
    })

    beforeEach(() => {
      TestSubject.call(context, node)
    })

    it('should register removal if node.init has assertion module id', () => {
      expect(context.trash.has(node)).to.be.true
      expect(getIdentifiers).toHaveBeenCalledOnce()
      expect(getIdentifiers).toHaveBeenCalledWith(node.id, context.identifiers)
    })
  })

  describe('parent.declarations.length === 1', () => {
    let node: VariableDeclarator

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      node = {
        id: {
          properties: [
            {
              computed: false,
              key: { name: 'deprecate', type: 'Identifier' },
              kind: 'init',
              method: false,
              shorthand: true,
              type: 'Property',
              value: { name: 'deprecate', type: 'Identifier' }
            },
            {
              computed: false,
              key: { name: 'equal', type: 'Identifier' },
              kind: 'init',
              method: false,
              shorthand: true,
              type: 'Property',
              value: { name: 'eq', type: 'Identifier' }
            }
          ],
          type: 'ObjectPattern'
        },
        init: {
          arguments: [
            {
              raw: '\'node:assert\'',
              type: 'Literal',
              value: 'node:assert'
            }
          ],
          callee: { name: 'require', type: 'Identifier' },
          optional: false,
          type: 'CallExpression'
        },
        type: 'VariableDeclarator'
      }

      context.parent = {
        declarations: [node],
        kind: 'const',
        type: 'VariableDeclaration'
      }
    })

    beforeEach(() => {
      TestSubject.call(context, node)
    })

    it('should register removal if node.init has assertion module id', () => {
      expect(context.trash.has(context.parent!)).to.be.true
      expect(getIdentifiers).toHaveBeenCalledOnce()
      expect(getIdentifiers).toHaveBeenCalledWith(node.id, context.identifiers)
    })
  })
})
