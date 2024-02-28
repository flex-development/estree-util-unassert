/**
 * @file Utilities - getIdentifiers
 * @module estree-util-unassert/utils/getIdentifiers
 */

import { sift } from '@flex-development/tutils'
import { unreachable } from 'devlop'
import type { Node } from 'estree'
import type { AssertionError } from 'node:assert'

/**
 * Collect identifier names from `node`.
 *
 * @see {@linkcode Node}
 *
 * @param {Node} node - Node to check
 * @param {Set<string>} identifiers - Identifier names collection
 * @return {void} Nothing
 * @throws {AssertionError} When `node.type` is invalid and module is loaded
 * using `development` condition
 */
const getIdentifiers = (node: Node, identifiers: Set<string>): void => {
  switch (node.type) {
    case 'ArrayPattern':
      for (const el of sift(node.elements)) void getIdentifiers(el, identifiers)
      break
    case 'AssignmentExpression':
    case 'AssignmentPattern':
      void getIdentifiers(node.left, identifiers)
      break
    case 'Identifier':
      identifiers.add(node.name)
      break
    case 'ImportDeclaration':
      for (const s of node.specifiers) void getIdentifiers(s, identifiers)
      break
    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
    case 'ImportSpecifier':
      void getIdentifiers(node.local, identifiers)
      break
    case 'MemberExpression':
      void getIdentifiers(node.object, identifiers)
      break
    case 'ObjectPattern':
      for (const k of node.properties) void getIdentifiers(k, identifiers)
      break
    case 'Property':
      void getIdentifiers(node.value, identifiers)
      break
    case 'RestElement':
      void getIdentifiers(node.argument, identifiers)
      break
    /* c8 ignore next 2 */
    default:
      void unreachable(`unexpected node type: ${node.type}`)
  }

  return void node
}

export default getIdentifiers
