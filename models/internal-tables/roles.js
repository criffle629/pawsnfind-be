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
    return db('roles')
}

function getById(id) {
    return db('roles')
    .where({ id })
    .first()
}

function getBy(filter) {
    return db('roles')
    .where(filter)
}

function add(role) {
    return db('roles')
    .insert(role, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('roles')
    .where({ id })
    .del()
} 

function update(id, change) {
    return db('roles')
    .where({id})
    .update(change)
    .then(updatedRole => updatedRole ? updatedRole : null)
}