const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    getNextId,
    getPublicAnimalById,
    getPublicAnimals,
    getById,
    getBy,
    getAnimalsByShelterId,
    getAnimalMetaById,
    getAnimalFollowsById,
    getNotesByAnimalId,
    remove,
    update,
    add, 
    findMatch, //for animal and animal_meta
    findAnimalShelterMatch, 
    getPublicAnimals
}

//get a number of animal displayed info for public page by random 
function getPublicAnimals(num) {
    return db
    .select('animals.id','animals.name', 'pictures.img_url', 'animal_meta.is_male', 'breeds.breed','ages.age')
    .from('animals')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
    .leftJoin('animal_meta', 'animals.id', 'animal_meta.animal_id' )
    .leftJoin('ages', 'animal_meta.age_id', 'ages.id')
    .leftJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .orderBy(db.raw("RANDOM()"))
    .limit(num)
}

function getNextId(){
    return db.raw("SELECT last_value FROM animals_id_seq");
}

//get a number of animal displayed info for public page by random 
function getPublicAnimals(num) {
    return db
    .select('animals.id','animals.name', 'pictures.img_url', 'animal_meta.is_male', 'breeds.breed','ages.age')
    .from('animals')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
    .leftJoin('animal_meta', 'animals.id', 'animal_meta.animal_id' )
    .leftJoin('ages', 'animal_meta.age_id', 'ages.id')
    .leftJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .orderBy(db.raw("RANDOM()"))
    .limit(num)
}


//get animal displayed info for public page by animal id
function getPublicAnimalById(animalId) {
    let query = db
    .select('animals.id', 'animals.name', 'animal_status.animal_status', 'species.species', 
    'animals.shelter_id', 'shelters.shelter', 'shelter_locations.street_address', 'shelter_locations.city', 'states.state', 'shelter_locations.zipcode', 'shelter_contacts.phone', 'shelter_contacts.email',
    'breeds.breed', 'ages.age', 'size.size', 'coat_length.coat_length', 'animal_meta.is_male', 'animal_meta.color', 'animal_meta.is_vaccinated', 'animal_meta.is_neutered_spayed', 'animal_meta.is_house_trained',
    'animal_meta.description', 'animal_meta.health', 'animal_meta.is_good_with_kids', 'animal_meta.is_good_with_dogs', 'animal_meta.is_good_with_cats', 'animal_meta.is_mixed') 
    .from('animals')
    .leftJoin('animal_status', 'animals.animal_status_id', 'animal_status.id')
    .leftJoin('species', 'animals.species_id', 'species.id')
    .leftJoin('shelters', 'animals.shelter_id', 'shelters.id')
    .leftJoin('shelter_locations', 'shelters.shelter_location_id', 'shelter_locations.id')
    .leftJoin('states', 'shelter_locations.state_id', 'states.id')
    .leftJoin('shelter_contacts', 'shelters.shelter_contact_id', 'shelter_contacts.id')
    .leftJoin('animal_meta', 'animal_meta.animal_id', 'animals.id')
    .leftJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .leftJoin('ages', 'animal_meta.age_id', 'ages.id')
    .leftJoin('size', 'animal_meta.size_id', 'size.id')
    .leftJoin('coat_length', 'animal_meta.coat_length_id', 'coat_length.id')
    .where('animals.id', animalId)
    .first()
    
    if(animalId){
        const promises = [query, getAnimalPicturesById(animalId), getTotalFollowers(animalId)]
        return Promise.all(promises).then(results => {
            let[animal, pictures, followerCount] = results;
            if(animal) {
                animal.pictures = pictures;
                animal.followerCount = followerCount; 
                return animal
            } else {
                return null;
            }
        })
    } else {
        return null;
    }
}

//get all photos of an animal by id
function getAnimalPicturesById(id) {
    return db
    .select('img_url')
    .from('pictures')
    .where('animal_id', id)
}

//get total followers of an animal by id
function getTotalFollowers(id) {
    return db('animal_follows')
    .where('animal_id', id)
    .count()
}


//get full record for animal, including all ids
function getById(id) {
    let query = db

    .select('animals.id', 'animals.name', 'species.id as species_id', 'species.species', 'shelters.id as shelter_id', 'shelters.shelter', 
    'animal_status.id as animal_status_id', 'animal_status.animal_status', 'shelter_locations.id as shelter_location_id', 
    'shelter_locations.nickname', 'pictures.img_id', 'pictures.img_url')

    .from('animals')
    .leftJoin('species', 'animals.species_id' , 'species.id')
    .leftJoin('shelters', 'animals.shelter_id', 'shelters.id')
    .leftJoin('animal_status', 'animals.animal_status_id', 'animal_status.id')
    .leftJoin('shelter_locations', 'animals.shelter_location_id', 'shelter_locations.id')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')

    if(id) {
        query.where('animals.id', id).first();
        const promises = [query, getAnimalMetaById(id), getNotesByAnimalId(id), getAnimalFollowsById(id)]

        return Promise.all(promises).then(results =>  {
            let [animal, meta, notes, followers] = results;
            if(animal) {
                animal.meta = meta;
                animal.notes = notes;
                animal.followers = followers;
                //animal.meta = animalToBody(animal.meta);
                
                return animal
            } else {
                return null;
            }
        })
    } else {
        return null;
    }
}

