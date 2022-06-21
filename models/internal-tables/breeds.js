const db = require('../../data/dbConfig')


module.exports = {
    getAll,
    getBy,
    getById,
    getBySpeciesId,
    add,
    remove,
    update
}

function getAll() {
    return db('breeds')
} 

function getById(id) {
    return db('breeds')
    .where({id})
    .first()
}

function getBySpeciesId(species_id) {
    return db('breeds')
    .where({species_id})
}

/*
function getById(id) {
    return db('breeds)
    .where('species_id', id)
}
*/
function getBy(filter) {
    return db('breeds')
    .where(filter)
}

function add(breed){
    return db('breeds')
    .insert(breed, 'id')
    .then(([id]) => getById(id))
}

function remove(id){
    return db('breeds')
    .where({id})
    .del()
}

function update(id, change){
    return db('breeds')
    .where({id})
    .update(change)
    .then(updatedBreed => updatedBreed ? updatedBreed : null)
}