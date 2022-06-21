
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('breeds', tbl => {
    tbl.increments();
    tbl.integer('species_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('species')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    tbl.string('breed',512)
      .notNullable()
      .unique()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('breeds')

};
