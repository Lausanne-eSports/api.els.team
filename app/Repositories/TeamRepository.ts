/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Team from 'App/Models/Team'

class TeamRepository {
  public all () {
    return Team
      .query()
      .preload('category')
      .preload('members')
      .where('activated', true)
      .orderBy('order', 'asc')
  }

  public get (id: number) {
    return Team
      .query()
      .where('id', id)
      .where('activated', true)
      .preload('category')
      .preload('members', (query) => {
        query.pivotColumns(['role', 'order', 'academy'])
        query.orderBy('order', 'asc')
      })
      .firstOrFail()
  }
}

export default new TeamRepository()
