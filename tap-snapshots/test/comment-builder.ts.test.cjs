/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/comment-builder.ts TAP builds a comment with deprecated = true > snapshot 1`] = `
/**
 * @deprecated
 *
 * This is a summary
 */

`

exports[`test/comment-builder.ts TAP builds a full comment > snapshot 1`] = `
/**
 * This is a summary
 *
 * This is a description
 *
 * @deprecated
 *
 * This is a deprecation message
 *
 * @param param1 - This is a param1 description
 *
 * @param param2 - This is a param2 description
 *
 * @returns This is a return description
 */

`

exports[`test/comment-builder.ts TAP builds a minimal comment with description > snapshot 1`] = `
/**
 * This is a description
 */

`

exports[`test/comment-builder.ts TAP builds a minimal comment with summary > snapshot 1`] = `
/**
 * This is a summary
 */

`
