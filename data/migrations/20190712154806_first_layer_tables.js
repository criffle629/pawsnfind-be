
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('size', tbl => {
        tbl.increments()
        tbl.string('size', 256)
            .notNullable()
            .unique();
        })
    .createTable('coat_length', tbl => {
        tbl.increments()
        tbl.string('coat_length', 256)
            .notNullable()
            .unique();
        })
    .createTable('subscriptions', tbl => {
        tbl.increments();
        tbl.string('subscription', 256)
            .notNullable()
            .unique();
        tbl.integer('subscription_duration_mo')
            .notNullable();
        tbl.decimal('price')
            .notNullable();
        })
    .createTable('ages', tbl => {
        tbl.increments();
        tbl.string('age', 256)
            .notNullable()
            .unique();
        })
    .createTable('application_status', tbl => {
            tbl.increments();
            tbl.string('application_status', 256)
                .notNullable()
                .unique();
        })
    .createTable('users', tbl => {
            tbl.increments();
            tbl.string('email', 256)
                .notNullable()
            tbl.string('sub_id', 256)
                .notNullable()
                .unique()
            tbl.string('username', 256)
                .notNullable()
            tbl.timestamp('created_at', { precision: 6 })
                .defaultTo(knex.fn.now(6));
        })
    .createTable('species', tbl => {
            tbl.increments();
            tbl.string('species', 256)
                .notNullable()
                .unique();
        })
    .createTable('animal_status', tbl => {
            tbl.increments();
            tbl.string('animal_status', 256)
                .notNullable()
                .unique();
        })
    .createTable('shelter_contacts', tbl => {
            tbl.increments()
            tbl.integer('shelter_id')
            tbl.string('name', 256)
                .notNullable();
            tbl.string('email', 512)
                .notNullable();
            tbl.string('phone', 256)
                .notNullable();
        })
    .createTable('roles', tbl => {
            tbl.increments();
            tbl.string('role', 256)
                .notNullable()
                .unique();
        })
    .createTable('states', tbl => {
            tbl.increments();
            tbl.string('state', 128)
                .notNullable()
                .unique();
        })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('size')
    .dropTableIfExists('coat_length')
    .dropTableIfExists('subscriptions')
    .dropTableIfExists('ages')
    .dropTableIfExists('application_status')
    .dropTableIfExists('users')
    .dropTableIfExists('species')
    .dropTableIfExists('shelter_status')
    .dropTableIfExists('shelter_contacts')
    .dropTableIfExists('roles')
    .dropTableIfExists('states')

};
