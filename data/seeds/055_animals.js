
exports.seed = async function(knex, Promise) {
  await knex('animals').del()
  await knex.raw('ALTER SEQUENCE animals_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {name: 'Sweetie Pie', species_id: 2, shelter_id: 1, animal_status_id: 1, shelter_location_id: 1, profile_img_id: 1},
        {name: 'Cutie Pie', species_id: 1, shelter_id: 2, animal_status_id: 1, shelter_location_id: 2, profile_img_id: 2},
        {name: 'Bully Pete', species_id: 1, shelter_id: 3, animal_status_id: 1, shelter_location_id: 3, profile_img_id: 3},
        {name: 'Tina', species_id: 1, shelter_id: 4, animal_status_id: 1, shelter_location_id: 4, profile_img_id: 4},
        {name: 'Nathan', species_id: 2, shelter_id: 5, animal_status_id: 1, shelter_location_id: 5, profile_img_id: 5},
        {name: 'Snow Ball', species_id: 2, shelter_id: 6, animal_status_id: 1, shelter_location_id: 6, profile_img_id: 6},
        {name: 'Jingle Bell', species_id: 2, shelter_id: 7, animal_status_id: 1, shelter_location_id: 7, profile_img_id: 7},
        {name: 'Mickey', species_id: 1, shelter_id: 8, animal_status_id: 1, shelter_location_id: 8, profile_img_id: 8},
        {name: 'Garfield', species_id: 2, shelter_id: 9, animal_status_id: 1, shelter_location_id: 9, profile_img_id: 9},
        {name: 'Coco', species_id: 1, shelter_id: 10, animal_status_id: 1, shelter_location_id: 10, profile_img_id: 10},
        {name: 'Max', species_id: 1, shelter_id: 3, animal_status_id: 1, shelter_location_id: 11, profile_img_id: 11},
        {name: 'Harper', species_id: 2, shelter_id: 8, animal_status_id: 1, shelter_location_id: 12, profile_img_id: 12},
        {name: 'Casey', species_id: 1, shelter_id: 1, animal_status_id: 1, shelter_location_id: 1, profile_img_id: 13},
        {name: 'Lucky', species_id: 1, shelter_id: 2, animal_status_id: 1, shelter_location_id: 2, profile_img_id: 14},
        {name: 'Chelsea', species_id: 2, shelter_id: 3, animal_status_id: 1, shelter_location_id: 3, profile_img_id: 15},
        {name: 'Mr. EatALot', species_id: 1, shelter_id: 4, animal_status_id: 1, shelter_location_id: 4, profile_img_id: 16},
        {name: 'Ting Ting', species_id: 2, shelter_id: 5, animal_status_id: 1, shelter_location_id: 5, profile_img_id: 17},
        {name: 'Cody', species_id: 1, shelter_id: 6, animal_status_id: 1, shelter_location_id: 6, profile_img_id: 18},
        {name: 'Tiger', species_id: 2, shelter_id: 7, animal_status_id: 1, shelter_location_id: 7, profile_img_id: 19},
        {name: 'Rocky', species_id: 1, shelter_id: 8, animal_status_id: 1, shelter_location_id: 8, profile_img_id: 20},
        {name: 'Sophie', species_id: 1, shelter_id: 9, animal_status_id: 1, shelter_location_id: 9, profile_img_id: 21},
        {name: 'Mr. Socks', species_id: 2, shelter_id: 10, animal_status_id: 1, shelter_location_id: 10, profile_img_id: 22},
        {name: 'Lucy', species_id: 1, shelter_id: 3, animal_status_id: 1, shelter_location_id: 11, profile_img_id: 23},
        {name: 'Mr. Evil', species_id: 2, shelter_id: 8, animal_status_id: 1, shelter_location_id: 12, profile_img_id: 24},
        {name: 'Chance', species_id: 1, shelter_id: 1, animal_status_id: 1, shelter_location_id: 1, profile_img_id: 25}
      ]);
    });
};
