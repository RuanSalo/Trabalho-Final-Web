import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasManyThrough,
  HasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import Rifa from './Rifa'
import Bilhete from './Bilhete'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public admin: boolean

  @column()
  public nome: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public foto: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Rifa)
  public rifas: HasMany<typeof Rifa>

  @hasManyThrough([() => Bilhete, () => Rifa])
  public bilhetes: HasManyThrough<typeof Bilhete>
}
