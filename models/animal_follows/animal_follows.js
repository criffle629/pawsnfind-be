const db = require ('../../data/dbConfig')


module.exports = {
    getByAnimalId,
    getByIds,
    getAnimalFollows,
    add, 
    remove, 
    dashRemoveFollow,
    findMatch,
    getTotalFollows
}

//find a list of animals followed by user by user id
function getAnimalFollows(id) {
    return db
    .select ('animals.id as animal_id', 'animals.name', 'animals.species_id', 'animal_status.animal_status', 'animals.shelter_id', 'shelters.shelter', 'breeds.breed', 'ages.age', 'animal_meta.is_male', 'pictures.img_url')
    .from('animal_follows')
    .leftJoin('animals', 'animal_follows.animal_id', 'animals.id')
    .leftJoin('animal_status', 'animals.animal_status_id', 'animal_status.id')
    .leftJoin('shelters', 'animals.shelter_id', 'shelters.id')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
    .leftJoin('animal_meta', 'animals.id', 'animal_meta.animal_id')
    .leftJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .leftJoin('ages', 'animal_meta.age_id', 'ages.id')
    .where('animal_follows.user_id', id)
}



//find animal and user match
function getByIds(animalId, userId) {
    return db('animal_follows')
    .where({
        animal_id : animalId,
        user_id : userId
    })
    .first()
}

//find all follows by animal id
function getByAnimalId(id) {
    return db('animal_follows')
    .where('animal_id' , id )

}

//find follow count by animal id
function getTotalFollows(id) {
    return db('animal_follows')
    .where('animal_id', id)
    .count()
}

function add(follow) {
    return db('animal_follows')
    .insert(follow, 'animal_id')
    .then(([animal_id]) => getTotalFollows(animal_id))
}

function remove(animalId, userId) {
    return db('animal_follows')
    .where({
        animal_id : animalId,
        user_id : userId})
    .del();
}

function dashRemoveFollow(animalId, userId) {
    return db('animal_follows')
    .where({
        animal_id : animalId,
        user_id : userId})
    .del()
    .then( count => getAnimalFollows(userId))
}

function findMatch(animalId, userId) {
    return db('animal_follows')
    .where({
        animal_id: animalId,
        user_id: userId
    })
    .first()
}
