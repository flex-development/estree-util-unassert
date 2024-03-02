/**
 * @file Functional Tests - CallExpression
 * @module estree-util-unassert/handlers/tests/functional/CallExpression
 */

import context from '#fixtures/context'
import okIdentifier from '#fixtures/ok-identifier'
import void0 from '#fixtures/void0'
import zero from '#fixtures/zero'
import type { Key } from '#src/types'
import type { Assign } from '@flex-development/tutils'
import type {
  ArrayExpression,
  ArrowFunctionExpression,
  AssignmentExpression,
  AssignmentPattern,
  AwaitExpression,
  CallExpression,
  ConditionalExpression,
  ExportDefaultDeclaration,
  Identifier,
  Literal,
  LogicalExpression,
  MemberExpression,
  Property,
  ReturnStatement,
  UnaryExpression,
  YieldExpression
} from 'estree'
import TestSubject from '../call-expression'

describe('functional:handlers/CallExpression', () => {
  type IdentifierMember = Assign<MemberExpression, { object: Identifier }>
  type WithIdentifierCallee = Assign<CallExpression, { callee: Identifier }>

  let deprecate: WithIdentifierCallee
  let ok: WithIdentifierCallee
  let notTrue: Assign<UnaryExpression, { argument: Literal }>

  beforeAll(() => {
    notTrue = {
      argument: { raw: 'true', type: 'Literal', value: true },
      operator: '!',
      prefix: true,
      type: 'UnaryExpression'
    }

    ok = {
      arguments: [zero],
      callee: okIdentifier,
      optional: false,
      type: 'CallExpression'
    }

    deprecate = {
      arguments: [{ name: 'add', type: 'Identifier' }],
      callee: { name: 'deprecate', type: 'Identifier' },
      optional: false,
      type: 'CallExpression'
    }
  })

  describe('is(parent, "ArrayExpression")', () => {
    let index: number
    let key: Key<ArrayExpression>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        elements: [ok],
        type: 'ArrayExpression'
      }

      index = 0
      key = 'elements'

      TestSubject.call(context, ok, key, index)
    })

    it('should replace node with `void 0` expression', () => {
      expect(context.parent).to.have.deep.property(key, [void0])
    })
  })

  describe('is(parent, "ArrowFunctionExpression")', () => {
    let key: Key<ArrowFunctionExpression>

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        async: false,
        body: ok,
        expression: true,
        generator: false,
        params: [],
        type: 'ArrowFunctionExpression'
      }

      key = 'body'

      TestSubject.call(context, ok, key, undefined)
    })

    it('should replace node with `void 0` expression', () => {
      expect(context.parent).to.have.deep.property(key, void0)
    })
  })

  describe('is(parent, "AssignmentExpression")', () => {
    let key: Key<AssignmentExpression>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        left: { name: 'u', type: 'Identifier' },
        operator: '=',
        right: ok,
        type: 'AssignmentExpression'
      }

      key = 'right'
    })

    describe('grandparent.type !== "ExpressionStatement"', () => {
      beforeAll(() => {
        context.grandparent = {
          elements: [<AssignmentExpression>context.parent],
          type: 'ArrayExpression'
        }

        TestSubject.call(context, ok, key, undefined)
      })

      it('should replace node with `void 0` expression', () => {
        expect(context.parent).to.have.deep.property(key, void0)
      })
    })

    describe('is(grandparent, "ExpressionStatement")', () => {
      beforeAll(() => {
        context.grandparent = {
          expression: <AssignmentExpression>context.parent,
          type: 'ExpressionStatement'
        }

        TestSubject.call(context, ok, key, undefined)
      })

      it('should add grandparent to trash', () => {
        expect(context.trash.has(context.grandparent!)).to.be.true
      })
    })
  })

  describe('is(parent, "AssignmentPattern")', () => {
    let key: Key<AssignmentPattern>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        left: { name: 'u', type: 'Identifier' },
        right: ok,
        type: 'AssignmentPattern'
      }

      key = 'right'

      TestSubject.call(context, ok, key, undefined)
    })

    it('should replace node with `void 0` expression', () => {
      expect(context.parent).to.have.deep.property(key, void0)
    })
  })

  describe('is(parent, "AwaitExpression")', () => {
    let key: Key<AwaitExpression>
    let node: Assign<CallExpression, { callee: IdentifierMember }>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      node = {
        arguments: [{ name: 'fn', type: 'Identifier' }],
        callee: {
          computed: false,
          object: { name: 'assert', type: 'Identifier' },
          optional: false,
          property: { name: 'doesNotReject', type: 'Identifier' },
          type: 'MemberExpression'
        },
        optional: false,
        type: 'CallExpression'
      }

      context.identifiers.add(node.callee.object.name)

      context.parent = {
        argument: node,
        type: 'AwaitExpression'
      }

      key = 'argument'
    })

    describe('grandparent.type !== "ExpressionStatement"', () => {
      beforeAll(() => {
        context.grandparent = {
          id: { name: 'result', type: 'Identifier' },
          init: <AwaitExpression>context.parent,
          type: 'VariableDeclarator'
        }

        TestSubject.call(context, node, key, undefined)
      })

      it('should replace node with `void 0` expression', () => {
        expect(context.parent).to.have.deep.property(key, void0)
      })
    })

    describe('is(grandparent, "ExpressionStatement")', () => {
      beforeAll(() => {
        context.grandparent = {
          expression: <AwaitExpression>context.parent,
          type: 'ExpressionStatement'
        }

        TestSubject.call(context, node, key, undefined)
      })

      it('should add grandparent to trash', () => {
        expect(context.trash.has(context.grandparent!)).to.be.true
      })
    })
  })

  describe('is(parent, "CallExpression")', () => {
    let index: number
    let key: Key<CallExpression>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        arguments: [ok],
        callee: { name: 'noop', type: 'Identifier' },
        optional: false,
        type: 'CallExpression'
      }

      index = 0
      key = 'arguments'

      TestSubject.call(context, ok, key, index)
    })

    it('should replace node with `void 0` expression', () => {
      expect(context.parent).to.have.deep.property(key, [void0])
    })
  })

  describe('is(parent, "ConditionalExpression")', () => {
    let key: Key<ConditionalExpression>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        alternate: zero,
        consequent: ok,
        test: notTrue,
        type: 'ConditionalExpression'
      }

      key = 'consequent'

      TestSubject.call(context, ok, key, undefined)
    })

    it('should replace node with `void 0` expression', () => {
      expect(context.parent).to.have.deep.property(key, void0)
    })
  })

  describe('is(parent, "ExpressionStatement")', () => {
    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        expression: ok,
        type: 'ExpressionStatement'
      }

      TestSubject.call(context, ok, 'expression', undefined)
    })

    it('should add parent to trash', () => {
      expect(context.trash.has(context.parent!)).to.be.true
    })
  })

  describe('is(parent, "ExportDefaultDeclaration")', () => {
    let key: Key<ExportDefaultDeclaration>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(deprecate.callee.name)

      context.parent = {
        declaration: deprecate,
        type: 'ExportDefaultDeclaration'
      }

      key = 'declaration'

      TestSubject.call(context, deprecate, key, undefined)
    })

    it('should replace node with node.arguments[0]', () => {
      expect(context.parent).to.have.deep.property(key, deprecate.arguments[0])
    })
  })

  describe('is(parent, "LogicalExpression")', () => {
    let key: Key<LogicalExpression>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        left: notTrue,
        operator: '&&',
        right: ok,
        type: 'LogicalExpression'
      }

      key = 'right'

      TestSubject.call(context, ok, key, undefined)
    })

    it('should replace node with `void 0` expression', () => {
      expect(context.parent).to.have.deep.property(key, void0)
    })
  })

  describe('is(parent, "Property")', () => {
    let key: Key<Property>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        computed: false,
        key: ok.callee,
        kind: 'init',
        method: false,
        shorthand: false,
        type: 'Property',
        value: ok
      }

      key = 'value'

      TestSubject.call(context, ok, key, undefined)
    })

    it('should replace node with `void 0` expression', () => {
      expect(context.parent).to.have.deep.property(key, void0)
    })
  })

  describe('is(parent, "ReturnStatement")', () => {
    let key: Key<ReturnStatement>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        argument: ok,
        type: 'ReturnStatement'
      }

      key = 'argument'

      TestSubject.call(context, ok, key, undefined)
    })

    it('should replace node with `null`', () => {
      expect(context.parent).to.have.property(key, null)
    })
  })

  describe('is(parent, "UnaryExpression")', () => {
    let key: Key<UnaryExpression>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      key = 'argument'
    })

    describe('grandparent.type !== "ExpressionStatement"', () => {
      beforeAll(() => {
        context.identifiers.add(ok.callee.name)
      })

      describe('parent.operator !== "void"', () => {
        beforeAll(() => {
          context.parent = {
            argument: ok,
            operator: '!',
            prefix: true,
            type: 'UnaryExpression'
          }

          context.grandparent = {
            argument: context.parent,
            type: 'ReturnStatement'
          }

          TestSubject.call(context, ok, key, undefined)
        })

        it('should replace node with `void 0` expression', () => {
          expect(context.parent).to.have.deep.property(key, void0)
        })
      })

      describe('parent.operator === "void"', () => {
        beforeAll(() => {
          context.parent = {
            argument: ok,
            operator: 'void',
            prefix: true,
            type: 'UnaryExpression'
          }

          context.grandparent = {
            argument: context.parent,
            type: 'ReturnStatement'
          }

          TestSubject.call(context, ok, key, undefined)
        })

        it('should replace node with `0`', () => {
          expect(context.parent).to.have.deep.property(key, zero)
        })
      })
    })

    describe('is(grandparent, "ExpressionStatement")', () => {
      let node: Assign<CallExpression, { callee: IdentifierMember }>

      beforeAll(() => {
        node = {
          arguments: [zero],
          callee: {
            computed: false,
            object: { name: 'console', type: 'Identifier' },
            optional: false,
            property: { name: 'assert', type: 'Identifier' },
            type: 'MemberExpression'
          },
          optional: false,
          type: 'CallExpression'
        }

        context.parent = {
          argument: node,
          operator: 'void',
          prefix: true,
          type: 'UnaryExpression'
        }

        context.grandparent = {
          expression: context.parent,
          type: 'ExpressionStatement'
        }

        TestSubject.call(context, node, key, undefined)
      })

      it('should add grandparent to trash', () => {
        expect(context.trash.has(context.grandparent!)).to.be.true
      })
    })
  })

  describe('is(parent, "YieldExpression")', () => {
    let key: Key<YieldExpression>

    afterAll(() => {
      context.reset()
    })

    beforeAll(() => {
      context.identifiers.add(ok.callee.name)

      context.parent = {
        argument: ok,
        delegate: false,
        type: 'YieldExpression'
      }

      key = 'argument'

      TestSubject.call(context, ok, key, undefined)
    })

    it('should replace node with `null`', () => {
      expect(context.parent).to.have.property(key, null)
    })
  })
})
