/**
 * @file Type Tests - Handler
 * @module estree-util-unassert/interfaces/tests/unit-d/Handler
 */

import type { Key } from '#src/types'
import type { EmptyArray, Optional } from '@flex-development/tutils'
import type { Node, Program } from 'estree'
import type { Index, Visitor } from 'estree-util-visit'
import type TestSubject from '../handler'
import type HandlerContext from '../handler-context'

describe('unit-d:interfaces/Handler', () => {
  it('should match [this: HandlerContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<HandlerContext>()
  })

  it('should return ReturnType<Visitor>', () => {
    expectTypeOf<TestSubject>().returns.toEqualTypeOf<ReturnType<Visitor>>()
  })

  describe('T extends Exclude<Node, Program>', () => {
    it('should be callable with [T, Key, Optional<Index>, Node[]]', () => {
      // Arrange
      type T = Exclude<Node, Program>

      // Expect
      expectTypeOf<TestSubject<T>>()
        .parameters
        .toEqualTypeOf<[T, Key, Optional<Index>, Node[]]>()
    })
  })

  describe('T extends Program', () => {
    it('should be callable with [T, undefined, undefined, EmptyArray]', () => {
      expectTypeOf<TestSubject<Program>>()
        .parameters
        .toEqualTypeOf<[Program, undefined, undefined, EmptyArray]>()
    })
  })
})
