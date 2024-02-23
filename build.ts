/**
 * @file Build Workflow
 * @module build
 */

import make from '@flex-development/mkbuild'
import config from './build.config'

await make({ ...config, configfile: false, write: true })
