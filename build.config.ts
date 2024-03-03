/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { unassert } from '@flex-development/estree-util-unassert'
import {
  defineBuildConfig,
  type Config,
  type OutputMetadata
} from '@flex-development/mkbuild'
import pathe from '@flex-development/pathe'
import {
  DOT,
  constant,
  define,
  entries,
  get,
  overwrite
} from '@flex-development/tutils'
import { ok } from 'devlop'
import { fromJs } from 'esast-util-from-js'
import type { BuildResult, Metafile, OutputFile, PluginBuild } from 'esbuild'
import type { Program } from 'estree'
import { attachComments } from 'estree-util-attach-comments'
import { toJs } from 'estree-util-to-js'
import { visit } from 'estree-util-visit'
import util from 'node:util'
import pkg from './package.json' assert { type: 'json' }
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

declare module 'estree' {
  interface BaseNode {
    position?: import('unist').Position | undefined
  }
}

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  charset: 'utf8',
  entries: [
    {
      dts: 'only'
    },
    {
      dts: false,
      ignore: ['interfaces', 'types']
    }
  ],
  plugins: [
    {
      /**
       * Plugin name.
       */
      name: 'rollup-pluginutils-specifier',

      /**
       * Fix the `@rollup/pluginutils` module specifier.
       *
       * @this {void}
       *
       * @param {PluginBuild} build - esbuild plugin api
       * @return {void} Nothing
       */
      setup(build: PluginBuild): void {
        /**
         * Regular expression used to fix module specifiers.
         *
         * @const {RegExp} regex
         */
        const regex: RegExp = /(["'])(@rollup\/pluginutils).+(["'])/

        // fix module specifiers on build end
        return void build.onEnd((result: BuildResult): void => {
          ok(result.outputFiles, 'expected output files')

          for (const output of result.outputFiles) {
            if (/\.[cm]?[jt]s$/.test(output.path)) {
              let { text } = output

              text = text.replace(regex, '$1$2$1')
              define(output, 'text', { get: constant(text) })
              output.contents = new util.TextEncoder().encode(text)
            }
          }
        })
      }
    },
    {
      /**
       * Plugin name.
       */
      name: unassert.name,

      /**
       * Remove assertions.
       *
       * @this {void}
       *
       * @param {PluginBuild} build - esbuild plugin api
       * @return {void} Nothing
       */
      setup(build: PluginBuild): void {
        const {
          absWorkingDir: cwd = process.cwd(),
          format,
          outdir = DOT
        } = build.initialOptions

        /**
         * Directory to store development output files.
         *
         * @const {string} devdir
         */
        const devdir: string = pathe.join(outdir, 'dev')

        return void build.onEnd((result: BuildResult): void => {
          ok(result.metafile, 'expected metafile')
          ok(result.outputFiles, 'expected output files')

          /**
           * Output file filter.
           *
           * @const {RegExp} filter
           */
          const filter: RegExp = /\.[cm]{0,1}js$/

          /**
           * Development output file metadata.
           *
           * @const {Metafile['outputs']} outputs
           */
          const outputs: Metafile['outputs'] = {}

          /**
           * Development output files.
           *
           * @const {OutputFile[]} outputs
           */
          const outputFiles: OutputFile[] = []

          // get development output file metadata
          for (const [path, output] of entries(result.metafile.outputs)) {
            if (filter.test(path)) {
              define(outputs, path.replace(outdir, devdir), { value: output })
            }
          }

          // handle output files
          for (const output of result.outputFiles) {
            if (filter.test(output.path)) {
              /**
               * JavaScript syntax tree.
               *
               * @const {Program} tree
               */
              const tree: Program = fromJs(output.text, {
                module: format !== 'iife'
              })

              // attach comments
              visit(tree, node => void (node.loc = node.position))
              attachComments(tree, tree.comments)
              delete tree.comments

              // remove assertions
              unassert(tree)

              /**
               * Relative path to output file.
               *
               * @const {string} outfile
               */
              const outfile: string = output.path.replace(cwd + pathe.sep, '')

              /**
               * Path to development output file.
               *
               * @const {string} devpath
               */
              const devpath: string = pathe.resolve(
                cwd,
                devdir,
                outfile.replace(outdir + pathe.sep, '')
              )

              /**
               * Output file text.
               *
               * @const {string} text
               */
              const text: string = toJs(tree).value

              /**
               * Output file contents.
               *
               * @const {Uint8Array} contents
               */
              const contents: Uint8Array = new util.TextEncoder().encode(text)

              /**
               * Output file metadata.
               *
               * @const {OutputMetadata} metadata
               */
              const metadata: OutputMetadata = get(
                result.metafile.outputs,
                outfile
              )

              // assert output file metadata
              ok(metadata, 'expected output file metadata')

              // add development output file
              outputFiles.push(
                define({ contents: output.contents, path: devpath }, 'text', {
                  get: constant(output.text)
                })
              )

              // update output file
              define(output, 'text', { get: constant(text) })
              output.contents = new util.TextEncoder().encode(output.text)

              // update output file metadata
              define(result.metafile.outputs, outfile, {
                value: overwrite(metadata, {
                  bytes: contents.byteLength,
                  imports: metadata.imports.filter(({ path }) => {
                    return !unassert.MODULES_REGEX.test(path)
                  })
                })
              })
            }
          }

          // update output files and metadata
          result.outputFiles = [...outputFiles, ...result.outputFiles]
          result.metafile.outputs = { ...outputs, ...result.metafile.outputs }
        })
      }
    }
  ],
  target: [
    pkg.engines.node.replace(/^\D+/, 'node'),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
