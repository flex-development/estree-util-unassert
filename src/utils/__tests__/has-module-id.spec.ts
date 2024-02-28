/**
 * @file Unit Tests - hasModuleId
 * @module estree-util-unassert/utils/tests/unit/hasModuleId
 */

import type { Assign } from '@flex-development/tutils'
import { createFilter, type CreateFilter } from '@rollup/pluginutils'
import type {
  AwaitExpression,
  CallExpression,
  Identifier,
  ImportDeclaration,
  Literal
} from 'estree'
import testSubject from '../has-module-id'

describe('unit:utils/hasModuleId', () => {
  let devlopIdentifier: Identifier
  let devlopLiteral: Assign<Literal, { raw: string; value: string }>
  let filter: ReturnType<CreateFilter>

  beforeAll(() => {
    devlopLiteral = { raw: '\'devlop\'', type: 'Literal', value: 'devlop' }
    devlopIdentifier = { name: devlopLiteral.value, type: 'Identifier' }
    filter = createFilter(/^devlop$/, [], { resolve: false })
  })

  it('should return false if node.type is ignored', () => {
    expect(testSubject(devlopIdentifier, filter)).to.be.false
  })

  describe('AwaitExpression', () => {
    it('should return false if node is not dynamic assertion import', () => {
      // Arrange
      const node: AwaitExpression = {
        argument: { source: devlopIdentifier, type: 'ImportExpression' },
        type: 'AwaitExpression'
      }

      // Act + Expect
      expect(testSubject(node, filter)).to.be.false
    })

    it('should return true node is dynamic assertion import', () => {
      // Arrange
      const node: AwaitExpression = {
        argument: { source: devlopLiteral, type: 'ImportExpression' },
        type: 'AwaitExpression'
      }

      // Act + Expect
      expect(testSubject(node, filter)).to.be.true
    })
  })

  describe('CallExpression', () => {
    it('should return false if node is not assertion `require` call', () => {
      // Arrange
      const node: CallExpression = {
        arguments: [devlopIdentifier],
        callee: { name: 'require', type: 'Identifier' },
        optional: false,
        type: 'CallExpression'
      }

      // Act + Expect
      expect(testSubject(node, filter)).to.be.false
    })

    it('should return true node is assertion `require` call', () => {
      // Arrange
      const node: CallExpression = {
        arguments: [devlopLiteral],
        callee: { name: 'require', type: 'Identifier' },
        optional: false,
        type: 'CallExpression'
      }

      // Act + Expect
      expect(testSubject(node, filter)).to.be.true
    })
  })

  describe('ImportDeclaration', () => {
    let invariant: Assign<Literal, { raw: string; value: string }>

    beforeAll(() => {
      invariant = { raw: '\'invariant\'', type: 'Literal', value: 'invariant' }
    })

    it('should return false if node is not assertion import', () => {
      // Arrange
      const node: ImportDeclaration = {
        source: invariant,
        specifiers: [
          {
            local: { name: invariant.value, type: 'Identifier' },
            type: 'ImportDefaultSpecifier'
          }
        ],
        type: 'ImportDeclaration'
      }

      // Act + Expect
      expect(testSubject(node, filter)).to.be.false
    })

    it('should return true node is assertion import', () => {
      // Arrange
      const node: ImportDeclaration = {
        source: devlopLiteral,
        specifiers: [
          {
            imported: { name: 'ok', type: 'Identifier' },
            local: { name: 'ok', type: 'Identifier' },
            type: 'ImportSpecifier'
          }
        ],
        type: 'ImportDeclaration'
      }

      // Act + Expect
      expect(testSubject(node, filter)).to.be.true
    })
  })
})
