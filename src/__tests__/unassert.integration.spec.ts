/**
 * @file Integration Tests - unassert
 * @module estree-util-unassert/tests/integration/unassert
 */

import type { Options } from '#src/interfaces'
import pathe from '@flex-development/pathe'
import type { Nilable } from '@flex-development/tutils'
import { fromJs } from 'esast-util-from-js'
import type { Program } from 'estree'
import { toJs } from 'estree-util-to-js'
import { read } from 'to-vfile'
import type { VFile } from 'vfile'
import testSubject from '../unassert'

describe('integration:unassert', () => {
  describe('remove assertions', () => {
    it.each<[string, Nilable<Options>?]>([
      ['add.mjs'],
      ['assert.mjs'],
      ['call-expression.mjs'],
      ['century-from-year.mjs'],
      ['digitize.mjs'],
      ['divide.cjs'],
      ['gemoji-html.mjs'],
      ['gemoji-shortcode.mjs'],
      ['http-assert.cjs', { modules: /^(?:http-assert|node:assert)$/ }],
      ['human-readable.mjs'],
      ['multiply.cjs'],
      ['noop.mjs'],
      ['subtract.mjs']
    ])('program sample %#: %s', async (basename, options) => {
      // Arrange
      const path: string = pathe.resolve('__fixtures__', 'modules', basename)
      const file: VFile = await read(path)
      const tree: Program = fromJs(String(file), { module: true })

      // Act
      testSubject(tree, options)

      // Expect
      expect(toJs(tree).value).toMatchSnapshot()
    })
  })
})
