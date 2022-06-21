const db = require('../../data/dbConfig')
const knex = require('knex')

module.exports = {
    getAll,
    getById,
    getUserShelterAnimalInfo,
    getBy, //filter
    getByShelterId,
    getByUserId,
    getByAnimalId,
    add,
    remove,
    update
}

function getAll() {
    return db('applications');
}

//get prepopulated user, shelter, and animal info prior to the application process
function getUserShelterAnimalInfo(userId, shelterId, animalId) {
    let userQuery = db.select('email as userEmail', 'username').from('users').where('id', userId).first()
    let shelterQuery = db
    .select('shelter_contacts.email as shelterEmail', 'shelters.shelter')
    .from('shelters')
    .leftJoin('shelter_contacts', 'shelters.shelter_contact_id', 'shelter_contacts.id')
    .where('shelters.id', shelterId)
    .first()
    let animalQuery = db.select('name as animalName').from('animals').where('id', animalId).first()

    const promises = [userQuery, shelterQuery, animalQuery];

    if(userId && shelterId && animalId) {
        return Promise.all(promises).then(results => {
            let [user, shelter, animal] = results;
            if(user && shelter && animal) {
                let messageInfo = {};
                messageInfo.user = user;
                messageInfo.shelter = shelter;
                messageInfo.animal = animal

                return messageInfo
            } else {
                return null
            }
        })
    } else {
        return null;
    }
    
}

// get by application id
function getById(id) {
    let query = db
    .select('applications.id', 'applications.created_at', 'applications.animal_id', 'animals.name as animal_name', 'applications.shelter_id', 'shelters.shelter', 'application_status.application_status', 'applications.application_status_id', 'applications.user_id', 'application_meta.id as application_meta_id', 'application_meta.*') 
    .from('applications')
    .leftJoin('animals', 'applications.animal_id', 'animals.id')
    .leftJoin('shelters', 'applications.shelter_id', 'shelters.id')
    .leftJoin('application_status', 'applications.application_status_id', 'application_status.id')
    .leftJoin('application_meta', 'applications.id', 'application_meta.application_id')

    if(id) {
        query.where('applications.id', id).first()
        const promises = [query, getApplicationNotes(id)]

        return Promise.all(promises).then( results => {
            let [application, notes] = results;

            if(application) {
                
                application.notes = notes;

                return application
            } else {
                return null;
            }
        })           
    } else {
        return null;
    }

}

function getApplicationNotes(application_id) {
    if(application_id) {
        return db

        .select('application_admin.id', 'application_admin.notes', 'application_admin.shelter_user_id', 'users.username as by', 'application_admin.created_at')

        .from('application_admin')
        .innerJoin('shelter_users', 'application_admin.shelter_user_id', 'shelter_users.id')
        .innerJoin('users', 'shelter_users.user_id', 'users.id')
        .where('application_admin.application_id', application_id)
         
    } else {
        return null
    }
}

function getByUserId(id) {
    return db
    .select('applications.id', 'pictures.img_url', 'applications.animal_id','animals.name as animal_name', 'shelters.shelter', 'application_status.application_status', db.raw("extract(month from applications.created_at) as month"), db.raw("extract(day from applications.created_at) as day"), db.raw("extract(year from applications.created_at) as year"))
    .from('applications')
    .leftJoin('animals', 'applications.animal_id', 'animals.id')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
    .leftJoin('shelters', 'applications.shelter_id', 'shelters.id')
    .leftJoin('application_status', 'applications.application_status_id', 'application_status.id')
    .where('applications.user_id', id)
}

function getByShelterId(id) {
    if(id) {
        return db
        .select('applications.id', 'animals.name as animal_name', 'users.email', 'application_status.application_status')
        .from('applications')
        .leftJoin('animals', 'applications.animal_id', 'animals.id')
        .leftJoin('users', 'applications.user_id', 'users.id')
        .leftJoin('application_status', 'applications.application_status_id', 'application_status.id')
        .where('applications.shelter_id', id)
    } else {
        return null
    }
    
}

function getByAnimalId(id) {
    return db
    .select('applications.id', 'users.email', 'application_status.application_status')
    .from('applications')
    .innerJoin('animals', 'applications.animal_id', 'animals.id')
    .innerJoin('users', 'applications.user_id', 'users.id')
    .innerJoin('application_status', 'applications.application_status_id', 'application_status.id')
    .where('applications.animal_id', id)
}

function getBy(filter) {
    return db('applications')
    .where(filter)
}

//initial stage of filling out application, only returning id is required
function add(application) {
    return db('applications')
    .insert(application, 'id')

   // .then( ([id]) => getById(id))
}

function update(id, change) {
    return db('applications')
    .where({ id })
    .update(change)
    .then( updatedApplication => updatedApplication ? getById(id) : null)
}

function remove(id) {
    return db('applications')
    .where({ id })
    .del();
}
