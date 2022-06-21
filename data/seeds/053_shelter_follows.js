
exports.seed = function(knex, Promise) {
  
  // Deletes ALL existing entries
  return knex('shelter_follows').del()
    .then(function () {
      // Inserts seed entries
      return knex('shelter_follows').insert([
        {shelter_id:1, user_id:1},
        {shelter_id:2, user_id:2},
        {shelter_id:3, user_id:3},
        {shelter_id:4, user_id:4},
        {shelter_id:5, user_id:5},
        {shelter_id:6, user_id:6},
        {shelter_id:7, user_id:7},
        {shelter_id:8, user_id:8},
        {shelter_id:9, user_id:9},
        {shelter_id:10, user_id:10},
        {shelter_id:1, user_id:2},
        {shelter_id:2, user_id:3},
        {shelter_id:3, user_id:4},
        {shelter_id:4, user_id:5},
        {shelter_id:5, user_id:6},
        {shelter_id:6, user_id:7},
        {shelter_id:7, user_id:8},
        {shelter_id:8, user_id:9},
        {shelter_id:9, user_id:10},
        {shelter_id:10, user_id:1},
      ]);
    });
};
