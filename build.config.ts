/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import { constant, define } from '@flex-development/tutils'
import { ok } from 'devlop'
import type { BuildResult, PluginBuild } from 'esbuild'
import util from 'node:util'
import pkg from './package.json' assert { type: 'json' }
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

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
      dts: 'only',
      outdir: 'dist/dev'
    },
    {
      dts: false,
      ignore: ['interfaces'],
      outdir: 'dist/dev',
      sourcemap: true,
      sourcesContent: false
    },
    {
      dts: false,
      ignore: ['interfaces'],
      plugins: [],
      sourcemap: true,
      sourcesContent: false
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
         * Regular expression used to fix module specifier.
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
    }
  ],
  target: [
    pkg.engines.node.replace(/^\D+/, 'node'),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
