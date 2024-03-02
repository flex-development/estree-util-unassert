/**
 * @file Handlers - ImportDeclaration
 * @module estree-util-unassert/handlers/ImportDeclaration
 */

import type { HandlerContext } from '#src/interfaces'
import { getIdentifiers, hasModuleId } from '#src/utils'
import type { Keys, Optional } from '@flex-development/tutils'
import { ok } from 'devlop'
import type * as estree from 'estree'
import { SKIP } from 'estree-util-visit'

/**
 * Collect assertion module identifiers when entering `node`.
 *
 * If `node` represents an imported assertion module, it will be added to the
 * trash to be removed on exit.
 *
 * @see {@linkcode HandlerContext}
 * @see {@linkcode estree.ImportDeclaration}
 *
 * @this {HandlerContext}
 *
 * @param {estree.ImportDeclaration} node - Node being entered
 * @param {Keys<estree.Node>[number]} key - Field at which `node` lives in
 * `this.parent` (or where a list of nodes lives)
 * @param {Optional<number>} index - Index where `node` lives, or `undefined`
 * if `this.parent[key]` is not an array
 * @return {[typeof SKIP, number]} Visitor action
 */
function ImportDeclaration(
  this: HandlerContext,
  node: estree.ImportDeclaration,
  key: Keys<estree.Node>[number],
  index: Optional<number>
): [typeof SKIP, number] {
  ok(typeof index === 'number', 'expected `index` to be a number')
  ok(!Number.isNaN(index), 'expected `index` not be NaN')

  // trash node and collect assertion module identifiers
  if (hasModuleId(node, this.modules)) {
    this.trash.add(node)
    getIdentifiers(node, this.identifiers)
  }

  return [SKIP, index + 1]
}

export default ImportDeclaration
