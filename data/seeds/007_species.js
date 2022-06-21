
exports.seed = async function(knex, Promise) {
  await knex('species').del()
  await knex.raw('ALTER SEQUENCE species_id_seq RESTART WITH 1')  
  
    .then(function () {
      // Inserts seed entries
      return knex('species').insert([
        {species: 'Dog'},
        {species: 'Cat'}
      ]);
    });
};
