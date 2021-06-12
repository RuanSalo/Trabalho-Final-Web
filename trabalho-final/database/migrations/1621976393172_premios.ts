import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Premios extends BaseSchema {
  protected tableName = 'premios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rifa_id').unsigned().notNullable().references('id').inTable('rifas')
      table.integer('bilhete_sorteado_id').unsigned().references('id').inTable('rifas')
      table.string('descricao').notNullable()
      table.integer('colocacao').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
