/**
 * @file Utilities - preleaveIfStatement
 * @module estree-util-unassert/utils/preleaveIfStatement
 */

import type { IfStatement, Node } from 'estree'
import isEmpty from './is-empty'

/**
 * Prepare to leave an {@linkcode IfStatement}.
 *
 * If `node` only has an empty consequent, `node` will be added to the `trash`
 * to be removed on exit. `node` will also be added to the `trash` if both its
 * consequent and alternate are types of empty statement. If the only empty
 * child node is the alternate, only the alternate will be removed.
 *
 * @see {@linkcode IfStatement}
 * @see {@linkcode Node}
 *
 * @param {IfStatement} node - Node to check
 * @param {WeakSet<Node>} trash - Nodes to remove
 * @return {void} Nothing
 */
const preleaveIfStatement = (node: IfStatement, trash: WeakSet<Node>): void => {
  if (!node.alternate || isEmpty(node.alternate)) {
    node.alternate && delete node.alternate
    isEmpty(node.consequent) && trash.add(node)
  }

  return void node
}

export default preleaveIfStatement
