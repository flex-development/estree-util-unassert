/**
 * @file Visitors - enter
 * @module estree-util-unassert/enter
 */

import type { HandlerContext } from '#src/interfaces'
import type { Handlers, Key } from '#src/types'
import { at, type EmptyArray, type Optional } from '@flex-development/tutils'
import type { Node, Program } from 'estree'
import type { Index, Visitor } from 'estree-util-visit'

/**
 * Create a visitor to handle entering a node.
 *
 * @see {@linkcode HandlerContext}
 * @see {@linkcode Handlers}
 * @see {@linkcode Visitor}
 *
 * @param {HandlerContext} context - Handler context
 * @param {Handlers} handlers - Enter handlers
 * @return {Visitor} Visitor function
 */
const enter = (context: HandlerContext, handlers: Handlers): Visitor => {
  /**
   * Handle entering `node`.
   *
   * @template {Node} [T=Node] - Node type
   *
   * @param {T} node - Node being entered
   * @param {Optional<Key>} key - Field at which `node` lives in `this.parent`
   * (or where a list of nodes live if `this.parent[key]` is an array)
   * @param {Optional<Index>} index - Index where `node` lives in `this.parent`,
   * or `undefined` if `this.parent[key]` is not an array
   * @param {Node[]} ancestors - Ancestors of `node`
   * @return {ReturnType<Visitor>} Next action, `null`, or `undefined`
   */
  const visitor = <T extends Node>(
    node: T,
    key: T extends Program ? undefined : Key,
    index: T extends Program ? undefined : Index,
    ancestors: T extends Program ? EmptyArray : Node[]
  ): ReturnType<Visitor> => {
    context.grandparent = at(ancestors, -2, null)
    context.parent = at(ancestors, -1, null)
    return handlers[node.type]?.call(context, node, key, index, ancestors)
  }

  return <Visitor>visitor
}

export default enter
