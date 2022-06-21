const router = require("express").Router();

const jswt = require('jsonwebtoken'); // for generating new token from api
const secrets = require('../config/secrets.js')

const Shelter = require("../models/shelters/shelters.js")
const Shelters = require('../models/shelters/shelters.js')
const ShelterContacts = require('../models/shelter_contacts/shelter_contacts.js')
const ShelterLocation = require('../models/shelter_locations/shelter_locations.js')
const ShelterUsers = require('../models/shelter_users/shelter_users.js')
const ShelterFollows = require('../models/shelter_follows/shelter_follows.js')
const UserMeta = require('../models/users_meta/users_meta.js')
const Users = require('../models/users/users.js')


/****** SHELTER ONBOARDING STEP 2 : ADDING MAIN CONTACT AND UPDATE SHELTER RECORD WITH MAIN CONTACT ID ******/

router.post('/:id/mainContact', validateShelterId, (req, res) => {
    const contact = {shelter_id: req.body.shelter_id, name: req.body.name, email: req.body.email, phone: req.body.phone}
    if (contact.shelter_id && contact.name && contact.phone && contact.email) {
            ShelterContacts.addShelterContacts(contact)
            .then( newContact => {
                console.log(newContact)
                const change = {shelter_contact_id : newContact.id}
                Shelters.updateShelter(req.body.shelter_id, change)
                res.status(201).json(newContact)
            })
            .catch (error => {
                res.status(500).json({ message: 'Error adding contact', error: error.toString() })
            })
    } else {
        res.status(400).json({ message: "please enter all required shelter contact fields" })
    }
})


/****** END OF SHELTER ONBOARDING STEP 2 ******/

/****** SHELTER ONBOARDING STEP 3: ADDING MAIN LOCATION AND UPDATE SHELTER RECORD WITH MAIN LOCATION ID ******/

router.post('/:id/mainLocation', validateShelterId, (req, res) => {
    const location = {shelter_id: req.body.shelter_id, street_address: req.body.street_address, city: req.body.city, zipcode: req.body.zipcode, state_id: req.body.state_id, nickname: req.body.nickname, shelter_contact_id: req.body.shelter_contact_id}
    if (location.shelter_id && location.street_address && location.city && location.zipcode && location.state_id && location.nickname && location.shelter_contact_id) {
            ShelterLocation.addShelterLocations(location)
            .then( newLocation => {
                console.log(newLocation)
                const change = {shelter_location_id : newLocation.id}
                Shelters.updateShelter(req.body.shelter_id, change)
                res.status(201).json(newLocation)
            })
            .catch (error => {
                res.status(500).json({ message: 'Error adding contact', error: error.toString() })
            })
    } else {
        res.status(400).json({ message: "please enter all required shelter contact fields" })
    }
})


/****** END OF SHELTER ONBOARDING STEP 3 ******/


//get shelter displayed info for public page
router.get('/public/:shelterId/:userId', (req, res) => {
    Shelters.getPublicShelterById(req.params.shelterId)
    .then(shelter => {
        let shelterFollow = false;
        ShelterFollows.getFollowsByIds(req.params.shelterId, req.params.userId)
        .then(result => {
            if(result) shelterFollow = true;
                shelter.shelterFollow = shelterFollow
                //res.status(200).json(shelter)
                Shelter.getAccountID(req.params.shelterId)
                .then( account => {
                    let hasStripe = false;
                    if(account) hasStripe = true;
                    shelter.hasStripe = hasStripe;
                    res.status(200).json(shelter)
            })
        })
        .catch(error => {
            res.status(500).json({err : error.toString()})
        })
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting shelter", error: error.toString()})
    })
})




//get route to get the shelter name including the shelter contact, shelter location and 
//the contact for that location, shelter followers
router.get('/:id', validateShelterId, (req, res) => {
    Shelters.getById(req.params.id)
        .then(shelter => {
            res.status(200).json(shelter)
        })
        .catch(error => {
            res.status(500).json({ message: 'could not retrieve the shelter info', error: error.toString() })
        })
})

