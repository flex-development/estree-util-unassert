/**
 * @file Handlers - VariableDeclarator
 * @module estree-util-unassert/handlers/VariableDeclarator
 */

import type { HandlerContext } from '#src/interfaces'
import { getIdentifiers, hasModuleId } from '#src/utils'
import type * as estree from 'estree'
import { CONTINUE } from 'estree-util-visit'
import { is } from 'unist-util-is'

/**
 * Collect assertion module identifiers from variable declarators where the
 * initializer (`node.init`) is a dynamic import or `require` call.
 *
 * If `node` is the child of a `VariableDeclaration` containing one declaration,
 * its parent (`this.parent`) will be added to the trash to be removed on exit.
 * Otherwise, `node` will be added to the trash.
 *
 * Supported initializers (`node.init`):
 *
 * - {@linkcode estree.AwaitExpression}
 * - {@linkcode estree.CallExpression}
 *
 * @see {@linkcode HandlerContext}
 * @see {@linkcode estree.VariableDeclarator}
 *
 * @this {HandlerContext}
 *
 * @param {estree.VariableDeclarator} node - Node being entered
 * @return {typeof CONTINUE} Visitor action
 */
function VariableDeclarator(
  this: HandlerContext,
  node: estree.VariableDeclarator
): typeof CONTINUE {
  if (
    hasModuleId(node.init, this.modules) &&
    is(this.parent, 'VariableDeclaration')
  ) {
    this.trash.add(this.parent.declarations.length === 1 ? this.parent : node)
    getIdentifiers(node.id, this.identifiers)
  }

  return CONTINUE
}

export default VariableDeclarator
