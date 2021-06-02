import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Bilhete from './Bilhete'
import Tipo from './Tipo'
export default class Rifa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public tipoId: number

  @column()
  public titulo: string

  @column()
  public descricao: string

  @column.dateTime()
  public dataProvavelSorteio: DateTime
  
  @column.dateTime()
  public dataInicioVenda: DateTime

  @column.dateTime()
  public dataFimVenda: DateTime

  @column.dateTime()
  public dataSorteio: DateTime

  @column()
  public valorBilhete: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Bilhete)
  public bilhetes: HasMany<typeof Bilhete>

  @hasMany(() => Tipo)
  public tipos: HasMany<typeof Tipo>
}
