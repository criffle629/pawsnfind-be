
exports.seed = async function(knex, Promise) {
  await knex('donations').del()
  await knex.raw('ALTER SEQUENCE donations_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('donations').insert([
        {user_id: 1, shelter_id: 10, amount: 30.00},
        {user_id: 2, shelter_id: 9, amount: 20.00},
        {user_id: 3, shelter_id: 8, amount: 50.00},
        {user_id: 4, shelter_id: 7, amount: 5.00},
        {user_id: 5, shelter_id: 6, amount: 70.00},
        {user_id: 6, shelter_id: 5, amount: 100.00},
        {user_id: 7, shelter_id: 4, amount: 10.00},
        {user_id: 8, shelter_id: 3, amount: 15.00},
        {user_id: 9, shelter_id: 2, amount: 10.00},
        {user_id: 10, shelter_id: 1, amount: 25.00},
        {user_id: 2, shelter_id: 5, amount: 50.00},
        {user_id: 7, shelter_id: 7, amount: 5.00},
        {user_id: 5, shelter_id: 2, amount: 10.00},
        {user_id: 3, shelter_id: 3, amount: 15.00},
        {user_id: 9, shelter_id: 9, amount: 150.00}
      ]);
    });
};
