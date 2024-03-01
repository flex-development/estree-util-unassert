/**
 * @file Type Tests - Key
 * @module estree-util-unassert/types/tests/unit-d/Key
 */

import type { Keys } from '@flex-development/tutils'
import type { BaseNode, Program } from 'estree'
import type TestSubject from '../key'

describe('unit-d:types/Key', () => {
  it('should match Exclude<Keys<T>[number], keyof BaseNode>', () => {
    // Arrange
    type T = Program
    type Expect = Exclude<Keys<T>[number], keyof BaseNode>

    // Expect
    expectTypeOf<TestSubject<T>>().toMatchTypeOf<Expect>
  })
})
