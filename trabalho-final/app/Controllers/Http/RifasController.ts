import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rifa from 'App/Models/Rifa'

export default class RifasController {
  public async index({ view }: HttpContextContract) {
    return view.render('rifas.index')
  }

  public async show({ params, view, auth }: HttpContextContract) {
    const rifa = await this.getRifa(auth, params.id)
    return view.render('rifas.show', rifa)
  }

  public async create({ view }: HttpContextContract) {
    return view.render('rifas.create')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = request.only([
      'titulo',
      'dataInicioVenda',
      'dataFimVenda',
      'dataProvavelSorteio',
      'valorBilhete',
    ])
    const user = auth.user
    await Rifa.create({ ...data, userId: user?.id, tipoId: 1 })
    response.redirect().toRoute('rifas.index')
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  private async getRifa(auth: AuthContract, id): Promise<Rifa> {
    const user = auth.user!!
    return await user.related('rifas').query().where('id', id).firstOrFail()
  }
}