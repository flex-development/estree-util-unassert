/**
 * @file Type Tests - Options
 * @module estree-util-unassert/interfaces/tests/unit-d/Options
 */

import type { Nilable } from '@flex-development/tutils'
import type { FilterPattern } from '@rollup/pluginutils'
import type TestSubject from '../options'

describe('unit-d:interfaces/Options', () => {
  it('should match [modules?: Nilable<FilterPattern>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('modules')
      .toEqualTypeOf<Nilable<FilterPattern>>()
  })
})
