const router = require("express").Router();
const verifyToken = require('../middleware/verifyToken.js');

const Users = require('../models/users/users.js');

const UserMetas = require('../models/users_meta/users_meta');
const ShelterFollow = require('../models/shelter_follows/shelter_follows')
const AnimalFollow = require('../models/animal_follows/animal_follows')

// MIDDLEWARE TO VALIDATE IDs
function validateUserId (req, res, next) {
    if (req.params.id) {
        Users.getUserById(req.params.id)
        .then(user => {
            if (user) {
                next()
            } else {
                res.status(404).json({ message: 'No user by that id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieiving valid user', error: error.toString() })
        })
    }
}

function validateUserMetaId (req, res, next) {
    if (req.params.id) {
        UserMetas.getUserMetaById(req.params.id)
        .then(meta => {
            if (meta) {
                next();
            } else {
                res.status(404).json({ message: 'No user meta by that id' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieiving valid user meta', error: error.toString() })
        })
    }
}

// CRUD for USERS
router.get('/', (req, res) => {
    Users.getUsers()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting users", error: error.toString()})
    })
})

router.get('/:id', validateUserId, (req, res) => {
    Users.getUserById(req.params.id)
    .then( user => {
        res.status(200).json(user)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user", error: error.toString() })
    })
})

router.get('/strict/:id', verifyToken, (req, res) => {
    if(req.creds.user_id == req.params.id) {
        Users.getUserById(req.params.id)
        .then( user => {
            res.status(200).json(user)
        })
        .catch( error => {
            res.status(500).json({ message: "Error getting user", error: error.toString() })
        })
    } else {
        res.status(400).json({message: 'invalid user id on record'})
    }

} )



router.get('/username/:username', (req, res) => {
    Users.getUserByUsername(req.params.username)
    .then( user => {
        res.status(200).json(user)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user", error: error.toString() })
    })
})

router.get('/email/:email', (req, res) => {
    Users.getUserByEmail(req.params.email)
    .then( user => {
        res.status(200).json(user)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user", error: error.toString() })
    })
})

router.get('/sub/:sub_id', (req, res) => {
    Users.getUserBySubId(req.params.sub_id)
    .then( user => {
        res.status(200).json(user)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user", error: error.toString() })
    })
})

router.get('/:id/complete', validateUserId, (req, res) => {
    Users.getCompleteUserDataById(req.params.id)
    .then( user => {
        res.status(200).json(user)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user", error: error.toString() })
    })
})

//test
router.get('/states', (req ,res) => {
    Users.getUserStates()
    .then( user => {
        res.status(200).json(user)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user", error: error.toString() })
    })
})
//

router.post('/', (req, res) => {
    const { email, sub_id, username } = req.body;

    Users.createUser(req.body)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(400).json({ message: 'Incomplete entry' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Error creating user", error: error.toString() })
    })
})

router.put('/:id', validateUserId, async (req, res) => {
    const { email, username, sub_id } = req.body
    
    if (!email || !username || !sub_id ) {
        res.status(400).json({ errorMessage: "Please provide user's email and username and sub_id" })
    }

    Users.updateUser(req.params.id, req.body)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "User not found" })
        }
    })
    .catch (error => {
        res.status(500).json({ error: error.toString() })
    })
})

router.delete('/:id', (req, res) => {
    Users.removeUser(req.params.id)
    .then( deleted => {
        if (deleted) {
            res.status(200).json(deleted)
        }
        else {
            res.status(400).json({ message: 'Requested user cannot be found' })
        }
    })
    .catch (error => {
        res.status(500).json({ error: error.toString() })
    })
})


// user_meta routes
router.get('/meta/:id', validateUserMetaId, (req, res) => {
    UserMetas.getUserMetaById(req.params.id)
    .then( meta => {
        res.status(200).json(meta)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user meta", error: error.toString() })
    })
})

router.get('/:user_id/meta', (req, res) => {
    UserMetas.getUserMetaByUserId(req.params.user_id)
    .then( meta => {
        res.status(200).json(meta)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user meta", error: error.toString() })
    })
})

router.get('/meta/state/:state_id', (req, res) => {
    UserMetas.getUserMetaByStateId(req.params.state_id)
    .then( meta => {
        res.status(200).json(meta)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user meta", error: error.toString() })
    })
})

router.get('/meta/suid/:shelter_user_id', (req, res) => {
    UserMetas.getUserMetaByShelterUserId(req.params.shelter_user_id)
    .then( meta => {
        res.status(200).json(meta)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user meta", error: error.toString() })
    })
})

router.get('/meta/num/:phone_number', (req, res) => {
    UserMetas.getUserMetaByPhoneNumber(req.params.phone_number)
    .then( meta => {
        res.status(200).json(meta)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user meta", error: error.toString() })
    })
})

router.get('/meta/zip/:zip', (req, res) => {
    UserMetas.getUserMetaByZip(req.params.zip)
    .then( meta => {
        res.status(200).json(meta)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user meta", error: error.toString() })
    })
})

router.get('/meta/city/:city', (req, res) => {
    UserMetas.getUserMetaByCity(req.params.city)
    .then( meta => {
        res.status(200).json(meta)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting user meta", error: error.toString() })
    })
})

router.post('/meta', (req, res) => {
    const { id, user_id, shelter_user_id } = req.body

    UserMetas.createUserMeta(req.body, 'id')
    .then( meta => {
        if (meta) {
            res.status(200).json(meta)
        }
        else {
            res.status(400).json({ message: 'Incomplete entry' })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "Error while saving user meta to the database", error: error.toString() })
    })
})


