import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bilhete from 'App/Models/Bilhete'
import Rifa from 'App/Models/Rifa'

export default class RifasController {
  public async index({ view, auth}: HttpContextContract) {
    const rifas = await Rifa.all()
    return view.render('rifas/index', {rifas})
  }

  public async show({ params, view, auth }: HttpContextContract) {
    const rifa = await this.getRifa(auth, params.id,true)
    return view.render('rifas/show', {rifa})
  }

  public async create({ view }: HttpContextContract) {
    return view.render('rifas/create')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = request.only([
      'titulo',
      'descricao',
      'dataInicioVenda',
      'dataFimVenda',
      'dataProvavelSorteio',
      'dataSorteio',
      'valorBilhete',
    ])
    const user = auth.user
    const rifa = await Rifa.create({ ...data, userId: user?.id, tipoId: 1, })
    for(let i = 1; i <=50; i++){
      await rifa.related('bilhetes').create({numero: i,comprado: false,userId: user?.id})
    }
    response.redirect().toRoute('rifas.index')
  }

  public async comprado({ params, response, auth }: HttpContextContract) {
    const rifa = await this.getRifa(auth, params.id, true)
    const bilhete = await this.getBilhete(auth, params)
    bilhete.comprado = !bilhete.comprado
    bilhete.save()
    response.redirect().toRoute('rifas.show', {id: rifa.id})
  }

  public async destroy({params, response, auth, session}: HttpContextContract) {
    const rifa = await this.getRifa(auth, params.id, true)
    rifa.delete()
    session.flash('error', 'Rifa removida com sucesso.')
    response.redirect().toRoute('rifas/show')
  }

  private async getRifa(auth: AuthContract, id, preload = false): Promise<Rifa> {
    const user = auth.user!!
    if (preload) {
      return await user.related('rifas').query().where('id', id).preload('bilhetes').firstOrFail()
    } else {
      return await user.related('rifas').query().where('id', id).firstOrFail()
    }
  }
  private async getBilhete(auth: AuthContract, params): Promise<Bilhete> {
    const user = auth.user!!    
    return await user
      .related('bilhetes')
      .query()
      .where('bilhetes.id', params.bilhete_id)
      .where('bilhetes.rifa_id', params.id)
      .firstOrFail()
  }
}