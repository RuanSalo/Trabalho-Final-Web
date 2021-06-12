import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Rifa from './Rifa'
export default class Bilhete extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rifaId: number

  @column()
  public userId: number

  @column()
  public numero: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Rifa)
  public rifas: BelongsTo<typeof Rifa>
}
