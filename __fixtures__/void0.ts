/**
 * @file Fixtures - void0
 * @module fixtures/void0
 */

import type { UnaryExpression } from 'estree'
import zero from './zero'

/**
 * Node representing a `void 0` expression.
 *
 * @type {Readonly<UnaryExpression>}
 */
export default Object.freeze({
  argument: zero,
  operator: 'void',
  prefix: true,
  type: 'UnaryExpression'
} as const)
