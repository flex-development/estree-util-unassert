/**
 * @file Type Tests - HandlerContext
 * @module estree-util-unassert/interfaces/tests/unit-d/HandlerContext
 */

import type { Nilable } from '@flex-development/tutils'
import type { Node } from 'estree'
import type TestSubject from '../handler-context'

describe('unit-d:interfaces/HandlerContext', () => {
  it('should match [grandparent: Nilable<Node>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('grandparent')
      .toEqualTypeOf<Nilable<Node>>()
  })

  it('should match [identifiers: Set<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('identifiers')
      .toEqualTypeOf<Set<string>>()
  })

  it('should match [modules(this: void, id: any): boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('modules')
      .toEqualTypeOf<(this: void, id: any) => boolean>()
  })

  it('should match [parent: Nilable<Node>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('parent')
      .toEqualTypeOf<Nilable<Node>>()
  })

  it('should match [trash: WeakSet<Node>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('trash')
      .toEqualTypeOf<WeakSet<Node>>()
  })
})
