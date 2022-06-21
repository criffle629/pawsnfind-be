exports.seed = async function(knex, Promise) {
	await knex('shelter_contacts').del()
  await knex.raw('ALTER SEQUENCE shelter_contacts_id_seq RESTART WITH 1')  
  .then(function () {
      // Inserts seed entries
      return knex('shelter_contacts').insert([
        {shelter_id: 1 , name: "Juby", email: "Juby@email.com", phone:"212-512-2525"},
        {shelter_id: 2 , name: "Ming", email: "mingliu@email.com", phone:"703-512-2525"},
        {shelter_id: 3 , name: "Chris", email: "chris@email.com", phone:"501-512-2525"},
        {shelter_id: 4 , name: "Lily", email: "Lily@email.com", phone:"225-512-2525"},
        {shelter_id: 5 , name: "Lenna", email: "lenna@email.com", phone: "119-512-2525"},
        {shelter_id: 6 , name: "Aruna", email: "aruna@email.com", phone:"445-512-2525"},
        {shelter_id: 7 , name: "Sarah", email: "sarah@email.com", phone:"234-512-2525"},
        {shelter_id: 8 , name: "Hung", email: "hung@email.com", phone:"233-512-2525"},
        {shelter_id: 9 , name: "John", email: "John@email.com", phone:"642-512-2525"},
        {shelter_id: 10 , name: "James", email: "james@email.com", phone:"853-512-2525"},
      ]);
    });
}

