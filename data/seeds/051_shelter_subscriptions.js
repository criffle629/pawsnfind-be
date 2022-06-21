
exports.seed = async function(knex, Promise) {
  await knex('shelter_subscriptions').del()
  await knex.raw('ALTER SEQUENCE shelter_subscriptions_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('shelter_subscriptions').insert([
        {shelter_id: 1, subscription_id: 1, expiration_date: '8/10/2019', is_active: true},
        {shelter_id: 2, subscription_id: 2, expiration_date: '8/10/2020', is_active: true},
        {shelter_id: 3, subscription_id: 3, expiration_date: '8/10/2019', is_active: true},
        {shelter_id: 4, subscription_id: 4, expiration_date: '8/10/2020', is_active: true},
        {shelter_id: 5, subscription_id: 1, expiration_date: '8/10/2019', is_active: true},
        {shelter_id: 6, subscription_id: 2, expiration_date: '8/10/2020', is_active: true},
        {shelter_id: 7, subscription_id: 3, expiration_date: '8/10/2019', is_active: true},
        {shelter_id: 8, subscription_id: 4, expiration_date: '8/10/2020', is_active: true},
        {shelter_id: 9, subscription_id: 1, expiration_date: '8/10/2019', is_active: true},
        {shelter_id: 10, subscription_id: 2, expiration_date: '8/10/2020', is_active: true}
      ]);
    });
};
