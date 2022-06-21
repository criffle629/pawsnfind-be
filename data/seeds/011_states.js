
exports.seed = async function(knex, Promise) {
  await knex('states').del()
  await knex.raw('ALTER SEQUENCE states_id_seq RESTART WITH 1')  
  // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex('states').insert([
        {state:'AL'}, 
        {state:'AK'}, 
        {state:'AZ'}, 
        {state:'AR'},
        {state:'CA'}, 
        {state:'CO'}, 
        {state:'CT'},
        {state:'DE'}, 
        {state:'FL'}, 
        {state:'GA'},
        {state:'HI'}, 
        {state:'ID'}, 
        {state:'IL'},
        {state:'IN'}, 
        {state:'IA'}, 
        {state:'KS'}, 
        {state:'KY'}, 
        {state:'LA'},
        {state:'ME'}, 
        {state:'MD'}, 
        {state:'MA'},
        {state:'MI'}, 
        {state:'MN'}, 
        {state:'MS'},
        {state:'MO'}, 
        {state:'MT'}, 
        {state:'NE'},
        {state:'NV'}, 
        {state:'NH'}, 
        {state:'NJ'}, 
        {state:'NM'}, 
        {state:'NY'},
        {state:'NC'}, 
        {state:'ND'}, 
        {state:'OH'},
        {state:'OK'}, 
        {state:'OR'}, 
        {state:'PA'},
        {state:'RI'}, 
        {state:'SC'}, 
        {state:'SD'},
        {state:'TN'}, 
        {state:'TX'}, 
        {state:'UT'}, 
        {state:'VT'}, 
        {state:'VA'},
        {state:'WA'}, 
        {state:'WV'}, 
        {state:'WI'},
        {state:'WY'}

      ]);
    });
};