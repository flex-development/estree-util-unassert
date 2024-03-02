/**
 * @file Fixtures - devlopImportDeclaration
 * @module fixtures/devlopImportDeclaration
 */

import type { ImportDeclaration } from 'estree'
import devlopLiteral from './devlop-literal'
import okImportSpecifier from './ok-import-specifier'

/**
 * Node representing a named import from `devlop`.
 *
 * @type {Readonly<ImportDeclaration>}
 */
export default Object.freeze({
  source: devlopLiteral,
  specifiers: [okImportSpecifier],
  type: 'ImportDeclaration'
} as ImportDeclaration)
