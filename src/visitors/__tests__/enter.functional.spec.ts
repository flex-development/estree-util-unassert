/**
 * @file Functional Tests - enter
 * @module estree-util-unassert/visitors/tests/functional/enter
 */

import context from '#fixtures/context'
import parent from '#fixtures/devlop-import-declaration'
import node from '#fixtures/ok-import-specifier'
import type { Handler } from '#src/interfaces'
import type { Handlers, Key } from '#src/types'
import type { Mock, Spy } from '#tests/interfaces'
import type { ImportDeclaration, Node, Program } from 'estree'
import testSubject from '../enter'

describe('functional:visitors/enter', () => {
  let program: Program

  beforeAll(() => {
    program = {
      body: [parent],
      sourceType: 'module',
      type: 'Program'
    }
  })

  describe('visitor', () => {
    let ancestors: [Node, Node]
    let index: number
    let key: Key<ImportDeclaration>
    let handler: Handler & Mock<Handler>
    let handlers: Handlers
    let spy: Spy

    beforeAll(() => {
      ancestors = [program, parent]
      handlers = { [node.type]: handler = vi.fn().mockName(node.type) }
      index = 0
      key = 'specifiers'
    })

    beforeEach(() => {
      spy = vi.spyOn(handler, 'call')
      testSubject(context, handlers)(node, key, index, ancestors)
    })

    it('should call handlers[node.type].call', () => {
      expect(spy).toHaveBeenCalledOnce()
      expect(spy).toHaveBeenCalledWith(context, node, key, index, ancestors)
    })

    it('should set context.grandparent', () => {
      expect(context.grandparent).to.equal(program)
    })

    it('should set context.parent', () => {
      expect(context.parent).to.equal(parent)
    })
  })
})
