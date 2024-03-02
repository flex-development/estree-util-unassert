/**
 * @file Handlers - AssignmentExpression
 * @module estree-util-unassert/handlers/AssignmentExpression
 */

import type { HandlerContext } from '#src/interfaces'
import { getIdentifiers, hasModuleId } from '#src/utils'
import type * as estree from 'estree'
import { CONTINUE } from 'estree-util-visit'
import { is } from 'unist-util-is'

/**
 * Collect assertion module identifiers from assignment expressions where the
 * righthand side (`node.right`) is a dynamic import or `require` call.
 *
 * If `node` contains an assertion module id, and its parent (`this.parent`) is
 * an {@linkcode estree.ExpressionStatement}, its parent will be added to the
 * trash to be removed on exit.
 *
 * Supported righthands (`node.right`):
 *
 * - {@linkcode estree.AwaitExpression}
 * - {@linkcode estree.CallExpression}
 *
 * @see {@linkcode HandlerContext}
 * @see {@linkcode estree.AssignmentExpression}
 *
 * @this {HandlerContext}
 *
 * @param {estree.AssignmentExpression} node - Node being entered
 * @return {typeof CONTINUE} Next action
 */
function AssignmentExpression(
  this: HandlerContext,
  node: estree.AssignmentExpression
): typeof CONTINUE {
  if (
    node.operator === '=' &&
    hasModuleId(node.right, this.modules) &&
    is(this.parent, 'ExpressionStatement')
  ) {
    this.trash.add(this.parent)
    getIdentifiers(node, this.identifiers)
  }

  return CONTINUE
}

export default AssignmentExpression
