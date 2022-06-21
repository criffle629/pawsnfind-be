
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('shelters', tbl => {
    tbl.increments();
    tbl.string('shelter', 512)
        .notNullable();
    tbl.boolean('is_upgraded')
        .defaultTo(false);
    tbl.string('EIN', 128)
        .unique()
        .notNullable();
    tbl.timestamp('created_at', { precision: 6 })
        .defaultTo(knex.fn.now(6));
    tbl.integer('shelter_location_id')
        .unsigned()
        .references('id')
        .inTable('shelter_locations')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    tbl.integer('shelter_contact_id')
        .unsigned()
        .references('id')
        .inTable('shelter_contacts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shelters')
};
