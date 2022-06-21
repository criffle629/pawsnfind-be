const db = require ('../../data/dbConfig')

module.exports = {
    getById,
    getBy,
    getByAnimalId, //already have this in animals route
    remove,
    update,
    add, 
    removeByAnimalId,
    getByIds

}

//get by animal id
function getByAnimalId(animal_id) {
    return db
    .select('animal_meta.id', 'animal_meta.animal_id', 'breeds.breed', 'animal_meta.is_mixed', 'ages.age','size.size', 'animal_meta.health', 'animal_meta.color', 'coat_length.coat_length', 'animal_meta.is_male as sex', 'animal_meta.is_house_trained', 'animal_meta.is_neutered_spayed', 'animal_meta.is_good_with_kids', 'animal_meta.is_good_with_dogs', 'animal_meta.is_good_with_cats', 'animal_meta.is_vaccinated', 'animal_meta.description')
    .from('animal_meta')
    .innerJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .innerJoin('ages', 'animal_meta.age_id', 'ages.id')
    .innerJoin('size', 'animal_meta.size_id', 'size.id')
    .innerJoin('coat_length', 'animal_meta.coat_length_id', 'coat_length.id')
    .where('animal_meta.animal_id', animal_id)
    .first()
}

function getBy(filter) {
    return db('animal_meta')
    .where(filter)
}

//get by animal meta id
function getById(id) {
    return db
    .select('animal_meta.id', 'animal_meta.animal_id', 'breeds.breed', 'animal_meta.is_mixed', 'ages.age','size.size', 'animal_meta.health', 'animal_meta.color', 'coat_length.coat_length', 'animal_meta.is_male as sex', 'animal_meta.is_house_trained', 'animal_meta.is_neutered_spayed', 'animal_meta.is_good_with_kids', 'animal_meta.is_good_with_dogs', 'animal_meta.is_good_with_cats', 'animal_meta.is_vaccinated', 'animal_meta.description')
    .from('animal_meta')
    .innerJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .innerJoin('ages', 'animal_meta.age_id', 'ages.id')
    .innerJoin('size', 'animal_meta.size_id', 'size.id')
    .innerJoin('coat_length', 'animal_meta.coat_length_id', 'coat_length.id')
    .where('animal_meta.id', id)
    .first()
}


function remove(id) {
    return db('animal_meta')
    .where({ id })
    .del()
}

function update(id, change) {
    return db('animal_meta')
    .where({ id })
    .update(change)
    .then(updateAnimalMeta => updateAnimalMeta? getById(id) : null)
}

function add(animal_meta) {
    return db('animal_meta')
    .insert(animal_meta, 'id')
    //.then (([id]) => getById(id))
}

function removeByAnimalId(animal_id) {
    return db('animal_meta')
    .where({animal_id})
    .del()
}

function getByIds(animalId, metaId) {
    return db('animal_meta')
    .where({
        animal_id : animalId,
        id : metaId
    })
    .first()
}

