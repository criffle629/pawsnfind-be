const db = require('../../data/dbConfig')


module.exports = {
    getById,
    getBy, //filter
    add,
    remove,
    update
}

function getById(id) {
    return db('application_meta')
    .where({ id })
    .first()
}

function getBy(filter) {
    return db('application_meta')
    .where(filter)
}

//add(meta) runs after add(application was successfully ran)
function add(meta) {
    return db('application_meta')
    .insert(meta, 'id')
    //.then( ([id]) => getById(id))
}

function remove(id) {
    return db('application_meta')
    .where({ id })
    .del();
}

function update(id, change) {
    return db('application_meta')
    .where({ id })
    .update(change)
    //.then(updatedMeta => updatedMeta ? getById(id) : null)
}