//get animal followers by animal id
function getAnimalFollowsById(id) {
    return db
    .select('animal_follows.user_id', 'animal_follows.animal_id', 'users.email', 'users.username')
    .from('animal_follows')
    .innerJoin('users', 'animal_follows.user_id', 'users.id')
    .innerJoin('animals', 'animal_follows.animal_id', 'animals.id')
    .where('animal_follows.animal_id', id)
}

function getNotesByAnimalId(id) {
    return db
    .select('animal_admin.id', 'animal_admin.notes', 'animal_admin.animal_id', 'animal_admin.shelter_user_id', 'users.username' ,'animal_admin.created_at')
    .from('animal_admin')
    .leftJoin('shelter_users', 'animal_admin.shelter_user_id', 'shelter_users.id')
    .leftJoin('users', 'shelter_users.user_id', 'users.id')
    .where('animal_id', id)
}

//get animal meta by animal id
function getAnimalMetaById(id) {
    console.log(id)
    let meta = db
    .select('animal_meta.id', 'animal_meta.animal_id', 'breeds.id as breed_id','breeds.breed', 'animal_meta.is_mixed', 'ages.id as age_id', 'ages.age', 'size.id as size_id', 'size.size', 'animal_meta.health', 'animal_meta.color', 'coat_length.id as coat_length_id', 'coat_length.coat_length', 'animal_meta.is_male', 'animal_meta.is_house_trained', 'animal_meta.is_neutered_spayed', 'animal_meta.is_good_with_kids', 'animal_meta.is_good_with_dogs', 'animal_meta.is_good_with_cats', 'animal_meta.is_vaccinated', 'animal_meta.description')
    .from('animal_meta')
    .innerJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .innerJoin('ages', 'animal_meta.age_id', 'ages.id')
    .innerJoin('size', 'animal_meta.size_id', 'size.id')
    .innerJoin('coat_length', 'animal_meta.coat_length_id', 'coat_length.id')
    .where('animal_meta.animal_id', id)
    .first()
    return meta;
}

 function animalToBody(meta ={}) {
   const result = {
       ...meta,
       is_male: boolToSex(meta.is_male),
       is_mixed: boolToString(meta.is_mixed),
       is_house_trained: boolToString(meta.is_house_trained),
       is_neutered_spayed: boolToString(meta.is_neutered_spayed),
       is_good_with_kids: boolToString(meta.is_good_with_kids),
       is_good_with_dogs: boolToString(meta.is_good_with_dogs),
       is_good_with_cats: boolToString(meta.is_good_with_cats),
       is_vaccinated: boolToString(meta.is_vaccinated)
   }

    return result;
}

function boolToSex(bool) {
    if (bool === undefined) { return null }
    return bool === true ? "Male" : "Female";
}

function boolToString(bool) {
    if (bool === undefined) { return null }
    return bool === true ? "Yes" : "No"
}

function getAnimalsByShelterId(id) {
    return db
    .select('animals.id', 'animals.name', 'species.species', 'animal_status.animal_status', 'shelter_locations.nickname', 'pictures.img_url')
    .from('animals')
    .leftJoin('species', 'animals.species_id' , 'species.id')
    .leftJoin('animal_status', 'animals.animal_status_id', 'animal_status.id')
    .leftJoin('shelter_locations', 'animals.shelter_location_id', 'shelter_locations.id')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
    .where('animals.shelter_id', id)
}

function getAll() {
    return db('animals');
}

function getBy(filter) {
    return db('animals')
    .where(filter)
}

function update(id, change) {
    return db('animals')
    .where({ id })
    .update(change)
    .then( updatedAnimal => updatedAnimal? getById(id) : null)
}

function remove(id) {
    return db('animals')
    .where({id})
    .del();
}

function add(animal) {
    return db('animals')
    .insert(animal, 'id')
    // .then (([id]) => getById(id))  
}


function findMatch(animalId, metaId) {
    return db('animal_meta')
    .where({ 
        animal_id: animalId,
        id: metaId  
    })
    .first()
}

function findAnimalShelterMatch(animalId, shelterId) {
    return db('animals')
    .where({
        shelter_id : shelterId,
        id : animalId
    })
    .first()
}