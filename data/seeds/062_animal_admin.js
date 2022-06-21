
exports.seed = async function(knex, Promise) {
  await knex('animal_admin').del()
  await knex.raw('ALTER SEQUENCE animal_admin_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('animal_admin').insert([
        {shelter_user_id: 1, animal_id: 1, notes: 'Vet check on 7/3/2019, good health' },
        {shelter_user_id: 6, animal_id: 6, notes: 'New foster family will step in on 8/1/2019' },
        {shelter_user_id: 9, animal_id: 9, notes: 'Additional litter box training might be required' }
      ]);
    });
};
