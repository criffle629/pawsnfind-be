
exports.seed = async function(knex, Promise) {
  await knex('roles').del()
  await knex.raw('ALTER SEQUENCE roles_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {role: 'admin'}, //super
        {role: 'volunteer'},  //view only
        {role: 'staff'} //can admin animals and applications
      ]);
    });
};
