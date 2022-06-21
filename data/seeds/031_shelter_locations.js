
exports.seed = async function(knex, Promise) {
  await knex('shelter_locations').del()
  await knex.raw('ALTER SEQUENCE shelter_locations_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('shelter_locations').insert([
        {shelter_id: 1, nickname: 'Main Location', street_address: '123 Main Street', city: 'Ithaca', state_id: '32', zipcode: '14850', shelter_contact_id: 1},
        {shelter_id: 2, nickname: 'Main Location', street_address: '123 Main Street', city: 'Los Angeles', state_id: '5', zipcode: '90005', shelter_contact_id: 2},
        {shelter_id: 3, nickname: 'Main Location', street_address: '123 Main Street', city: 'Raleigh', state_id: '33', zipcode: '27513',  shelter_contact_id: 3},
        {shelter_id: 4, nickname: 'Main Location', street_address: '123 Main Street', city: 'Boise', state_id: '12', zipcode: '83704',  shelter_contact_id: 4},
        {shelter_id: 5, nickname: 'Main Location', street_address: '123 Main Street', city: 'Orlando', state_id: '9', zipcode: '32789',  shelter_contact_id: 5},
        {shelter_id: 6, nickname: 'Main Location', street_address: '123 Main Street', city: 'Seattle', state_id: '47', zipcode: '98101',  shelter_contact_id: 6},
        {shelter_id: 7, nickname: 'Main Location', street_address: '123 Main Street', city: 'Austin', state_id: '43', zipcode: '73301',  shelter_contact_id: 7},
        {shelter_id: 8, nickname: 'Main Location', street_address: '123 Main Street', city: 'phenix', state_id: '3', zipcode: '85001',  shelter_contact_id: 8},
        {shelter_id: 9, nickname: 'Main Location', street_address: '123 Main Street', city: 'Port Jefferson', state_id: '32', zipcode: '11777',  shelter_contact_id: 9},
        {shelter_id: 10, nickname: 'Main Location', street_address: '123 Main Street', city: 'Cleveland', state_id: '35', zipcode: '44101',  shelter_contact_id: 10},
        {shelter_id: 3, nickname: 'North East', street_address: '123 Main Street', city: 'Raleigh', state_id: '33', zipcode: '27626',  shelter_contact_id: 3},
        {shelter_id: 8, nickname: 'Anthem', street_address: '123 Main Street', city: 'Anthem', state_id: '3', zipcode: '85086',  shelter_contact_id: 8},
      ]);
    });
};
