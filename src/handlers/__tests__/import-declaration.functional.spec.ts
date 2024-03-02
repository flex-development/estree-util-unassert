/**
 * @file Functional Tests - ImportDeclaration
 * @module estree-util-unassert/handlers/tests/functional/ImportDeclaration
 */

import context from '#fixtures/context'
import source from '#fixtures/devlop-literal'
import type { Identifier, ImportDeclaration } from 'estree'
import TestSubject from '../import-declaration'

describe('functional:handlers/ImportDeclaration', () => {
  let identifier: Identifier
  let node: ImportDeclaration

  afterAll(() => {
    context.reset()
  })

  beforeAll(() => {
    identifier = { name: 'devlop', type: 'Identifier' }

    node = {
      source,
      specifiers: [{ local: identifier, type: 'ImportNamespaceSpecifier' }],
      type: 'ImportDeclaration'
    }

    TestSubject.call(context, node, 'body', 0)
  })

  it('should register removal if node has assertion module id', () => {
    expect(context.trash.has(node)).to.be.true
    expect(context.identifiers.has(identifier.name)).to.be.true
  })
})
