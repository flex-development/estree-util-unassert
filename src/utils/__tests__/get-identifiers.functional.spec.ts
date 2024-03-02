/**
 * @file Functional Tests - getIdentifiers
 * @module estree-util-unassert/utils/tests/functional/getIdentifiers
 */

import devlopLiteral from '#fixtures/devlop-literal'
import okIdentifier from '#fixtures/ok-identifier'
import type {
  ArrayPattern,
  AssignmentExpression,
  AssignmentPattern,
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  MemberExpression,
  ObjectPattern,
  Property,
  RestElement
} from 'estree'
import testSubject from '../get-identifiers'

describe('functional:utils/getIdentifiers', () => {
  let identifiers: Set<string>

  afterEach(() => {
    identifiers.clear()
  })

  beforeEach(() => {
    identifiers = new Set()
  })

  describe('ArrayPattern', () => {
    let identifier: Identifier
    let node: ArrayPattern

    beforeAll(() => {
      identifier = { name: 'result', type: 'Identifier' }
      node = { elements: [null, identifier], type: 'ArrayPattern' }
    })

    it('should collect identifier names from node.elements', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(identifier.name)).to.be.true
    })
  })

  describe('AssignmentExpression', () => {
    let left: Identifier
    let node: AssignmentExpression

    beforeAll(() => {
      left = { name: 'message', type: 'Identifier' }

      node = {
        left,
        operator: '=',
        right: { raw: '\'\'', type: 'Literal', value: '' },
        type: 'AssignmentExpression'
      }
    })

    it('should collect identifier names from node.left', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(left.name)).to.be.true
    })
  })

  describe('AssignmentPattern', () => {
    let left: Identifier
    let node: AssignmentPattern

    beforeAll(() => {
      left = { name: 'fn', type: 'Identifier' }

      node = {
        left,
        right: { name: 'noop', type: 'Identifier' },
        type: 'AssignmentPattern'
      }
    })

    it('should collect identifier names from node.left', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(left.name)).to.be.true
    })
  })

  describe('Identifier', () => {
    let node: Identifier

    beforeAll(() => {
      node = { name: 'devlop', type: 'Identifier' }
    })

    it('should collect identifier name from node.name', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(node.name)).to.be.true
    })
  })

  describe('ImportDeclaration', () => {
    let local1: Identifier
    let local2: Identifier
    let node: ImportDeclaration

    beforeAll(() => {
      local1 = { name: 'eq', type: 'Identifier' }
      local2 = { name: 'assert', type: 'Identifier' }

      node = {
        source: devlopLiteral,
        specifiers: [
          {
            imported: { name: 'equal', type: 'Identifier' },
            local: local1,
            type: 'ImportSpecifier'
          },
          {
            imported: okIdentifier,
            local: local2,
            type: 'ImportSpecifier'
          }
        ],
        type: 'ImportDeclaration'
      }
    })

    it('should collect identifier names from node.specifiers', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(local1.name)).to.be.true
      expect(identifiers.has(local2.name)).to.be.true
    })
  })

  describe('ImportDefaultSpecifier', () => {
    let local: Identifier
    let node: ImportDefaultSpecifier

    beforeAll(() => {
      local = { name: 'strictAssert', type: 'Identifier' }
      node = { local, type: 'ImportDefaultSpecifier' }
    })

    it('should collect identifier name from node.local', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(local.name)).to.be.true
    })
  })

  describe('ImportNamespaceSpecifier', () => {
    let local: Identifier
    let node: ImportNamespaceSpecifier

    beforeAll(() => {
      local = { name: 'invariant', type: 'Identifier' }
      node = { local, type: 'ImportNamespaceSpecifier' }
    })

    it('should collect identifier name from node.local', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(local.name)).to.be.true
    })
  })

  describe('ImportSpecifier', () => {
    let local: Identifier
    let node: ImportSpecifier

    beforeAll(() => {
      local = { name: 'eq', type: 'Identifier' }

      node = {
        imported: { name: 'equal', type: 'Identifier' },
        local,
        type: 'ImportSpecifier'
      }
    })

    it('should collect identifier name from node.local', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(local.name)).to.be.true
    })
  })

  describe('MemberExpression', () => {
    let node: MemberExpression
    let object: Identifier

    beforeAll(() => {
      object = { name: 'devlop', type: 'Identifier' }

      node = {
        computed: false,
        object,
        optional: false,
        property: { name: 'unreachable', type: 'Identifier' },
        type: 'MemberExpression'
      }
    })

    it('should collect identifier names from node.object', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(object.name)).to.be.true
    })
  })

  describe('ObjectPattern', () => {
    let node: ObjectPattern
    let value1: Identifier
    let value2: Identifier

    beforeAll(() => {
      value1 = { name: 'type', type: 'Identifier' }
      value2 = { name: 'position', type: 'Identifier' }

      node = {
        properties: [
          {
            computed: false,
            key: { raw: '0', type: 'Literal', value: 0 },
            kind: 'init',
            method: false,
            shorthand: true,
            type: 'Property',
            value: value1
          },
          {
            computed: false,
            key: { raw: '1', type: 'Literal', value: 1 },
            kind: 'init',
            method: false,
            shorthand: true,
            type: 'Property',
            value: value2
          }
        ],
        type: 'ObjectPattern'
      }
    })

    it('should collect identifier names from node.properties', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(value1.name)).to.be.true
      expect(identifiers.has(value2.name)).to.be.true
    })
  })

  describe('Property', () => {
    let node: Property
    let value: Identifier

    beforeAll(() => {
      value = { name: 'eq', type: 'Identifier' }

      node = {
        computed: false,
        key: { name: 'equal', type: 'Identifier' },
        kind: 'init',
        method: false,
        shorthand: true,
        type: 'Property',
        value
      }
    })

    it('should collect identifier names from node.value', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(value.name)).to.be.true
    })
  })

  describe('RestElement', () => {
    let argument: Identifier
    let node: RestElement

    beforeAll(() => {
      argument = { name: 'rest', type: 'Identifier' }
      node = { argument, type: 'RestElement' }
    })

    it('should collect identifier names from node.argument', () => {
      // Act
      testSubject(node, identifiers)

      // Expect
      expect(identifiers.has(argument.name)).to.be.true
    })
  })
})
