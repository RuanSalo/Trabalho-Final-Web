import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rifa from 'App/Models/Rifa'
import Rifas from 'Database/migrations/1621269982239_rifas'

export default class RifasController {
  public async index ({view}: HttpContextContract) {
    return view.render('rifas.index')
  }

  public async show ({}: HttpContextContract) {
  }

  public async create ({view}: HttpContextContract) {
    return view.render('rifas.create')

  }

  public async store ({request, response}: HttpContextContract) {
    const data = request.all()
    await Rifa.create(data)
    response.redirect().toRoute('rifas.index')
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
