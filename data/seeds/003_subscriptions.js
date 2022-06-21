
exports.seed = async function(knex, Promise) {
  await knex('subscriptions').del()
  await knex.raw('ALTER SEQUENCE subscriptions_id_seq RESTART WITH 1')  
    .then(function () {
      // Inserts seed entries
      return knex('subscriptions').insert([
        {subscription: 'All American One Month', subscription_duration_mo: '1', price: 59.95},
        {subscription: 'All American One Year', subscription_duration_mo: '12', price: 599.95},
        {subscription: 'Great Dane One Month', subscription_duration_mo: '1', price: 79.95},
        {subscription: 'Great Dane One Year', subscription_duration_mo: '12', price: 799.95}
      ]);
    });
};
