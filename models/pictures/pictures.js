const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    getById,
    getByImgId,
    getByAnimalId,
    remove,
    update,
    add
}

function getAll() {
    return db('pictures')
    .select('img_url', 'animal_id', 'img_id')
}

function getById(id) {
    return db('pictures')
    .select('img_url', 'animal_id', 'img_id')
    .where( { id })
    .first()
}

function getByImgId(id) {
    return db('pictures')
    .select('img_url', 'animal_id', 'img_id')
    .where('img_id', id)
    .first()
}

function getByAnimalId(id) {
    return db('pictures')
    .select('img_url', 'animal_id', 'img_id')
    .where('animal_id', id)
}

function remove(id) {
    return db('pictures')
    .where('img_id', id)
    .del()
}

function update(id, change) {
    return db('pictures')
    .select('img_url', 'animal_id', 'img_id')
    .where({ id })
    .update(change)
    .then( update => update? getById(id) : null)
}

function add(picture) {
    return db('pictures')
    .select('img_url', 'animal_id', 'img_id')
    .insert(picture, 'id')
    .then(([id]) => getById(id))
}
 