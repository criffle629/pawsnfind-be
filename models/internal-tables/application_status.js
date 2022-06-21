const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    getBy,
    getById,
    add,
    remove, 
    update
}

function getAll() {
    return db('application_status')
}

function getById(id) {
    return db('application_status')
    .where ({ id })
    .first()
}

function getBy(filter) {
    return db('application_status')
    .where(filter)
}

function add(status) {
    return db('application_status')
    .insert(status, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('application_status')
    .where({ id })
    .del() 
}

function update(id, change) {
    return db('application_status')
    .where({id})
    .update(change)
    .then(updatedStatus => updatedStatus ? updatedStatus : null)
}