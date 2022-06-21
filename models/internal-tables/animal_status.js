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
    return db('animal_status')
}

function getById(id) {
    return db('animal_status')
    .where ({ id })
    .first()
}

function getBy(filter) {
    return db('animal_status')
    .where(filter)
}

function add(status) {
    return db('animal_status')
    .insert(status, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('animal_status')
    .where({ id })
    .del() 
}

function update(id, change) {
    return db('animal_status')
    .where({id})
    .update(change)
    .then(updatedStatus => updatedStatus ? updatedStatus : null)
}