const db = require('../../data/dbConfig')

module.exports = {
    getAllOptions
}


//returning a full list of options including locations and contacts associated with the shelter id
function getAllOptions(id) {

    let sizeQuery = db
    .select('*')
    .from('size')

    let coatLengthQuery = db
    .select('*')
    .from('coat_length')

    let subscriptionsQuery = db
    .select('*')
    .from('subscriptions')

    let breedsQuery = db
    .select('*')
    .from('breeds')

    let agesQuery = db
    .select('*')
    .from('ages')

    let applicationStatusQuery = db
    .select('*')
    .from('application_status')

    let speciesQuery = db
    .select('*')
    .from('species')

    let animalStatusQuery = db
    .select('*')
    .from('animal_status')

    let rolesQuery = db
    .select('*')
    .from('roles')

    let statesQuery = db
    .select('*')
    .from('states')

    const promises = [sizeQuery, coatLengthQuery, subscriptionsQuery, breedsQuery, agesQuery, applicationStatusQuery, speciesQuery, animalStatusQuery, rolesQuery, statesQuery, getShelterLocations(id), getShelterContacts(id)]
    return Promise.all(promises).then(results => {
       
        let [size, coat_length, subscriptions, breeds, ages, application_status, species, animal_status, roles, states, locations, contacts] = results
        
        return {
            size: size,
            coat_length: coat_length,
            subscriptions: subscriptions,
            breeds: breeds,
            ages: ages,
            application_status: application_status,
            species: species,
            animal_status: animal_status,
            roles: roles,
            states: states,
            locations: locations,
            contacts: contacts
        }
    })

}

function getShelterLocations(id) {
    return db('shelter_locations')
    .where('shelter_id', id)
}

function getShelterContacts(id) {
    return db('shelter_contacts')
    .where('shelter_id', id)

}



