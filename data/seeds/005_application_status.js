
exports.seed = async function(knex, Promise) {
  await knex('application_status').del()
  await knex.raw('ALTER SEQUENCE application_status_id_seq RESTART WITH 1')  
    .then(function () {
      // Inserts seed entries
      return knex('application_status').insert([
        {application_status: 'Awaiting Review'},
        {application_status: 'Under Review'},
        {application_status: 'Approved'},
        {application_status: 'Rejected'}
      ]);
    });
};
