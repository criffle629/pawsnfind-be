const db = require('../../data/dbConfig')

module.exports = {
    getById,
    getBy, // filter
    getByApplicationId,
    add,
    remove,
    update,
    findMatch
}

function getById(id) {
    return db('application_admin')
    .where({ id })
    .first()
}

function getByApplicationId(id) {
    return db('application_admin')
    .where('application_id', id)
}

function getBy(filter) {
    return db('application_admin')
    .where(filter)
}

function add(note) {
    return db('application_admin')
    .insert(note, 'id')
    .then( ([id]) => getById(id))
}

function remove(id) {
    return db('application_admin')
    .where({ id })
    .del()
}

function update(id, change) {
    return db('application_admin')
    .where({ id })
    .update(change)
    .then(updatedNote => updatedNote ? getById(id) : null)
}

function findMatch(applicationId,shelterUserId){
    return db('application_admin')
    .where({
        application_id:applicationId,
        shelter_user_id:shelterUserId
    })
    
}