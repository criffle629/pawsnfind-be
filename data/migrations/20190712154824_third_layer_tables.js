
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('shelter_locations', tbl => {
      tbl.increments();
      tbl.integer('shelter_id')
        .notNullable();
      tbl.string('street_address', 512)
        .notNullable();
      tbl.string('city', 256)
        .notNullable();
      tbl.string('zipcode', 128)
        .notNullable();
      tbl.integer('state_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('states')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    tbl.string('nickname', 256)
        .notNullable();
    tbl.integer('shelter_contact_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('shelter_contacts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    tbl.timestamp('created_at', { precision: 6 })
        .defaultTo(knex.fn.now(6));
     })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shelter_locations')
};