router.put('/meta/:id', validateUserMetaId, (req, res) => {
    const { id, user_id, shelter_user_id } = req.body

    UserMetas.updateUserMeta(req.params.id, req.body)
    .then( meta => {
        if (meta) {
            res.status(200).json(meta)
        }
        else {
            res.status(404).json({ message: "User meta not found" })
        }
    })
    .catch (error => {
        res.status(500).json({ error: "Error updating user meta" })
    })
})


//update user meta by USER ID with AUTH
router.put('/meta/user/:id', verifyToken, validateUserId, (req, res) => {
        const { phone_number, name, street_address, city, state_id, zip } = req.body
        if(req.creds.user_id == req.params.id) {
            UserMetas.updateUserMetaByUserId(req.params.id, req.body)
            .then( changes => {
                res.status(200).json(changes)
            })
            .catch( error => {
                res.status(500).json({ message: "Error getting user", error: error.toString() })
            })
        } else {
            res.status(400).json({message: 'invalid user id on record'})
        }
})



router.delete('/meta/:id', (req, res) => {
    UserMetas.deleteUserMeta(req.params.id)
    .then( meta => {
        if (meta) {
            res.status(200).json(meta)
        }
        else {
            res.status(404).json({ message: "User meta not found" }) 
        }
    })
    .catch (error => {
        res.status(500).json({ error: "Error deleting user meta" })
    })
})

//get a list of shelters a user is following by user id
router.get('/:id/follows/shelters', (req, res) => {
    ShelterFollow.getFollowsByUserId(req.params.id)
    .then( shelters => {
        res.status(200).json(shelters)
    })
    .catch( error => {
        res.status(500).json({err: error.toString()})

    })
})




//get a list of animals a user is following by user id
router.get('/:id/follows/animals', (req, res) => {
    AnimalFollow.getAnimalFollows(req.params.id)
    .then( animals => {
        res.status(200).json(animals)
    })
    .catch( error => {
        res.status(500).json({err: error.toString()})
    })
})




//user follow shelter
router.post('/:userId/follows/shelter/:shelterId', noShelterFollowMatch, (req, res) => {
    const newFollow = {shelter_id : req.params.shelterId, user_id : req.params.userId}
    ShelterFollow.addShelterFollows(newFollow)
    .then(count => {
        //returns total follows count
        res.status(201).json(count)
    })
    .catch(error => {
        res.status(500).json({err: error.toString()})
    })
})

//user unfollow shelter
router.delete('/:userId/follows/shelter/:shelterId', getShelterFollowMatch, (req, res) => {
    ShelterFollow.deleteShelterFollows(req.params.shelterId, req.params.userId)
    .then(count => {
        if(count > 0) {
            res.status(200).json(count)
        } else {
            res.status(400).json({message : "no follow deleted"})
        }
    })
    .catch(error => {
        res.status(500).json({err: error.toString()})
    })
})

//user follow animal
router.post('/:userId/follows/animal/:animalId', noAnimalFollowMatch, (req, res) => {
    const newFollow = {animal_id : req.params.animalId, user_id : req.params.userId}
    AnimalFollow.add(newFollow)
    .then(count => {
        //returns total follows count
        res.status(201).json(count)
    })
    .catch(error => {
        res.status(500).json({err: error.toString()})
    })
})

//user unfollow animal
router.delete('/:userId/follows/animal/:animalId', getAnimalFollowMatch, (req, res) => {
    AnimalFollow.remove(req.params.animalId, req.params.userId)
    .then(count => {
        if(count > 0) {
            res.status(200).json(count)
        } else {
            res.status(400).json({message : "no follow deleted"})
        }
    })
    .catch(error => {
        res.status(500).json({err: error.toString()})
    })
})

//user unfollow animal FOR USER DASHBOARD
router.delete('/:userId/unfollows/animal/:animalId', getAnimalFollowMatch, (req, res) => {
    AnimalFollow.dashRemoveFollow(req.params.animalId, req.params.userId)
    .then(follows => {
        res.status(200).json(follows)
    })
    .catch(error => {
        res.status(500).json({err: error.toString()})
    })
})

//MIDDLEWARE for checking for no animal follows match
function noAnimalFollowMatch(req, res, next) {
    AnimalFollow.getByIds(req.params.animalId, req.params.userId)
    .then(result => {
        if(result) {
            res.status(400).json({message: "Follow Existing"})
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(500).json({err : error.toString()})
    })
}

//MIDDLEWARE for checking for existing animal follows
function getAnimalFollowMatch(req, res, next) {
    AnimalFollow.getByIds(req.params.animalId, req.params.userId)
    .then(result => {
        if(result) {
            next()
        } else {
            res.status(400).json({message: "no follow existing"})
        }
    })
    .catch(error => {
        res.status(500).json({err : error.toString()})
    })
}

//MIDDLEWARE  for checking for no shelter follows match
function noShelterFollowMatch(req, res, next) {
    ShelterFollow.getFollowsMatchByIds(req.params.shelterId, req.params.userId)
    .then(result => {
        if(result) {
            res.status(400).json({message: "Follow Existing"})
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(500).json({err : error.toString()})
    })
}

//MIDDLEWARE for checking for existing shelter follows
function getShelterFollowMatch(req, res, next) {
    ShelterFollow.getFollowsMatchByIds(req.params.shelterId, req.params.userId)
    .then(result => {
        if(result) {
            next()
        } else {
            res.status(400).json({message: "no follow existing"})
        }
    })
    .catch(error => {
        res.status(500).json({err : error.toString()})
    })
}



module.exports = router;