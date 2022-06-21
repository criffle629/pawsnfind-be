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
    return db('species')
}

function getById(id) {
    return db('species')
    .where({ id })
    .first()
}

function getBy(filter) {
    return db('species')
    .where(filter)
}

function add(species) {
    return db('species')
    .insert(species, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('species')
    .where({ id })
    .del()
} 

function update(id, change) {
    return db('species')
    .where({id})
    .update(change)
    .then(updatedSpecies => updatedSpecies ? updatedSpecies : null)
}