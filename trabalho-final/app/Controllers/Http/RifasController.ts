import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rifa from 'App/Models/Rifa'

export default class RifasController {
  public async index ({view}: HttpContextContract) {
    return view.render('rifas.index')
  }

  public async show ({params,view}: HttpContextContract) {
    return view.render('rifas.show')
  }

  public async create ({view}: HttpContextContract) {
    return view.render('rifas.create')

  }

  public async store ({request, response, auth}: HttpContextContract) {
    const data = request.only(['titulo','dataInicioVenda','dataFimVenda','dataProvavelSorteio','valorBilhete'])
    const user = auth.user
    await Rifa.create({...data, userId: user?.id})
    response.redirect().toRoute('rifas.index')
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
