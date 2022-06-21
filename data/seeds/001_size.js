
exports.seed = async function(knex, Promise) {
  await knex('size').del()
  await knex.raw('ALTER SEQUENCE size_id_seq RESTART WITH 1')  
    .then(function () {
      // Inserts seed entries
      return knex('size').insert([
        {size: 'Small'},
        {size: 'Medium'},
        {size: 'Large'},
        {size: 'Giant'}
      ]);
    });
};