//get all shelters
router.get('/', (req, res) => {
    Shelters.getAllShelters()
        .then(shelters => {
            res.status(200).json(shelters)
        })
        .catch(error => {
            res.status(500).json({ message: 'could not retrieve all the shelters', error: error.toString() })
        })
})

//get all shelter contacts
router.get('/:id/contacts', validateShelterId, (req, res) => {
    ShelterContacts.getContactByShelterId(req.params.id)
        .then(contacts => {
            res.status(200).json(contacts)
        })
        .catch(error => {
            res.status(500).json({ message: 'could not retrieve the shelter contacts', error: error.toString() })
        })
})

//get shelter contact by id
router.get('/contact/:id', (req, res) => {
    ShelterContacts.getByShelterContactId(req.params.id)
        .then(contact => {
            if (contact) {
                res.status(200).json(contact)
            }
            else {
                res.status(404).json({ message: 'contact id does not exist' })

            }
        })
        .catch(error => {
            res.status(500).json({ message: `could not retrieve the shelter contact id ${req.params.contactId} error:${error.toString()}` })
        })
})

//get all shelter locations
router.get('/:id/locations', validateShelterId, (req, res) => {
    ShelterLocation.getLocationByShelterId(req.params.id)
        .then(locations => {
            res.status(200).json(locations)
        })
        .catch(error => {
            res.status(500).json({ message: 'could not retrieve the locations of the shelters', error: error.toString() })
        })
})

//get shelter location by id
router.get('/location/:id', (req, res) => {
    ShelterLocation.getByShelterLocationId(req.params.id)
        .then(location => {
            if (location) {
                res.status(200).json(location)
            }
            else {
                res.status(404).json({ message: 'location id does not exist' })

            }
        })
        .catch(error => {
            res.status(500).json({ message: `could not retrieve the shelter contact id ${req.params.locationId} error:${error.toString()}` })
        })
})

//get all a specific shelter user based on their role id
router.get('/:id/users', validateShelterId, (req, res) => {
    ShelterUsers.getUsersByShelterId(req.params.id)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ message: 'could not get the user in the shelter', error: error.toString() })
        })
})

//adding shelter user
router.post('/:id/user', validateShelterId, (req, res) => {
    ShelterUsers.addShelterUsers(user)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({message: "Error adding shelter user", error: error.toString()})
    })
})

//get the match for a shelter users who follows the shelter 
router.get('/follows/:id/:userId', (req, res) => {

    ShelterFollows.getFollowsByIds(req.params.id, req.params.userId)
        .then(follows => {
            if (follows) {
                res.status(200).json(follows)
            }
            else {
                res.status(404).json({ message: 'shelter id and user id does not match' })

            }
        })
        .catch(error => {
            res.status(500)
                .json({ message: `could not get the follows for shelter ${req.params.id} error: ${error.toString()}` })
        })
})

//get the match for all the users who follows a specific shelter
router.get('/:id/follows', validateShelterId, (req, res) => {
    ShelterFollows.getUsersFollowsByShelterId(req.params.id)
        .then(follows => {
            res.status(200).json(follows)
        })
        .catch(error => {
            res.status(500)
                .json({ message: `could not get the shelters followed by users ${req.params.shelterId} error:${error.toString()}` })
        })
})

router.post('/:id/follows', validateShelterId, (req, res) => {
    const follow = {user_id : req.body.user_id, shelter_id: req.params.id}
    if (follow.user_id && follow.shelter_id){
            ShelterFollows.addShelterFollows(follow)
            .then(newFollow => {
                console.log(newFollow)
                res.status(201).json(newFollow)
            })
            .catch(err => {
                res.status(500).json({ message: 'Error adding follow', err: err.toString() })
            })
    } else {
        res.status(400).json({ message: "please enter all required fields" })
    }
})

