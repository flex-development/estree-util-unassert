/**
 * @file Utilities - preleaveIfStatement
 * @module estree-util-unassert/utils/preleaveIfStatement
 */

import type { IfStatement, Node } from 'estree'
import { is } from 'unist-util-is'
import isEmpty from './is-empty'

/**
 * Prepare to leave an {@linkcode IfStatement}.
 *
 * If `node` only has a consequent, `node` will be added to the `trash` to be
 * removed on exit. `node` will also be added to the `trash` if its consequent
 * is an empty statement (block or otherwise) and its alternate is an empty
 * block statement. If the only empty child node in this case is the alternate,
 * only the alternate will be removed.
 *
 * @see {@linkcode IfStatement}
 * @see {@linkcode Node}
 *
 * @param {IfStatement} node - Node to check
 * @param {WeakSet<Node>} trash - Nodes to remove
 * @return {void} Nothing
 */
const preleaveIfStatement = (node: IfStatement, trash: WeakSet<Node>): void => {
  // trash node if it only has a consequent
  !node.alternate && trash.add(node)

  // 1. remove alternates that are empty block statements
  // 2. add node to trash if consequent is empty
  if (is(node.alternate, 'BlockStatement') && isEmpty(node.alternate)) {
    delete node.alternate
    isEmpty(node.consequent) && trash.add(node)
  }

  return void node
}

export default preleaveIfStatement
