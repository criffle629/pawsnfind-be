const db = require('../../data/dbConfig.js')
module.exports = {
   getById,
   getByUserId,
   getUsersByShelterId,
    getByRoleId,
    getByShelterRoleId,
    addShelterUsers,
    deleteShelterUsers,
 }

 function getByUserId(id) {
    return db('shelter_users')
    .where('user_id', id)
    .first()
 }

 function getById(id) {
    return db('shelter_users')
    .where( { id })
    .first()
 }
 
 function getUsersByShelterId(id) {
    return db
    .select('shelter_users.id','shelter_users.shelter_id','shelter_users.username','shelter_users.user_id')
    .from('shelter_users')
    .where({
       'shelter_id':id
      })
 }
 

 
 function getByRoleId(id) {
    return db('shelter_users')
    .where('role_id',id)
 }
 
 function getByShelterRoleId(shelterId,roleId) {
    return db('shelter_users')
    .where({
        'shelter_id':shelterId,
        'role_id':roleId
    })
   
 }
 
 
 function addShelterUsers(user) {
    return db('shelter_users')
    .insert(user, 'id')
    .then( ([id]) => getById(id))
 }
 

 function deleteShelterUsers(id) {
    return db('shelter_users')
    .where({ id })
    .del()
 }
