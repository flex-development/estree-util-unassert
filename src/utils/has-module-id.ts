/**
 * @file Utilities - hasModuleId
 * @module estree-util-unassert/utils/hasModuleId
 */

import type { Nilable } from '@flex-development/tutils'
import type {
  AwaitExpression,
  CallExpression,
  ImportDeclaration,
  Node
} from 'estree'
import { is } from 'unist-util-is'

/**
 * Nodes that can contain assertion module ids.
 *
 * @internal
 */
type HasModuleId = AwaitExpression | CallExpression | ImportDeclaration

/**
 * Check if `node` contains an assertion module id.
 *
 * @see {@linkcode HasModuleId}
 * @see {@linkcode Node}
 *
 * @param {Nilable<Node>} node - Node to check
 * @param {(id: unknown) => boolean} filter - Module id filter
 * @return {node is HasModuleId} `true` if `node` contains assertion module id
 */
const hasModuleId = (
  node: Nilable<Node>,
  filter: (id: unknown) => boolean
): node is HasModuleId => {
  switch (true) {
    case is(node, 'AwaitExpression'):
      return (
        is(node.argument, 'ImportExpression') &&
        is(node.argument.source, 'Literal') &&
        filter(node.argument.source.value)
      )
    case is(node, 'CallExpression'):
      return (
        is(node.callee, 'Identifier') &&
        node.callee.name === 'require' &&
        !!node.arguments.length &&
        is(node.arguments[0], 'Literal') &&
        filter(node.arguments[0].value)
      )
    case is(node, 'ImportDeclaration'):
      return is(node.source, 'Literal') && filter(node.source.value)
    default:
      return false
  }
}

export default hasModuleId
