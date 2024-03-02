/**
 * @file Fixtures - zero
 * @module fixtures/zero
 */

import type { Literal } from 'estree'

/**
 * Node representing zero (`0`).
 *
 * @type {Readonly<Literal>}
 */
export default Object.freeze({
  raw: '0',
  type: 'Literal',
  value: 0
} as const)