router.delete('/:shelterId/:userId/follows', (req, res) => {
    const shelterId = req.params.shelterId
    const userId= req.params.userId

    ShelterFollows.getFollowsByIds(shelterId, userId)
    .then(result => {
        if (result) {
            ShelterFollows.deleteShelterFollows(shelterId, userId)
            .then(result => {
                res.status(201).json({message: `Successfully deleted shelter_id ${shelterId} with user_id ${userId}`, result})
            })
            .catch(err => {
                res.status(500).json({message: 'Error deleting match', err: err.toString() })
            })
        } else {
            res.status(400).json({message: "no match found"})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error deleting follows', err : err.toString()})
    })
} )


//add a shelter location for a specific shelter
router.post('/:id/location', validateShelterId, (req, res) => {

    Shelters.getById(req.params.id)

        .then(shelter => {
            console.log('shelter record ', shelter)

            if (shelter.id) {
                const shelterLoc = {
                    shelter_id: req.params.id,
                    nickname: req.body.nickname,
                    street_address: req.body.street_address,
                    city: req.body.city,
                    state_id: req.body.state_id,
                    zipcode: req.body.zipcode,
                    shelter_contact_id: req.body.shelter_contact_id
                }

                if (shelterLoc.shelter_id &&
                    shelterLoc.nickname &&
                    shelterLoc.street_address &&
                    shelterLoc.city &&
                    shelterLoc.state_id &&
                    shelterLoc.zipcode &&
                    shelterLoc.shelter_contact_id) {

                    ShelterLocation.addShelterLocations(shelterLoc)
                        .then(id => {
                            console.log('shelter location ', id)
                            res.status(200).json(id)
                        })
                        .catch(error => {
                            res.status(500).json({ message: "shelter location :Error adding shelter location", error: error.toString() })
                        })
                }
                else {
                    res.status(400).json({ message: "please enter all required shelter location fields" })
                }
            }

            else {
                res.status(404).json({ message: "shelter location :Not able to add a new shelter location", error: error.toString() })
            }

        })

        .catch(error => {
            res.status(500).json({ message: 'shelter location :add route: shelter id does not exist', error: error.toString() })
        })

})

//update a shelter location for a shelter
router.put('/location/:locationId',  (req, res) => {
    ShelterLocation.getByShelterLocationId(req.params.locationId)
    .then(shelterLocation => {
        if(shelterLocation.id){
            const shelterLoc = {
                shelter_id: req.body.shelter_id,
                nickname: req.body.nickname,
                street_address: req.body.street_address,
                city: req.body.city,
                state_id: req.body.state_id,
                zipcode: req.body.zipcode,
                shelter_contact_id: req.body.shelter_contact_id
            }
        
            if (shelterLoc.shelter_id &&
                shelterLoc.nickname &&
                shelterLoc.street_address &&
                shelterLoc.city &&
                shelterLoc.state_id &&
                shelterLoc.zipcode &&
                shelterLoc.shelter_contact_id) {
        
                ShelterLocation.updateShelterLocations(req.params.locationId, shelterLoc)
                    .then(updatedLocation => {
                        console.log('updated shelter location ', updatedLocation)
                        res.status(200).json(updatedLocation)

                    })
                    .catch(error => {
                        res.status(500).json({ message: "shelter location :Error updating shelter location", error: error.toString() })
                    })
            }
            else {
                res.status(400).json({ message: "please enter all required shelter location fields" })
            }
        }
        else {
            res.status(404).json({ message: 'shelter location update route: location id does not exist' })

        }
    })
    .catch(error => {
        res.status(500).json({ message: 'location id does not exist', error: error.toString() })
    })

})

//delete the location for a specific shelter
router.delete('/location/:locationId', (req, res) => {
    ShelterLocation.deleteShelterLocations(req.params.locationId)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} record has been deleted` })
            }
            else {
                res.status(404).json({ message: 'shelter location delete route: location id does not exist' })

            }
        })
        .catch(error => {
            res.status(500).json({ message: 'shelter location : delete route: error', error: error.toString() })
        })
})



//add a shelter contact for a specific shelter
router.post('/:id/contact', validateShelterId, (req, res) => {
    const contact = {shelter_id: req.params.id, name: req.body.name, email: req.body.email, phone: req.body.phone}
    if (contact.shelter_id && contact.name && contact.phone && contact.email) {
            ShelterContacts.addShelterContacts(contact)
            .then( newContact => {
                console.log(newContact)
                res.status(201).json(newContact)
            })
            .catch (error => {
                res.status(500).json({ message: 'Error adding contact', error: error.toString() })
            })
    } else {
        res.status(400).json({ message: "please enter all required shelter contact fields" })
    }
    
   /* Shelters.getById(req.params.id)
        .then(shelter => {
            if (shelter.id) {
                const shelterCon = {
                    shelter_id: req.params.id,
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                }

                if (shelterCon.shelter_id &&
                    shelterCon.name &&
                    shelterCon.email &&
                    shelterCon.phone) {
                    ShelterContacts.addShelterContacts(shelterCon)
                        .then(id => {
                            console.log('shelter contact ', id)
                            res.status(200).json(id)
                        })
                        .catch(error => {
                            res.status(500).json({ message: "shelter contact add route: Error adding shelter contact", error: error.toString() })
                        })
                }
                else {
                    res.status(400).json({ message: "please enter all required shelter contact fields" })
                }
            }
            else {
                res.status(404).json({ message: "shelter contact add route: Not able to add a new shelter contact", error: error.toString() })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'shelter contact add route: shelter id does not exist', error: error.toString() })
        })*/
})

//update a shelter contact for a specific shelter
router.put('/contact/:contactId', (req, res) => {

    ShelterContacts.getByShelterContactId(req.params.contactId)
    .then(shelterContact => {
        if(shelterContact.id){
            const shelterCon = {
                shelter_id: req.body.shelter_id,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
            if (shelterCon.shelter_id &&
                shelterCon.name &&
                shelterCon.email &&
                shelterCon.phone) {
                ShelterContacts.updateShelterContacts(req.params.contactId, shelterCon)
                    .then(updatedContact => {
                        console.log('shelter contact ', updatedContact)
                        res.status(200).json(updatedContact)

                    })
                    .catch(error => {
                     //   res.status(500).json({ message: "shelter contact update route: Error adding shelter contact", error: error.toString() })
                    })
            }
            else {
                res.status(400).json({ message: "please enter all required shelter contact fields" })
            }
        }
        else {
            res.status(404).json({ message: 'shelter contact update route: contact id does not exist' })

        }
    })
    .catch(error => {
        res.status(500).json({ message: 'contact id does not exist', error: error.toString() })
    })
    
})

//delete a shelter contact for a specific shelter
router.delete('/contact/:contactId', (req, res) => {
    ShelterContacts.deleteShelterContacts(req.params.contactId)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} record has been deleted` })
            }
            else {
                res.status(404).json({ message: 'shelter contact delete route: contact id does not exist' })

            }
        })
        .catch(error => {
            res.status(500).json({ message: 'shelter contact : delete route: error', error: error.toString() })
        })
})

