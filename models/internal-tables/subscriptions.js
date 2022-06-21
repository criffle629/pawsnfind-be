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
    return db('subscriptions')
}

function getBy(filter) {
    return db('subscriptions')
    .where(filter)
}

function getById(id) {
    return db('subscriptions')
    .where({ id })
    .first()
}

function add(subscription) {
    return db('subscriptions')
    .insert(subscription, 'id')
    .then(([id]) => getById(id))
}

function remove(id) {
    return db('subscriptions')
    .where({ id })
    .del()
}

function update(id, change) {
    return db('subscriptions')
    .where({id})
    .update(change)
    .then(updatedSub => updatedSub ? updatedSub : null )
}