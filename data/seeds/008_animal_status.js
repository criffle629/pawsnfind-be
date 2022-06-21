exports.seed = async function(knex, Promise) {
	await knex('animal_status').del()
  await knex.raw('ALTER SEQUENCE animal_status_id_seq RESTART WITH 1')  
  .then(function () {
      // Inserts seed entries
      return knex('animal_status').insert([
        {animal_status: 'Available for Adoption'},
        {animal_status: 'Available for Foster'},
        {animal_status: 'Available for Adoption & Foster'},
        {animal_status: 'Adopted'},
        {animal_status: 'Adoption Pending'},
        {animal_status: 'Inactive'}
      ]);
    });
}

