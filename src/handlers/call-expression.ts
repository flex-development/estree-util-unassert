/**
 * @file Handlers - CallExpression
 * @module estree-util-unassert/handlers/CallExpression
 */

import type { HandlerContext } from '#src/interfaces'
import type { Key } from '#src/types'
import {
  DOT,
  at,
  define,
  set,
  type Optional
} from '@flex-development/tutils'
import { ok, unreachable } from 'devlop'
import type * as estree from 'estree'
import { CONTINUE, type Index } from 'estree-util-visit'
import { is } from 'unist-util-is'

/**
 * Add an ancestor node to the trash to be removed on exit or replace `node` if
 * it contains an assertion identifier.
 *
 * Supported parents:
 *
 * - {@linkcode estree.ArrayExpression}
 * - {@linkcode estree.ArrowFunctionExpression}
 * - {@linkcode estree.AssignmentExpression}
 * - {@linkcode estree.AssignmentPattern}
 * - {@linkcode estree.AwaitExpression}
 * - {@linkcode estree.CallExpression}
 * - {@linkcode estree.ConditionalExpression}
 * - {@linkcode estree.ExportDefaultDeclaration}
 * - {@linkcode estree.ExpressionStatement}
 * - {@linkcode estree.LogicalExpression}
 * - {@linkcode estree.Property}
 * - {@linkcode estree.ReturnStatement}
 * - {@linkcode estree.UnaryExpression}
 * - {@linkcode estree.YieldExpression}
 *
 * @see {@linkcode HandlerContext}
 * @see {@linkcode estree.CallExpression}
 *
 * @this {HandlerContext}
 *
 * @param {estree.CallExpression} node - Node being entered
 * @param {Key} key - Field at which `node` lives in `this.parent` (or where a
 * list of nodes live if `this.parent[key]` is an array)
 * @param {Optional<Index>} index - Index where `node` lives in `this.parent`,
 * or `undefined` if `this.parent[key]` is not an array
 * @return {typeof CONTINUE} Next action
 */
function CallExpression(
  this: HandlerContext,
  node: estree.CallExpression,
  key: Key,
  index: Optional<Index>
): typeof CONTINUE {
  if (
    (
      is(node.callee, 'Identifier') &&
      this.identifiers.has(node.callee.name)
    ) ||
    (
      is(node.callee, 'MemberExpression') &&
      is(node.callee.object, 'Identifier') &&
      this.identifiers.has(node.callee.object.name)
    ) ||
    (
      is(node.callee, 'MemberExpression') &&
      is(node.callee.object, 'Identifier') &&
      is(node.callee.property, 'Identifier') &&
      node.callee.object.name === 'console' &&
      node.callee.property.name === 'assert'
    )
  ) {
    ok(this.parent, 'expected `parent`')
    ok(key, 'expected `key`')
    ok(key in this.parent, `expected \`parent.${key}\``)

    /**
     * Zero (`0`) node.
     *
     * @const {estree.Literal} zero
     */
    const zero: estree.Literal = { raw: '0', type: 'Literal', value: 0 }

    /**
     * Void zero (`void 0`) expression node.
     *
     * @const {estree.UnaryExpression} void0
     */
    const void0: estree.UnaryExpression = {
      argument: zero,
      operator: 'void',
      prefix: true,
      type: 'UnaryExpression'
    }

    // add ancestor to trash or replace node
    switch (this.parent.type) {
      case 'ArrayExpression':
      case 'CallExpression':
        ok(typeof index === 'number', 'expected `index` to be a number')
        set(this.parent, key + DOT + index, void0)
        break
      case 'AssignmentExpression':
        if (is(this.grandparent, 'ExpressionStatement')) {
          this.trash.add(this.grandparent)
        } else {
          define(this.parent, key, { value: void0 })
        }
        break
      case 'ArrowFunctionExpression':
      case 'AssignmentPattern':
      case 'ConditionalExpression':
      case 'LogicalExpression':
      case 'Property':
        define(this.parent, key, { value: void0 })
        break
      case 'AwaitExpression':
        if (is(this.grandparent, 'ExpressionStatement')) {
          this.trash.add(this.grandparent)
        } else {
          define(this.parent, key, { value: void0 })
        }
        break
      case 'ExpressionStatement':
        this.trash.add(this.parent)

        if (is(this.grandparent, 'IfStatement')) {
          !this.grandparent.alternate && this.trash.add(this.grandparent)
        }
        break
      case 'ExportDefaultDeclaration':
        define(this.parent, key, { value: at(node.arguments, 0, void0) })
        break
      case 'ReturnStatement':
      case 'YieldExpression':
        define(this.parent, key, { value: null })
        break
      case 'UnaryExpression':
        if (is(this.grandparent, 'ExpressionStatement')) {
          this.trash.add(this.grandparent)
        } else {
          define(this.parent, key, {
            value: this.parent.operator === 'void' ? zero : void0
          })
        }
        break
      /* c8 ignore next 3 */
      default:
        console.dir(this.parent, { depth: 10 })
        void unreachable(`unexpected parent: ${this.parent.type}`)
    }
  }

  return CONTINUE
}

export default CallExpression
