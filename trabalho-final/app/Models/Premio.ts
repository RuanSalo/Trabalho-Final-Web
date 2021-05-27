import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Premio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rifaId: number

  @column()
  public bilheteSorteadoId: number

  @column()
  public descricao: string

  @column()
  public colocacao: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
