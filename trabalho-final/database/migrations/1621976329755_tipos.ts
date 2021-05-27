import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tipos extends BaseSchema {
  protected tableName = 'tipos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('descricao').notNullable()
      table.integer('numero_inicial').notNullable()
      table.integer('passo').notNullable()
      table.integer('quantidade_bilhetes').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
