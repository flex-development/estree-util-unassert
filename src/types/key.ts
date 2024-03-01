/**
 * @file Type Definitions - Key
 * @module estree-util-unassert/types/Key
 */

import type { BaseNode, Node } from 'estree'

/**
 * Field at which a node lives, or where a list of nodes live.
 *
 * @template {Node} [T=Node] - Node type
 */
type Key<T extends Node = Node> = {
  [K in Node['type']]: Exclude<keyof Extract<Node, { type: K }>, keyof BaseNode>
}[T['type']]

export type { Key as default }
