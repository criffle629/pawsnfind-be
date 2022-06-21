exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('stripe_accounts', tbl => {
        tbl.integer('shelter_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('shelters')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl.string('account_id')
            .notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('stripe_accounts')
};
