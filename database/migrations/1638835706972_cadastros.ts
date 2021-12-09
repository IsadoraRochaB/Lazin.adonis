import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cadastros extends BaseSchema {
  protected tableName = 'cadastros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      table.string('nome')
      table.string('sobrenome')
      table.string('endereco')
      table.string('telefone')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
