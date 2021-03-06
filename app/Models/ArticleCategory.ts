/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Article from './Article'

export default class ArticleCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @hasMany(() => Article, { foreignKey: 'categoryId' })
  public translations: HasMany<typeof Article>
}
