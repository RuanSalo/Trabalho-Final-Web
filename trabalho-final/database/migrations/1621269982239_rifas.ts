import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rifas extends BaseSchema {
  protected tableName = 'rifas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable
      table.integer('value').notNullable
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
