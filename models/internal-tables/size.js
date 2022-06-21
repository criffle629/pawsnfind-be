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
    return db('size')
}

function getById(id) {
    return db('size')
    .where({ id })
    .first()
}

function getBy(filter) {
    return db('size')
    .where(filter)
}

function add(size) {
    return db('size')
    .insert(size, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('size')
    .where({ id })
    .del()
} 

function update(id, change) {
    return db('size')
    .where({id})
    .update(change)
    .then(updatedSize => updatedSize ? updatedSize : null)
}