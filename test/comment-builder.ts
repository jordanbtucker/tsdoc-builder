import t from 'tap'

import {DocCommentBuilder} from '..'

t.test('builds a full comment', async t => {
  const builder = new DocCommentBuilder({
    summary: 'This is a summary',
    description: 'This is a description',
    deprecated: 'This is a deprecation message',
    params: [
      {
        name: 'param1',
        description: 'This is a param1 description',
      },
      {
        name: 'param2',
        description: 'This is a param2 description',
      },
    ],
    returns: 'This is a return description',
  })

  const comment = builder.build()

  t.matchSnapshot(comment.emitAsTsdoc(), 'snapshot')
})

t.test('builds a minimal comment with summary', async t => {
  const builder = new DocCommentBuilder({summary: 'This is a summary'})

  const comment = builder.build()

  t.matchSnapshot(comment.emitAsTsdoc(), 'snapshot')
})

t.test('builds a minimal comment with description', async t => {
  const builder = new DocCommentBuilder({description: 'This is a description'})

  const comment = builder.build()

  t.matchSnapshot(comment.emitAsTsdoc(), 'snapshot')
})

t.test('builds a comment with deprecated = true', async t => {
  const builder = new DocCommentBuilder({
    summary: 'This is a summary',
    deprecated: true,
  })

  const comment = builder.build()

  t.matchSnapshot(comment.emitAsTsdoc(), 'snapshot')
})
