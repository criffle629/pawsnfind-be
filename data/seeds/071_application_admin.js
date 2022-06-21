
exports.seed = async function(knex, Promise) {
  await knex('application_admin').del()
  await knex.raw('ALTER SEQUENCE application_admin_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('application_admin').insert([
        {application_id: 1, shelter_user_id: 1, notes: "awaiting additional documents"},
        {application_id: 2, shelter_user_id: 2, notes: "awaiting additional documents"},
        {application_id: 3, shelter_user_id: 3, notes: "awaiting additional documents"},
        {application_id: 4, shelter_user_id: 4, notes: "awaiting additional documents"},
        {application_id: 5, shelter_user_id: 5, notes: "awaiting additional documents"},
        {application_id: 6, shelter_user_id: 6, notes: "awaiting additional documents"},
        {application_id: 7, shelter_user_id: 7, notes: "awaiting additional documents"},
        {application_id: 8, shelter_user_id: 8, notes: "awaiting additional documents"},
        {application_id: 9, shelter_user_id: 9, notes: "awaiting additional documents"},
        {application_id: 10, shelter_user_id: 10, notes: "awaiting additional documents"}
      ]);
    });
};
