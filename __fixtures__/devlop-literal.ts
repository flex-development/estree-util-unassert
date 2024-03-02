/**
 * @file Fixtures - devlop
 * @module fixtures/devlop
 */

import type { Literal } from 'estree'

/**
 * Node representing the string `'devlop'`.
 *
 * @type {Readonly<Literal>}
 */
export default Object.freeze({
  raw: '\'devlop\'',
  type: 'Literal',
  value: 'devlop'
} as const)
