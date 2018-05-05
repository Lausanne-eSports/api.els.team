'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Database = use('Database')
const Article = use('App/Models/Article')
const ModelNotFound = use('App/Exceptions/ModelNotFoundException')

class ArticleController {
  async show ({ params, response }) {
    const article = await Article.findOrFail(params.id)
    await article.load('translations', (builder) => {
      builder.where('state_id', 4)
    })

    if (article.toJSON().translations.length <= 0) {
      throw new ModelNotFound()
    }

    return article
  }

  async store ({ request }) {
    const metadata = this.$getMetadata(request)
    const translation = this.$getTranslationData(request)

    const trx = await Database.beginTransaction()

    const article = await Article.create(metadata, trx)
    await article.translations().create(translation, trx)

    trx.commit()

    await article.load('translations')

    return article
  }

  $getFormField (request) {
    return request.only([
      'headline', 'description', 'body', 'published_at',
      'template_id', 'state_id', 'category_id', 'language_id',
    ])
  }

  $getMetadata (request) {
    return request.only([
      'published_at', 'template_id', 'category_id'
    ])
  }

  $getTranslationData (request) {
    return request.only([
      'headline', 'description', 'body', 'language_id', 'state_id'
    ])
  }
}

module.exports = ArticleController
