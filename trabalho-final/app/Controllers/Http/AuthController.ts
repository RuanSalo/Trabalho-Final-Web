import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'password'])
    try {
      const user = await User.create({...data,admin:false})
      await auth.login(user, true)
    } catch (error) {
      session.flash('errors', 'Erro no registro. Verifique suas informações.')
      console.log(error)
      return response.redirect().toRoute('auth.register')
    }
    response.redirect().toRoute('/')
  }

  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async verify({ request, response, auth }: HttpContextContract) {
    const data = request.only(['email', 'password', 'remember'])
    console.log(data)
    await auth.attempt(data.email, data.password, data.remember === 'true')
    response.redirect().toRoute('/')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    response.redirect().toRoute('/')
  }
}