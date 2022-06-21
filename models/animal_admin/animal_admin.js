const db = require('../../data/dbConfig')

module.exports = {
    getById,
    getBy,
    getNotesByAnimalId,
    add,
    remove,
    update, 
    getByIds
}

function getNotesByAnimalId(id) {
    return db('animal_admin')
    .where('animal_id', id)
}

function getById(id) {
    return db('animal_admin')
    .where ({ id })
    .first()
}

function getBy(filter) {
    return db('animal_admin')
    .where(filter)
}

function add(note) {
    return db('animal_admin')
    .insert(note, 'id')
    .then( ([ id ]) => getById(id))
}

function remove(id) {
    return db('animal_admin')
    .where({ id })
    .del()
}

function update(id, change) {
    return db('animal_admin')
    .where({ id })
    .update(change)
    .then( update => update? getById(id) : null)
}


function getByIds(animalId, adminId) {
    return db('animal_admin')
    .where({
        animal_id : animalId,
        id : adminId
    })
    .first()
}

