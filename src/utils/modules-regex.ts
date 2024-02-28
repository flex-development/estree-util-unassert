/**
 * @file Utilities - MODULES_REGEX
 * @module estree-util-unassert/utils/MODULES_REGEX
 */

/**
 * Default regular expression used to match assertion module ids.
 *
 * @const {RegExp} MODULES_REGEX
 */
const MODULES_REGEX: RegExp =
  /^(?:(?:(?:power-)|(?:uvu\/))?assert|devlop|(?:node:)?assert(?:\/strict)?)$/

export default MODULES_REGEX
