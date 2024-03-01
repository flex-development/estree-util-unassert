/**
 * @file Interfaces - Handler
 * @module estree-util-unassert/interfaces/Handler
 */

import type { Key } from '#src/types'
import type { EmptyArray, Optional } from '@flex-development/tutils'
import type { Node, Program } from 'estree'
import type { Index, Visitor } from 'estree-util-visit'
import type HandlerContext from './handler-context'

/**
 * Node handler.
 *
 * @template {Node} [T=Node] - Node type
 */
interface Handler<T extends Node = Node> {
  /**
   * Handle entering or leaving `node`.
   *
   * @this {HandlerContext}
   *
   * @param {T} node - Node being entered or exited
   * @param {Optional<Key>} key - Field at which `node` lives in `this.parent`
   * (or where a list of nodes live if `this.parent[key]` is an array)
   * @param {Optional<Index>} index - Index where `node` lives in `this.parent`,
   * or `undefined` if `this.parent[key]` is not an array
   * @param {Node[]} ancestors - Ancestors of `node`
   * @return {ReturnType<Visitor>} Next action, `null`, or `undefined`
   */
  (
    this: HandlerContext,
    node: T,
    key: T extends Program ? undefined : Key,
    index: T extends Program ? undefined : Optional<Index>,
    ancestors: T extends Program ? EmptyArray : Node[]
  ): ReturnType<Visitor>

  /**
   * Handle entering or leaving `node`.
   *
   * @template {Node} [U=Node] - Node type
   *
   * @param {HandlerContext} thisArg - `this` object
   * @param {U} node - Node being entered or exited
   * @param {Optional<Key>} key - Field at which `node` lives in `this.parent`
   * (or where a list of nodes live if `this.parent[key]` is an array)
   * @param {Optional<Index>} index - Index where `node` lives in `this.parent`,
   * or `undefined` if `this.parent[key]` is not an array
   * @param {Node[]} ancestors - Ancestors of `node`
   * @return {ReturnType<Visitor>} Next action, `null`, or `undefined`
   */
  call<U extends Node>(
    thisArg: HandlerContext,
    node: U,
    key: U extends Program ? undefined : Key,
    index: U extends Program ? undefined : Optional<Index>,
    ancestors: U extends Program ? EmptyArray : Node[]
  ): ReturnType<Visitor>
}

export type { Handler as default }
