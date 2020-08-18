/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => ({ version: '20200817', uptime: process.uptime() }))

// Route.post('contact', 'ContactController.store')
Route.post('sessions', 'SessionsController.store')
Route.get('users/validate/:email', 'Admin/UsersController.validate').as('verifyEmail')
// Route.post('password-requests', 'PasswordRequestController.store')
// Route.post('password-requests/:token', 'PasswordRequestController.update')

Route.get('articles/states', 'ArticleStatesController.index')
Route.get('articles/templates', 'ArticleTemplatesController.index')
Route.get('articles/categories', 'ArticleCategoriesController.index')
Route.get('articles/:id', 'ArticlesController.show')
Route.get('articles', 'ArticlesController.index')

Route.get('teams', 'TeamsController.index')
Route.get('teams/categories', 'TeamCategoriesController.index')
Route.get('teams/:id', 'TeamsController.show')

Route.get('staff', 'StaffController.index')
Route.get('staff/:id', 'StaffController.show')

Route.get('streams', 'StreamsController.index')
Route.get('streams/:id', 'StreamsController.show')

Route.get('awards', 'AwardsController.index')
Route.get('awards/categories/order', 'AwardsController.categoryOrder')

Route.group(() => {
  Route.get('me', 'Admin/UsersController.current')
  Route.delete('sessions', 'SessionsController.destroy')
}).middleware('auth')

Route.group(() => {
  Route.get('users', 'UsersController.index')
  Route.post('users', 'UsersController.store')

  Route.resource('members', 'MembersController').apiOnly().except(['destroy'])

  Route.resource('streams', 'StreamsController').apiOnly()

  Route.resource('teams', 'TeamsController').apiOnly().except(['destroy'])
  Route.post('teams/order', 'TeamsController.order')

  Route.resource('teams.members', 'TeamMembersController').except(['show'])
  Route.post('teams/:team_id/members/order', 'TeamMembersController.order')

  Route.resource('staff', 'StaffController').apiOnly().except(['destroy'])
  Route.post('staff/order', 'StaffController.order')

  Route.resource('staff.members', 'StaffMembersController').except(['show'])
  Route.post('staff/:staff_id/members/order', 'StaffMembersController.order')

  //   Route.get('articles', 'ArticleController.index')
  //   Route.post('articles', 'ArticleController.store')
  //   Route.get('articles/:id', 'ArticleController.show')
  //   Route.post('articles/:id/featured', 'ArticleController.featured')

  //   // TODO: add validator
  //   Route.put('articles/:id', 'ArticleController.update')
  //   Route.put('translations/:id', 'ArticleTranslationController.update')
  //   Route.delete('translations/:id', 'ArticleTranslationController.destroy')
  //   Route.get('translations/:id', 'ArticleTranslationController.show')
  //   Route.post('articles/:id/translations', 'ArticleTranslationController.store')

  //   Route.post('awards', 'AwardController.store')
  //   Route.post('awards/order', 'AwardController.order')
  //   Route.post('awards/categories/order', 'AwardController.categoryOrder')
}).middleware('auth').prefix('admin').namespace('App/Controllers/Http/Admin')
