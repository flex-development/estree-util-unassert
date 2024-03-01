/**
 * @file Fixtures - context
 * @module fixtures/context
 */

import type { HandlerContext } from '#src/interfaces'
import MODULES_REGEX from '#src/utils/modules-regex'
import { createFilter } from '@rollup/pluginutils'

/**
 * Node enter handler context.
 *
 * @const {HandlerContext & { reset: () => void }} context
 */
const context: HandlerContext & { reset(): void } = {
  grandparent: null,
  identifiers: new Set(),
  modules: createFilter(MODULES_REGEX, [], { resolve: false }),
  parent: null,
  reset: vi.fn(),
  trash: new WeakSet()
}

context.reset = () => {
  context.grandparent = null
  context.identifiers.clear()
  context.parent = null
  context.trash = new WeakSet()
}

export default context
