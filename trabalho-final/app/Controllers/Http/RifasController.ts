import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bilhete from 'App/Models/Bilhete'
import Rifa from 'App/Models/Rifa'
import Premio from 'App/Models/Premio'

export default class RifasController {
  public async index({ view }: HttpContextContract) {
    const rifas = await Rifa.all()
    return view.render('rifas/index', {rifas})
  }

  public async show({ params, view, auth }: HttpContextContract) {
    const rifa = await Rifa.query().where('id' , params.id).preload('bilhetes').firstOrFail()
    const user = auth.user
    const premios = await Premio.query().where('rifa_id', rifa.id)
    return view.render('rifas/show', {rifa,user, premios})
  }

  public async formPremio({ view, params }: HttpContextContract) {
    
    return view.render('/rifas/formPremio')
  }

  public async cadastroPremio({ request, response, auth }: HttpContextContract) {
    const data = request.only([
      'colocacao',
      'descricao'
    ])
    const user = auth.user
    const premio = await Premio.create(data)

    
    response.redirect().toRoute('rifas.index')
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
    const dataPremio1 = request.only([
      'descricao1'
    ])
    const dataPremio2 = request.only([
      'descricao2'
    ])
    const dataPremio3 = request.only([
      'descricao3'
    ])
    const user = auth.user
    const rifa = await Rifa.create({ ...data, userId: user?.id, tipoId: 1, })
    await rifa.related('premios').create({descricao: dataPremio1.descricao1,colocacao: 1})
    await rifa.related('premios').create({descricao: dataPremio2.descricao2,colocacao: 2})
    await rifa.related('premios').create({descricao: dataPremio3.descricao3,colocacao: 3})
    for(let i = 1; i <=50; i++){
      await rifa.related('bilhetes').create({numero: i,comprado: false,userId: user?.id})
    }
    response.redirect().toRoute('rifas.index')
  }

  public async comprado({ params, response, auth }: HttpContextContract) {
    const rifa = await Rifa.query().where('id' , params.id).preload('bilhetes').firstOrFail()
    let bilhete = await Bilhete.query().where('id', params.bilhete_id).firstOrFail()
    bilhete.comprado = !bilhete.comprado
    bilhete.save()
    response.redirect().toRoute('rifas.show', {id: rifa.id, bilhete_id: bilhete.id})
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