import {
  DocBlock,
  DocBlockTag,
  DocComment,
  DocParagraph,
  DocParamBlock,
  DocPlainText,
  TSDocConfiguration,
} from '@microsoft/tsdoc'

/**
 * Represents data that can be used to build a DocComment.
 */
interface DocCommentData {
  configuration?: TSDocConfiguration
  summary?: string
  description?: string
  deprecated?: string | boolean
  params?: DocParamData[]
  returns?: string
}

/**
 * Represents data that can be used to build a DocParamBlock.
 */
interface DocParamData {
  name: string
  description: string
}

export class DocCommentBuilder {
  private _configuration: TSDocConfiguration
  private _params: DocParamData[]

  summary?: string
  description?: string
  deprecated?: string | boolean
  returns?: string

  constructor(data?: DocCommentData) {
    this._configuration = data?.configuration || new TSDocConfiguration()
    this._params = data?.params || []

    this.summary = data?.summary
    this.description = data?.description
    this.deprecated = data?.deprecated
    this.returns = data?.returns
  }

  get configuration() {
    return this._configuration
  }

  get params() {
    return this._params
  }

  build(): DocComment {
    const {configuration, summary, description, deprecated, params, returns} =
      this
    const comment = new DocComment({configuration})

    let summarySection = comment.summarySection

    if (deprecated) {
      if (deprecated === true) {
        comment.deprecatedBlock = this._buildDeprecatedBlock()
        summarySection = comment.deprecatedBlock.content
      } else {
        comment.deprecatedBlock = this._buildDeprecatedBlock(deprecated)
      }
    }

    if (summary != null) {
      summarySection.appendNode(
        new DocParagraph({configuration}, [
          new DocPlainText({configuration, text: summary}),
        ]),
      )
    }

    if (description != null) {
      summarySection.appendNode(
        new DocParagraph({configuration}, [
          new DocPlainText({configuration, text: description}),
        ]),
      )
    }

    for (const param of params) {
      comment.params.add(this._buildParamBlock(param))
    }

    if (returns != null) {
      comment.returnsBlock = this._buildReturnsBlock(returns)
    }

    return comment
  }

  private _buildBlock(tagName: string, description?: string) {
    const configuration = this._configuration
    const blockTag = new DocBlockTag({configuration, tagName})
    const block = new DocBlock({configuration, blockTag})

    if (description != null) {
      block.content.appendNodeInParagraph(
        new DocPlainText({configuration, text: description}),
      )
    }

    return block
  }

  private _buildDeprecatedBlock(description?: string) {
    return this._buildBlock('@deprecated', description)
  }

  private _buildReturnsBlock(description: string) {
    return this._buildBlock('@returns', description)
  }

  private _buildParamBlock({name, description}: DocParamData) {
    const configuration = this._configuration
    const blockTag = new DocBlockTag({configuration, tagName: '@param'})
    const block = new DocParamBlock({
      configuration,
      blockTag,
      parameterName: name,
    })

    block.content.appendNodeInParagraph(
      new DocPlainText({configuration, text: description}),
    )

    return block
  }
}
