/**
 * @file Interfaces - Options
 * @module estree-util-unassert/interfaces/Options
 */

import type { Nilable } from '@flex-development/tutils'
import type { FilterPattern } from '@rollup/pluginutils'

/**
 * Assertion removal options.
 */
interface Options {
  /**
   * A regular expression, valid [`picomatch`][1] glob pattern, or array of
   * patterns, matching assertion module ids.
   *
   * [1]: https://github.com/micromatch/picomatch
   *
   * @default MODULES_REGEX
   */
  modules?: Nilable<FilterPattern>
}

export type { Options as default }
