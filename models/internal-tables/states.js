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
    return db('states')
}

function getById(id) {
    return db('states')
    .where({ id })
    .first()
}

function getBy(filter) {
    return db('states')
    .where(filter)
}

function add(state) {
    return db('states')
    .insert(state, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('states')
    .where({ id })
    .del()
} 

function update(id, change) {
    return db('states')
    .where({id})
    .update(change)
    .then(updatedState => updatedState ? updatedState : null)
}