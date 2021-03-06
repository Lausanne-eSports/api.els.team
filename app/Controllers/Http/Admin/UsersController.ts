/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserStoreValidator from 'App/Validators/UserStoreValidator'
import Event from '@ioc:Adonis/Core/Event'

export default class UsersController {
  public async current ({ auth }: HttpContextContract) {
    return auth.user
  }

  public async index ({ response }: HttpContextContract) {
    const users = await User.all()

    return response.json(users)
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(UserStoreValidator)
    const user = await User.create(data)
    Event.emit('new:user', user)

    return response.ok({
      user,
      status: 200,
      message: 'Account created successfully',
    })
  }

  public async validate ({ params, request, response }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Validation failed')
    }

    const user = await User.findByOrFail('email', params.email)
    user.accountStatus = 'active'
    await user.save()

    return response.ok({
      status: 200,
      message: 'Account validated successfully',
    })
  }
}