function validateShelterId(req, res, next) {
    if (req.params.id) {
        Shelters.getByIdSimple(req.params.id)
            .then(shelter => {
                if (shelter) {
                    next();
                } else {
                    res.status(404).json({ message: "No shelter by that shelter id" })
                }
            })
            .catch(error => {
                res.status(500).json({ message: "Error getting valid shelter", error: error.toString() })
            })
    } else {
        res.status(400).json({message: "No shelter id provided"})
    }
}

function checkAccountRecordExists(req, res, next){
    Shelters.getAccountID(req.params.id)
    .then(results => {
        if (results)
            res.status(400).json({error: 'Shelter already has stripe account'});
        else
            next();
    })
    .catch(err => {
        res.status(500).json({error: 'Error checking if stipe account exitst'});
    })
}

router.post('/:id/account', validateShelterId, checkAccountRecordExists, (req, res) => {
    Shelter.addAccountID({shelter_id: req.params.id, account_id: req.body.account_id})
    .then(result => {
        if (result)
            res.status(200).json({success: result});
        else
            res.status(400).json({error: 'Error adding account id'});
    })
    .catch(err => {
        res.status(500).json({error: 'Error adding account id'});
    })
})

router.get('/:id/account', validateShelterId, (req, res) => {
    Shelter.getAccountID(req.params.id)
    .then(result => {
        if (result)
            res.status(200).json({success: result});
        else
            res.status(400).json({error: 'Error adding account id'});
    })
    .catch(err => {
        res.status(500).json({error: 'Error adding account id'});
    })
})

