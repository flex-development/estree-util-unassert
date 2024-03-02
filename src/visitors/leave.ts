/**
 * @file Visitors - leave
 * @module estree-util-unassert/leave
 */

import type { HandlerContext } from '#src/interfaces'
import type { Key } from '#src/types'
import { preleaveIfStatement } from '#src/utils'
import {
  at,
  define,
  isNumber,
  type EmptyArray,
  type Optional
} from '@flex-development/tutils'
import { ok } from 'devlop'
import type { Node, Program } from 'estree'
import { CONTINUE, type Index, type Visitor } from 'estree-util-visit'
import { is } from 'unist-util-is'

/**
 * Create a visitor to handle leaving a node.
 *
 * @see {@linkcode HandlerContext}
 * @see {@linkcode Visitor}
 *
 * @param {HandlerContext} context - Handler context
 * @return {Visitor} Visitor function
 */
const leave = (context: HandlerContext): Visitor => {
  /**
   * Handle leaving `node`.
   *
   * @template {Node} [T=Node] - Node type
   *
   * @param {T} node - Node being exited
   * @param {Optional<Key>} key - Field at which `node` lives in `this.parent`
   * (or where a list of nodes live if `this.parent[key]` is an array)
   * @param {Optional<Index>} index - Index where `node` lives in `this.parent`,
   * or `undefined` if `this.parent[key]` is not an array
   * @param {Node[]} ancestors - Ancestors of `node`
   * @return {number | typeof CONTINUE} Next index or action
   */
  const visitor = <T extends Node = Node>(
    node: T,
    key: T extends Program ? undefined : Key,
    index: T extends Program ? undefined : Optional<Index>,
    ancestors: T extends Program ? EmptyArray : Node[]
  ): number | typeof CONTINUE => {
    if (context.trash.has(node)) {
      /**
       * Parent node.
       *
       * @const {Optional<Node>} parent
       */
      const parent: Optional<Node> = at(ancestors, -1)

      ok(key, 'expected `key`')
      ok(parent, 'expected `parent`')
      ok(key in parent, `expected \`parent.${key}\``)

      // remove node or replace with empty statement
      if (isNumber(index)) {
        ok(Array.isArray(parent[<never>key]), 'expected array')
        ;(<Node[]>parent[<never>key]).splice(index, 1)
      } else {
        define(parent, key, { value: { type: 'EmptyStatement' } })
      }

      /**
       * Grandparent node.
       *
       * @const {Optional<Node>} grandparent
       */
      const grandparent: Optional<Node> = at(ancestors, -2)

      // prepare if statement leave
      if (is(grandparent, 'IfStatement')) {
        preleaveIfStatement(grandparent, context.trash)
      }

      // return index of new next node
      if (isNumber(index)) return index
    }

    return CONTINUE
  }

  return <Visitor>visitor
}

export default leave
