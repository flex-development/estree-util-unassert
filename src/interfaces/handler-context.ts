/**
 * @file Interfaces - HandlerContext
 * @module estree-util-unassert/interfaces/HandlerContext
 */

import type { Nilable } from '@flex-development/tutils'
import type { Node } from 'estree'

/**
 * Node handler context.
 */
interface HandlerContext {
  /**
   * Current grandparent node, if any.
   *
   * @see {@linkcode Node}
   */
  grandparent: Nilable<Node>

  /**
   * Assertion module identifier names.
   */
  identifiers: Set<string>

  /**
   * Assertion module id filter.
   *
   * @this {void}
   *
   * @param {any} id - Module id to check
   * @return {boolean} `true` if `id` passes check, `false` otherwise
   */
  modules(this: void, id: any): boolean

  /**
   * Current parent node, if any.
   *
   * @see {@linkcode Node}
   */
  parent: Nilable<Node>

  /**
   * Nodes to remove.
   *
   * @see {@linkcode Node}
   */
  trash: WeakSet<Node>
}

export type { HandlerContext as default }
