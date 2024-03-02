/**
 * @file Fixtures - okImportSpecifier
 * @module fixtures/okImportSpecifier
 */

import type { ImportSpecifier } from 'estree'

/**
 * Node representing an import specifier.
 *
 * @type {Readonly<ImportSpecifier>}
 */
export default Object.freeze({
  imported: { name: 'ok', type: 'Identifier' },
  local: { name: 'ok', type: 'Identifier' },
  type: 'ImportSpecifier'
} as const)
