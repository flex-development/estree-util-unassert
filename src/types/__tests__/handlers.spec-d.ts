/**
 * @file Type Tests - Handlers
 * @module estree-util-unassert/types/tests/unit-d/Handlers
 */

import type { Handler } from '#src/interfaces'
import type { Node } from 'estree'
import type TestSubject from '../handlers'

describe('unit-d:types/Handlers', () => {
  it('should equal { [K in Node["type"]]?: Handler<Extract<Node, { type: K }>> }', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<{
      [K in Node['type']]?: Handler<Extract<Node, { type: K }>>
    }>()
  })
})
