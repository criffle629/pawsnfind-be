const db = require('../../data/dbConfig');


module.exports={
    getUsers,
    getUserById,
    getBy,
    getByIdSimple,
    getUserByUsername,
    getUserByEmail,
    getUserBySubId,
    getCompleteUserDataById,
    createUser,
    updateUser,
    removeUser,
}


/******** CREATE USER RECORD with USER META *********/

async function createUser(user) {
    let query  = await db('users')
    .insert(user, 'id')
    .then(([id]) => getUserById(id))

    const promises = [addUserMeta({user_id : query.id})]

    return Promise.all(promises).then( results => {
        const [meta] = results
        user = query;

        if(user) {
            user.meta = meta
            return user
        } else {
            return null;
        }
    })
}

function addUserMeta(userMeta) {
    return db('user_meta')
    .insert(userMeta, 'id')
    .then(([id]) => id ? getUserMetaByMetaId(id) : null)
}

function getUserMetaByMetaId(metaId) {
    return db('user_meta')
    .where('id', metaId)
    .first()
}

/************* END OF CREATING USER RECORD WITH META ************/

function getByIdSimple(id) {
    return db('users')
    .where({ id })
    .first()
}


function getUsers() {
    return db 
    .select('users.id', 'users.email', 'users.username' , 'users.created_at', 'user_meta.phone_number', 
    'user_meta.name', 'user_meta.street_address', 'user_meta.city', 'user_meta.zip', 'states.state', 'user_meta.shelter_user_id', 'shelter_users.role_id', 'shelter_users.shelter_id')
    .from('users') 
    .leftJoin('user_meta', 'users.id', 'user_meta.user_id')
    .leftJoin('shelter_users', 'user_meta.shelter_user_id', 'shelter_users.id')
    .leftJoin('states', 'user_meta.state_id', 'states.id')
}

function getUserById(user_id) {
    return db 
    .select('users.id', 'users.email', 'users.username' , 'users.created_at', 'user_meta.phone_number', 
    'user_meta.name', 'user_meta.street_address', 'user_meta.city', 'user_meta.zip', 'states.state', 'user_meta.shelter_user_id', 'shelter_users.role_id', 'shelter_users.shelter_id', 'shelters.shelter')
    .from('users') 
    .leftJoin('user_meta', 'users.id', 'user_meta.user_id')
    .leftJoin('shelter_users', 'user_meta.shelter_user_id', 'shelter_users.id')
    .leftJoin('shelters', 'shelter_users.shelter_id', 'shelters.id')
    .leftJoin('states', 'user_meta.state_id', 'states.id')
    .where( "users.id", user_id )
    .first()
}

function getCompleteUserDataById(id) {
    let query = db
    .select('users.id', 'users.email', 'users.username' , 'users.created_at', 'user_meta.phone_number', 
    'user_meta.name', 'user_meta.street_address', 'user_meta.city', 'user_meta.zip', 'states.state', 'user_meta.shelter_user_id', 'shelter_users.role_id', 'shelter_users.shelter_id')
    .from('users') 
    .leftJoin('user_meta', 'users.id', 'user_meta.user_id')
    .leftJoin('shelter_users', 'user_meta.shelter_user_id', 'shelter_users.id')
    .leftJoin('states', 'user_meta.state_id', 'states.id')
    .where( 'users.id', id)
    .first()

    const promises = [query, getUserDonations(id), getAnimalFollows(id), getShelterFollows(id)]

    return Promise.all(promises).then( results => {
        let [ user, donations, animal_follows, shelter_follows ] = results

        if (user) {
            user.donations = donations;
            user.animal_follows = animal_follows;
            user.shelter_follows = shelter_follows; 

            return user
        }
        else {
            return null;
        }
    })
}

// ******** HELPERS **********

// function getUserState(id) {
//     return db
//     .select('states.state')
//     .from('states')
//     .where('states.id', id)
// }

function getUserDonations(user_id) {
    return db 
    .select('shelters.shelter', 'donations.amount', 'donations.created_at')
    .from('donations')
    .innerJoin('shelters', 'donations.shelter_id', 'shelters.id')
    .where('donations.user_id', user_id)
}

function getAnimalFollows(user_id)  {
    return db('animal_follows')
    .select('animals.name', 'animals.id')
    .from('animal_follows')
    .innerJoin('animals', 'animal_follows.animal_id', 'animals.id')
    .where('animal_follows.user_id', user_id )
}

function getShelterFollows(user_id) {
    return db('shelter_follows')
    .select('shelters.shelter', 'shelters.id')
    .from('shelter_follows')
    .innerJoin('shelters', 'shelter_follows.shelter_id', 'shelters.id')
    .where('shelter_follows.user_id', user_id )

}
// ***********************


function getBy(filter) {
    return db('users')
    .where(filter)
}

function getUserByUsername(username) {
    return db
    .select('users.id', 'users.email','users.username' , 'users.created_at', 'user_meta.phone_number', 
    'user_meta.name', 'user_meta.street_address', 'user_meta.city', 'user_meta.zip', 'states.state', 'user_meta.shelter_user_id', 'shelter_users.role_id', 'shelter_users.shelter_id')
    .from('users') 
    .leftJoin('user_meta', 'users.id', 'user_meta.user_id')
    .leftJoin('shelter_users', 'user_meta.shelter_user_id', 'shelter_users.id')
    .leftJoin('states', 'user_meta.state_id', 'states.id')
    .where( 'users.username', username )
    .first()
}

function getUserByEmail(email) {
    return db
    .select('users.id', 'users.email','users.username' , 'users.created_at', 'user_meta.phone_number', 
    'user_meta.name', 'user_meta.street_address', 'user_meta.city', 'user_meta.zip', 'states.state', 'user_meta.shelter_user_id', 'shelter_users.role_id', 'shelter_users.shelter_id')
    .from('users') 
    .leftJoin('user_meta', 'users.id', 'user_meta.user_id')
    .leftJoin('shelter_users', 'user_meta.shelter_user_id', 'shelter_users.id')
    .leftJoin('states', 'user_meta.state_id', 'states.id')
    .where( 'users.email', email )
    .first()
}

function getUserBySubId(sub_id) {
    return db
    .select('users.id', 'users.email','users.username' , 'users.created_at', 'user_meta.phone_number', 
    'user_meta.name', 'user_meta.street_address', 'user_meta.city', 'user_meta.zip', 'states.state', 'user_meta.shelter_user_id', 'shelter_users.role_id', 'shelter_users.shelter_id')
    .from('users') 
    .leftJoin('user_meta', 'users.id', 'user_meta.user_id')
    .leftJoin('shelter_users', 'user_meta.shelter_user_id', 'shelter_users.id')
    .leftJoin('states', 'user_meta.state_id', 'states.id')
    .where( 'users.sub_id', sub_id )
    .first()
}
/*
function createUser(user) {
    return db('users')
    .insert(user)
    .returning('*')
    .then( (results) => results[0])

    // .then( ([id]) => getUserById(id) )
}
*/

function updateUser(id, user) {
    return db('users')
    .where({ id })
    .update(user)
}

function removeUser(id) {
    return db('users')
    .where({ id })
    .del();
}