
exports.seed = async function(knex, Promise) {
  await knex('shelters').del()
  await knex.raw('ALTER SEQUENCE shelters_id_seq RESTART WITH 1')  
    .then(function () {
      // Inserts seed entries
      return knex('shelters').insert([
        {shelter: 'Little Shelter', is_upgraded: true, EIN: '68-02403413', shelter_location_id: 1, shelter_contact_id: 1},
        {shelter: 'Big Dog Rescue', is_upgraded: true, EIN: '68-02433412', shelter_location_id: 2, shelter_contact_id: 2},
        {shelter: 'We Heart Little Ones Rescue', is_upgraded: true, EIN: '68-02423413', shelter_location_id: 3, shelter_contact_id: 3},
        {shelter: 'Best Friends Rescue', is_upgraded: true, EIN: '68-014034149', shelter_location_id: 4, shelter_contact_id: 4},
        {shelter: 'Second Chance Rescue', is_upgraded: true, EIN: '68-02407371', shelter_location_id: 5, shelter_contact_id: 5},
        {shelter: 'Pooch & Meow Rescue', is_upgraded: true, EIN: '68-0240241', shelter_location_id: 6, shelter_contact_id: 6},
        {shelter: 'Pawsitively Purrfect Rescue', is_upgraded: true, EIN: '68-02429341', shelter_location_id: 7, shelter_contact_id: 7},
        {shelter: 'North Shore Animal Shelter', is_upgraded: true, EIN: '68-02550341', shelter_location_id: 8, shelter_contact_id: 8},
        {shelter: 'Pit Stop Bully Rescue', is_upgraded: true, EIN: '68-02908341', shelter_location_id: 9, shelter_contact_id: 9},
        {shelter: 'Purrington Rescue', is_upgraded: true, EIN: '68-02403381', shelter_location_id: 10, shelter_contact_id: 10},
      ]);
    });
};