/*** SHELTER ONBOARDING 1 : CREATE SHELTER with ADDING SHELTER USER AND UPDATING USER META MIDDLEWARE ***/
router.put('/users/:userId', validateUserId, validateNoAssociation, addShelter, addShelterUser, (req, res) => {
    let change = {shelter_user_id: req.shelterUser.id}
    UserMeta.updateUserMetaByUserId_onboarding(req.params.userId, change)
    .then( updateCount => {
        if(updateCount > 0) {
            res.status(200).json({message: `step 1 of onboarding success`, shelterInfo: req.shelter})
        }
        else {
            ShelterUsers.deleteShelterUsers(req.shelterUser.id);
            Shelters.deleteShelter(req.shelter.id);
            console.log("Error from step 1 of onboarding");
            res.status(400).json({ message: "Error from step 1 of onboarding"  });

        }
    })
    .catch( error => {
        console.log("last step of add shelter", error)

        ShelterUsers.deleteShelterUsers(req.shelterUser.id);
        Shelters.deleteShelter(req.shelter.id);
        res.status(500).json({ message: "Error adding shelter, add shelter user, and update user", error: error.toString() })
    })
})
//middleware for adding shelter
function addShelter(req, res, next) {
    const shelter = {shelter : req.body.shelter, EIN : req.body.EIN}
    Shelters.addShelter(shelter)
    .then( newShelter => {
        if(newShelter) {
            const user = {id : req.params.userId, shelter_id : newShelter.id}
            const token = generateToken(user)

            req.shelter = newShelter
            req.shelter.token = token
            next();
        } else {
            console.log("Error adding shelter");
            res.status(400).json({ message: "Error adding shelter" })
        }
    })
    .catch ( error => {
        console.log("add shelter", error)
        res.status(500).json({ message: "Error adding shelter", error: error.toString() })
    })
}
//middleware for adding shelter user
function addShelterUser(req, res, next) {
    const shelterUser = {role_id: 1, shelter_id: req.shelter.id, user_id: req.params.userId}
        ShelterUsers.addShelterUsers(shelterUser)
        .then( newShelterUser => {
            if(newShelterUser) {
                req.shelterUser = newShelterUser
                console.log(req.shelterUser)
                next();
            } else {
                Shelters.deleteShelter(req.shelter.id)
                console.log("Error adding shelter and shelter User");
                res.status(400).json({ message: "Error adding shelter and shelter User"  })
            }
            
        })
        .catch( error =>{
            Shelters.deleteShelter(req.shelter.id)
                    console.log("add shelter user", error)

            res.status(500).json({ message: "Error adding shelter and shelter user", error: error.toString() })
        
        })
}
//middleware for validate user id
function validateUserId(req, res, next) {
    Users.getByIdSimple(req.params.userId)
    .then( user => {
        if (user) {
            next();
        } else {
            console.log("Error finding user");
            res.status(404).json({ message: "Error finding user" })
        }
    })
    .catch (error => {
        console.log("validate user", error)
        res.status(500).json({ message: "Error happened valid user id", error: error.toString() })
    })
}
//middleware for validate no shelter associated with current user
function validateNoAssociation(req, res, next) {
    ShelterUsers.getByUserId(req.params.userId)
    .then(shelterUser => {
        if(!shelterUser) {
            next();
        } else {
            console.log("User already associate with another shelter");
            res.status(400).json({ message: "User already associate with another shelter"  })
        }
    })
    .catch( error => {
        console.log("validate association", error)
        res.status(500).json({ message: "Error happened validate No association", error: error.toString() })
    })
}

/******** END OF SHELTER ONBOARDING STEP 1  *********/

//initial token setting to limited payload due to lack of addition info passed down on the onboarding process
function generateToken(user) {
    const payload = {
        user_id: user.id,
        shelter_id: user.shelter_id,
    }
    const options = {
        expiresIn: '1d'
    }
    return jswt.sign(payload, secrets.jwtSecret, options)
}



module.exports = router;
