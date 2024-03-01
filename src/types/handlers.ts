/**
 * @file Type Definitions - Handlers
 * @module estree-util-unassert/types/Handlers
 */

import type { Handler } from '#src/interfaces'
import type { Node } from 'estree'

/**
 * Node handlers map.
 */
type Handlers = { [K in Node['type']]?: Handler<Extract<Node, { type: K }>> }

export type { Handlers as default }
