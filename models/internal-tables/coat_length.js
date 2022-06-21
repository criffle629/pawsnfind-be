const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    getById,
    getBy,
    add,
    remove, 
    update
}

function getAll() {
    return db('coat_length')
}

function getById(id) {
    return db('coat_length')
    .where({ id })
    .first()
}

function getBy(filter){
    return db('coat_length')
    .where(filter)
} 

function add(length) {
    return db('coat_length')
    .insert(length, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('coat_length')
    .where({ id })
    .del()
}

function update(id, change) {
    return db('coat_length')
    .where({ id })
    .update(change)
    .then(updatedLength => updatedLength ? updatedLength : null)
}