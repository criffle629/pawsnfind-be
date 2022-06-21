const db = require('../../data/dbConfig.js')
module.exports = {
   getUsersFollowsByShelterId,
   getFollowsByUserId,
    getFollowsByIds,
    addShelterFollows,
    deleteShelterFollows,
    getTotalFollows,
    getFollowsMatchByIds
 }
 
 function getUsersFollowsByShelterId(id) {
    return db
    .select('shelter_follows.shelter_id', 'shelter_follows.user_id', 'users.username', 'users.email', 'user_meta.zip', 'shelters.shelter')
    .from('shelter_follows')
    .leftJoin('users', 'shelter_follows.user_id', 'users.id')
    .leftJoin('user_meta','shelter_follows.user_id','user_meta.user_id')
    .leftJoin('shelters', 'shelter_follows.shelter_id', 'shelters.id')
    .where('shelter_id',id)
 }
 
 function getTotalFollows(id) {
    return db('shelter_follows')
    .where('shelter_id', id)
    .count()
 }
 
 //get a list of shelters a user is following by user id, for user dashboard shelter follow page
 function getFollowsByUserId(id) {
    const query = db
    .select('shelters.id', 'shelters.shelter', 'shelter_locations.city', 'states.state', 'shelter_locations.zipcode', 'shelter_contacts.email', 'shelter_contacts.phone')
    .from('shelter_follows')
    .leftJoin('shelters','shelter_follows.shelter_id', 'shelters.id')
    .innerJoin('shelter_locations', 'shelters.shelter_location_id', 'shelter_locations.id')
    .leftJoin('states', 'shelter_locations.state_id', 'states.id')
    .leftJoin('shelter_contacts', 'shelters.shelter_contact_id', 'shelter_contacts.id')
    .where('shelter_follows.user_id', id)

   return query

 }
 
function getFollowsByIds(shelterId,userId){
   return db
   .select('shelter_follows.shelter_id','shelter_follows.user_id','users.username')
   .from('shelter_follows')
   .innerJoin('users','shelter_follows.user_id','users.id')
   .where({
              'shelter_id':shelterId,
              'user_id':userId
          })
   .first()   
}
 
function getFollowsMatchByIds(shelterId, userId) {
   return db('shelter_follows')
   .where({
      'shelter_id' : shelterId,
      'user_id' : userId
   })
   .first()
}
 
 function addShelterFollows(follow) {
    return db('shelter_follows')
    .insert(follow, 'shelter_id')
    .then(([shelter_id]) => getTotalFollows(shelter_id))
 }

 function deleteShelterFollows(shelterId,userId) {
    return db('shelter_follows')
    .where({
        'shelter_id':shelterId,
        'user_id':userId
    })
    .del();
 }