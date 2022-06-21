
exports.seed = async function(knex, Promise) {
  await knex('coat_length').del()
  await knex.raw('ALTER SEQUENCE coat_length_id_seq RESTART WITH 1')  
    .then(function () {
      // Inserts seed entries
      return knex('coat_length').insert([
        {coat_length: 'Short'},
        {coat_length: 'Medium'},
        {coat_length: 'Long'}
      ]);
    });
};
