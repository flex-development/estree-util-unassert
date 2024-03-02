/**
 * @file unassert
 * @module estree-util-unassert/unassert
 */

import type { Nilable } from '@flex-development/tutils'
import { createFilter } from '@rollup/pluginutils'
import type { Node, Program } from 'estree'
import { visit } from 'estree-util-visit'
import * as handlers from './handlers'
import type { HandlerContext, Options } from './interfaces'
import { MODULES_REGEX } from './utils'
import * as visitors from './visitors'

/**
 * Remove assertions.
 *
 * @see {@linkcode Options}
 * @see {@linkcode Program}
 *
 * @this {void}
 *
 * @param {Program} tree - JavaScript syntax tree
 * @param {Nilable<Options>?} [options] - Configuration options
 * @return {void} Nothing
 */
function unassert(this: void, tree: Program, options?: Nilable<Options>): void {
  options ??= {}
  options.modules ??= MODULES_REGEX

  /**
   * Node handler context.
   *
   * @const {HandlerContext} context
   */
  const context: HandlerContext = {
    grandparent: null,
    identifiers: new Set<string>(),
    modules: createFilter(options.modules, [], { resolve: false }),
    parent: null,
    trash: new WeakSet<Node>()
  }

  return void visit(tree, {
    enter: visitors.enter(context, handlers),
    leave: visitors.leave(context)
  })
}

export default unassert
