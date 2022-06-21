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
    return db('ages')
}

function getById(id) {
    return db('ages')
    .where({ id })
    .first()
}

function getBy(filter) {
    return db('ages')
    .where(filter)
}

function add(age){
    return db('ages')
    .insert(age, 'id')
    .then(([id]) => getById(id))
}

function remove(id){
    return db('ages')
    .where({id})
    .del()
}

function update(id, change) {
    return db('ages')
    .where({id})
    .update(change)
    .then(updatedAge => updatedAge ? updatedAge : null)
}