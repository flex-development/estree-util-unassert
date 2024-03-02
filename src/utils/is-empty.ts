/**
 * @file Utilities - isEmpty
 * @module estree-util-unassert/utils/isEmpty
 */

import type { EmptyArray, Nilable } from '@flex-development/tutils'
import type { EmptyBlockStatement, EmptyStatement, Node } from 'estree'
import { is } from 'unist-util-is'

declare module 'estree' {
  export interface EmptyBlockStatement extends BlockStatement {
    body: EmptyArray
  }
}

/**
 * Determine if `node` is a type of empty statement.
 *
 * @see {@linkcode EmptyBlockStatement}
 * @see {@linkcode EmptyStatement}
 * @see {@linkcode Node}
 *
 * @param {Nilable<Node>} node - Node to check
 * @return {node is EmptyBlockStatement | EmptyStatement} `true` if `node` is an
 * empty block statement or empty statement, `false` otherwise
 */
const isEmpty = (
  node: Nilable<Node>
): node is EmptyBlockStatement | EmptyStatement => {
  return (
    is(node, 'EmptyStatement') ||
    is(node, 'BlockStatement') && !node.body.length
  )
}

export default isEmpty
