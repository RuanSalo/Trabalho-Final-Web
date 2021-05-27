import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany 
} from '@ioc:Adonis/Lucid/Orm'
import Rifa from './Rifa'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public admin : boolean

  @column()
  public nome : string

  @column()
  public email: string

  @column({ serializeAs: null })
  public senha: string

  @column()
  public foto: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.senha) {
      user.senha = await Hash.make(user.senha)
    }
  }

  @hasMany(() => Rifa)
  public rifas: HasMany<typeof Rifa>
}
