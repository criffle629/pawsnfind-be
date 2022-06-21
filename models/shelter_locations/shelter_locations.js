const db = require('../../data/dbConfig.js')
module.exports = {
    getAllShelterLocations,
    searchShelterLocations,
    getByShelterLocationId,
    getLocationByShelterId,
    addShelterLocations,
    updateShelterLocations,
    deleteShelterLocations,
 }
 
 function getAllShelterLocations() {
    return db('shelter_locations')
 }
 

 
 function searchShelterLocations(filter) {
    return db('shelter_locations')
    .where(filter)
 }

 function getByShelterLocationId(id) {
   return db('shelter_locations')
   .where({ id })
   .first()
}
 
 function getLocationByShelterId(id) {
   return db
   .select('shelter_locations.shelter_id','shelter_locations.nickname','shelter_locations.street_address','shelter_locations.city',
   'states.state','shelter_locations.zipcode','shelter_locations.phone_number')   
   .from('shelter_locations')
   .innerJoin('states','shelter_locations.state_id','states.id')
   .where({ 
      'shelter_id':id
    })
   
 }
 
 
 function addShelterLocations(shelter) {
    return db('shelter_locations')
    .insert(shelter, 'id')
    .then( ([id]) => getByShelterLocationId(id))
 }
 
 function updateShelterLocations(id, change) {
    return db('shelter_locations')
    .where({ id })
    .update(change)
    .then(updatedShelter => updatedShelter ? getByShelterLocationId(id) : null )
 }
 
 function deleteShelterLocations(id) {
    return db('shelter_locations')
    .where({ id })
    .del();
 }