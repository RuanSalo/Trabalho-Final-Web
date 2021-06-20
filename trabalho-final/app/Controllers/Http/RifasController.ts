import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rifa from 'App/Models/Rifa'

export default class RifasController {
  public async index({ view, auth}: HttpContextContract) {
    const user = auth.user!!
    const rifas = await user.related('rifas').query()
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

  public async edit({}: HttpContextContract) {}

  public async update({auth,request,response,params}: HttpContextContract) {
    const rifa = await this.getRifa(auth, params.id, true)
    const bilhete = request.only(['rifa.bilhete'])
    if (!bilhete.comprado) {
      
    }
    
  }

  public async destroy({params, response, auth, session}: HttpContextContract) {
    const rifa = await this.getRifa(auth, params.id, true)
    rifa.delete()
    session.flash('error', 'Rifa removida com sucesso.')
    response.redirect().toRoute('rifas/index')
  }

  private async getRifa(auth: AuthContract, id, preload = false): Promise<Rifa> {
    const user = auth.user!!
    if (preload) {
      return await user.related('rifas').query().where('id', id).preload('bilhetes').firstOrFail()
    } else {
      return await user.related('rifas').query().where('id', id).firstOrFail()
    }
  }
}