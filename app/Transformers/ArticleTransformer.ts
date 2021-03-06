/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Article from 'App/Models/Article'
import ArticleTranslation from 'App/Models/ArticleTranslation'

class ArticleTransformer {
  private getTranslation (translation: ArticleTranslation) {
    return {
      headline: translation.headline,
      code: translation.language.code,
    }
  }

  public transform (article: Article) {
    return {
      translations: article.translations.map(translation => this.getTranslation(translation)),
      id: article.id,
      featured: article.featured,
      featured_thumbnail: article.featuredThumbnail,
      published_at: article.publishedAt,
      thumbnail: article.thumbnail,
      category_id: article.categoryId,
    }
  }

  public transformCollection (articles: Article[]) {
    return articles.map(article => this.transform(article))
  }
}

export default new ArticleTransformer()
