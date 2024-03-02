import {
  DOT,
  at,
  define,
  set
} from '@flex-development/tutils'
import { ok, unreachable } from 'devlop'
import { CONTINUE } from 'estree-util-visit'
import { is } from 'unist-util-is'

function CallExpression(node, key, index) {
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
    const zero = { raw: '0', type: 'Literal', value: 0 }
    const void0 = {
      argument: zero,
      operator: 'void',
      prefix: true,
      type: 'UnaryExpression'
    }
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
      default:
        console.dir(this.parent, { depth: 10 })
        void unreachable(`unexpected parent: ${this.parent.type}`)
    }
  }
  return CONTINUE
}

var call_expression_default = CallExpression
export {
  call_expression_default as default
}
