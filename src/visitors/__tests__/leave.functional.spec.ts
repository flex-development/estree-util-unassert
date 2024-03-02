/**
 * @file Functional Tests - leave
 * @module estree-util-unassert/visitors/tests/functional/leave
 */

import context from '#fixtures/context'
import importDeclaration from '#fixtures/devlop-import-declaration'
import okIdentifier from '#fixtures/ok-identifier'
import type { Key } from '#src/types'
import * as utils from '#src/utils'
import type { Spy } from '#tests/interfaces'
import type {
  BlockStatement,
  ExpressionStatement,
  IfStatement,
  Node,
  Program,
  UnaryExpression
} from 'estree'
import testSubject from '../leave'

describe('functional:visitors/leave', () => {
  describe('visitor', () => {
    describe('!isArray(parent[key])', () => {
      let ancestors: Node[]
      let key: Key<IfStatement>
      let node: ExpressionStatement
      let parent: IfStatement
      let program: Program

      afterAll(() => {
        context.reset()
      })

      beforeAll(() => {
        node = {
          expression: {
            arguments: [
              {
                argument: {
                  arguments: [{ name: 'num', type: 'Identifier' }],
                  callee: {
                    computed: false,
                    object: { name: 'Number', type: 'Identifier' },
                    optional: false,
                    property: { name: 'isNaN', type: 'Identifier' },
                    type: 'MemberExpression'
                  },
                  optional: false,
                  type: 'CallExpression'
                },
                operator: '!',
                prefix: true,
                type: 'UnaryExpression'
              },
              {
                raw: '\'expected `num` not to be NaN\'',
                type: 'Literal',
                value: 'expected `num` not to be NaN'
              }
            ],
            callee: okIdentifier,
            optional: false,
            type: 'CallExpression'
          },
          type: 'ExpressionStatement'
        }

        parent = {
          alternate: null,
          consequent: node,
          test: {
            argument: { name: 'prod', type: 'Identifier' },
            operator: '!',
            prefix: true,
            type: 'UnaryExpression'
          },
          type: 'IfStatement'
        }

        program = {
          body: [parent],
          sourceType: 'module',
          type: 'Program'
        }

        ancestors = [program, parent]
        key = 'consequent'

        context.trash.add(node)

        testSubject(context)(node, key, undefined, ancestors)
      })

      it('should replace node with empty statement', () => {
        expect(parent).to.have.deep.property(key, { type: 'EmptyStatement' })
      })
    })

    describe('isArray(parent[key])', () => {
      let ancestors: Node[]
      let index: number
      let key: Key<Program>
      let parent: Program

      afterAll(() => {
        context.reset()
      })

      beforeAll(() => {
        parent = {
          body: [importDeclaration],
          sourceType: 'module',
          type: 'Program'
        }

        ancestors = [parent]
        index = 0
        key = 'body'

        context.trash.add(importDeclaration)

        testSubject(context)(importDeclaration, key, index, ancestors)
      })

      it('should remove node from parent[key]', () => {
        expect(parent).to.have.deep.property(key, [])
      })
    })

    describe('is(grandparent, "IfStatement")', () => {
      let ancestors: Node[]
      let grandparent: IfStatement
      let index: number
      let key: Key<BlockStatement>
      let node: ExpressionStatement
      let parent: BlockStatement
      let program: Program
      let spy: Spy<(typeof utils)['preleaveIfStatement']>
      let test: UnaryExpression

      afterAll(() => {
        context.reset()
      })

      beforeAll(() => {
        test = {
          argument: { name: 'result', type: 'Identifier' },
          operator: '!',
          prefix: true,
          type: 'UnaryExpression'
        }

        node = {
          expression: {
            arguments: [
              test,
              {
                raw: '\'expected `result`\'',
                type: 'Literal',
                value: 'expected `result`'
              }
            ],
            callee: okIdentifier,
            optional: false,
            type: 'CallExpression'
          },
          type: 'ExpressionStatement'
        }

        parent = {
          body: [node],
          type: 'BlockStatement'
        }

        grandparent = {
          alternate: null,
          consequent: parent,
          test,
          type: 'IfStatement'
        }

        program = {
          body: [grandparent],
          sourceType: 'module',
          type: 'Program'
        }

        ancestors = [program, grandparent, parent]
        index = 0
        key = 'body'

        context.trash.add(node)
      })

      beforeEach(() => {
        spy = vi.spyOn(utils, 'preleaveIfStatement')
        testSubject(context)(node, key, index, ancestors)
      })

      it('should prepare if statement leave', () => {
        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(grandparent, context.trash)
      })
    })
  })
})
