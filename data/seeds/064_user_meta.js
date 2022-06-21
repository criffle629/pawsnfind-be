
exports.seed = async function(knex, Promise) {
  await knex('user_meta').del()
  await knex.raw('ALTER SEQUENCE user_meta_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('user_meta').insert([
        {user_id: 1, phone_number:'202-303-3940', name: 'Kerry', street_address:'111 Penn Ave', city: 'New York City', state_id: 12 , zip:'20201', shelter_user_id: 1 },
        {user_id: 2, phone_number:'202-303-3940', name: 'Lily', street_address:'111 Penn Ave', city: 'New York City', state_id: 12 , zip:'20201', shelter_user_id: 2 },
        {user_id: 3, phone_number:'202-303-3940', name: 'Jane', street_address:'111 Penn Ave', city: 'New York City', state_id: 12 , zip:'20201', shelter_user_id: 3 },
        {user_id: 4, phone_number:'202-303-3940', name: 'Jubi', street_address:'111 Penn Ave', city: 'New York City', state_id: 12 , zip:'20201', shelter_user_id: 4 },
        {user_id: 5, phone_number:'202-303-3940', name: 'Cory', street_address:'111 Penn Ave', city: 'New York City', state_id: 12 , zip:'20201', shelter_user_id: 5 },
        {user_id: 6, phone_number:'202-303-3940', name: 'Bill', street_address:'44 Libby St', city: 'DC', state_id: 15 , zip:'12939', shelter_user_id: 6 },
        {user_id: 7, phone_number:'202-303-3940', name: 'Stacy', street_address:'44 Libby St', city: 'DC', state_id: 15 , zip:'12939', shelter_user_id: 7 },
        {user_id: 8, phone_number:'202-303-3940', name: 'Carol', street_address:'44 Libby St', city: 'DC', state_id: 15 , zip:'12939', shelter_user_id: 8 },
        {user_id: 9, phone_number:'202-303-3940', name: 'Mary', street_address:'232 Meatpacking St', city: 'Seattle', state_id: 22 , zip:'34324', shelter_user_id: 9 },
        {user_id: 10, phone_number:'202-303-3940', name: 'Vinny', street_address:'44 Libby St', city: 'DC', state_id: 15 , zip:'12939', shelter_user_id: 10 },
      
      ]);
    });
};
