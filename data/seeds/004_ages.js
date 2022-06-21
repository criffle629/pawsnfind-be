
exports.seed = async function(knex, Promise) {
  await knex('ages').del()
  await knex.raw('ALTER SEQUENCE ages_id_seq RESTART WITH 1')  
    .then(function () {
      // Inserts seed entries
      return knex('ages').insert([
        {age: 'Baby'},
        {age: 'Young'},
        {age: 'Adult'},
        {age: 'Senior'}
      ]);
    });
};