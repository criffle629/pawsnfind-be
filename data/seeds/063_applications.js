exports.seed = async function(knex, Promise) {
  await knex('applications').del()
  await knex.raw('ALTER SEQUENCE applications_id_seq RESTART WITH 1')  
    .then(function () {
      // Inserts seed entries
      return knex('applications').insert([
        {animal_id: 1, shelter_id: 1, user_id: 1, application_status_id: 1},
        {animal_id: 2, shelter_id: 2, user_id: 2, application_status_id: 1},        
        {animal_id: 3, shelter_id: 3, user_id: 3, application_status_id: 1},
        {animal_id: 4, shelter_id: 4, user_id: 4, application_status_id: 1}, 
        {animal_id: 5, shelter_id: 5, user_id: 5, application_status_id: 1},
        {animal_id: 6, shelter_id: 6, user_id: 6, application_status_id: 1},        
        {animal_id: 7, shelter_id: 7, user_id: 7, application_status_id: 1},
        {animal_id: 8, shelter_id: 8, user_id: 8, application_status_id: 1}, 
        {animal_id: 9, shelter_id: 9, user_id: 9, application_status_id: 1},
        {animal_id: 10, shelter_id: 10, user_id: 10, application_status_id: 1},
        {animal_id: 11, shelter_id: 3, user_id: 1, application_status_id: 1},
        {animal_id: 12, shelter_id: 8, user_id: 2, application_status_id: 1},        
        {animal_id: 13, shelter_id: 1, user_id: 3, application_status_id: 1},
        {animal_id: 14, shelter_id: 2, user_id: 4, application_status_id: 1}, 
        {animal_id: 15, shelter_id: 3, user_id: 5, application_status_id: 1},
        {animal_id: 16, shelter_id: 4, user_id: 6, application_status_id: 1},        
        {animal_id: 17, shelter_id: 5, user_id: 7, application_status_id: 1},
        {animal_id: 18, shelter_id: 6, user_id: 8, application_status_id: 1}, 
        {animal_id: 19, shelter_id: 7, user_id: 9, application_status_id: 1},
        {animal_id: 20, shelter_id: 8, user_id: 10, application_status_id: 1},
        {animal_id: 21, shelter_id: 9, user_id: 1, application_status_id: 1},
        {animal_id: 22, shelter_id: 10, user_id: 2, application_status_id: 1},        
        {animal_id: 23, shelter_id: 3, user_id: 3, application_status_id: 1},
        {animal_id: 24, shelter_id: 8, user_id: 4, application_status_id: 1}, 
        {animal_id: 25, shelter_id: 1, user_id: 5, application_status_id: 1},
      ]);
    });
};

