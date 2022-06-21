const router = require("express").Router();
const Animals = require('../models/animals/animals.js');
const AnimalMeta = require('../models/animal_meta/animal_meta.js');
const AnimalFollows = require('../models/animal_follows/animal_follows.js')
const AnimalAdmin = require('../models/animal_admin/animal_admin.js')
const Shelter = require('../models/shelters/shelters.js')
const Pictures = require('../models/pictures/pictures.js')


router.get('/nextid', (req, res) => {
    Animals.getNextId()
    .then( nextID => {
        res.status(200).json({id: nextID.rows[0].last_value + 1})
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting next ID", error: error.toString()})
    })
})

//get a number of animals displayed for public page
router.get('/public/count/:num', (req, res) => {
    Animals.getPublicAnimals(req.params.num)
    .then(animals => {
        res.status(200).json(animals)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting animals", error: error.toString()})
    })
})

//get animal displayed info for public page
router.get('/public/:animalId/:userId', (req, res) => {
    Animals.getPublicAnimalById(req.params.animalId)
    .then( animal => { 
        let animalFollow = false;
        AnimalFollows.findMatch(req.params.animalId, req.params.userId)
        .then( result => {
            if(result) animalFollow = true;
            animal.animalFollow = animalFollow
            Shelter.getAccountID(animal.shelter_id)
            .then( account => {
                let hasStripe = false;
                if(account) hasStripe = true;
                animal.hasStripe = hasStripe;
                res.status(200).json(animal)
            })
        })
        .catch( error => {
            res.status(500).json({err : error.toString()})
        })
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting animal", error: error.toString()})
    })
})


//find shelter and animal match by ids
router.get('/:animalId/match/shelter/:shelterId', (req, res) => {
    Animals.findAnimalShelterMatch(req.params.animalId, req.params.shelterId)
    .then( match => {
        if(match) {
            res.status(200).json(match)
        }
        else {
            res.status(404).json({message: "no match found"})
        }
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting a match", error: error.toString()})
    })
})



// gets all animals
router.get('/', (req, res) => {
    Animals.getAll()
    .then( animals => {
        res.status(200).json(animals)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting animals", error: error.toString()})
    })
})

// gets specific animal by ID
router.get('/:id', validateAnimalId, (req, res) => {
    Animals.getById(req.params.id)
    .then(animal => {
        if (animal) {
            res.status(200).json(animal);
        } else {
            res.status(404).json({ message: `Animal with ID ${req.params.id} does not exist`})
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

// gets meta information by animal ID
router.get('/:id/meta', validateAnimalId, (req, res) => {
    Animals.getAnimalMetaById(req.params.id)
    .then(animal => {
        if (animal) {
            res.status(200).json(animal);
        } else {
            res.status(404).json({ message: `Animal with ID ${req.params.id} does not exist`})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting animal meta', error: error.toString()})
    })
})

// gets all followers of the animal by animal ID
router.get('/:id/follows', validateAnimalId, (req, res) => {
    Animals.getAnimalFollowsById(req.params.id)
    .then(follows => {
        res.status(200).json(follows)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting followers of animal with ID ${req.params.id}`})
    })
})

// gets all the notes of the animal by ID
router.get('/:id/notes', validateAnimalId, (req, res) => {
    Animals.getNotesByAnimalId(req.params.id)
    .then(animal => {
        res.status(200).json(animal)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting notes of animal with ID ${req.params.id}`})
    })
})

//gets all animals of a specific shelter by shelter ID
router.get('/shelter/:id', validateShelterId, (req, res) => {
    Animals.getAnimalsByShelterId(req.params.id)
    .then(animals => {
        res.status(200).json(animals)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting animals of the shelter with ID ${req.params.shelterId}`})
    })
})


//get specific animal meta info by meta id
router.get('/meta/:id', validateMetaId, (req, res) => {
    AnimalMeta.getById(req.params.id)
    .then(animal => {
        res.status(200).json(animal)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting animal with ID ${req.params.id} `})
    })
})

//get followers of animal by animal id
router.get('/:id/follows', validateAnimalId, (req, res) => {
    AnimalFollows.getByAnimalId(req.params.id)
    .then(follows => {
        res.status(200).json(follows)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting followers of animal with Id ${req.params.id}`})
    })
})

//get follower of an animal by animal id and the user by user id
router.get('/follows/:animalId/:userId', getMatchAnimalUser, (req, res) => {
    AnimalFollows.getByIds(req.params.animalId, req.params.userId)
    .then(follows => {
        res.status(200).json(follows)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting user ${req.params.userId} following animal with id ${req.params.animalId}`})
    })
})

//get animal picture by id
router.get('/pictures/:id', (req,res) => {
    Pictures.getById(req.params.id)
    .then( picture => {
        res.status(200).json(picture)
    })
    .catch (error => {
        res.status(500).json({message: `Error getting picture id ${req.params.id} `})
    })
})
    

//get animal pictures by animal_id
router.get('/:id/pictures', (req, res) => {
    Pictures.getByAnimalId(req.params.id)
    .then( pictures => {
        res.status(200).json(pictures)
    })
    .catch (error => {
        res.status(500).json({message: `Error getting picture of animal ${req.params.id} `})
    })
})


//get animal picture by img_id
router.get('/pictures/img/:id', (req,res) => {
    Pictures.getByImgId(req.params.id)
    .then( picture => {
        res.status(200).json(picture)
    })
    .catch (error => {
        res.status(500).json({message: `Error getting picture with img_id ${req.params.id} `})
    })
})

//remove picture by id
router.delete('/pictures/:id', (req, res) => {


    Pictures.remove(req.params.id) 
    .then( count => {
        res.status(200).json(`${count} picture removed`)
    })
    .catch ( error => {
        res.status(500).json({message: `Error removing picture with id ${req.params.id} `})
    })
})

//update picture by id
router.put('/pictures/:id', (req, res) => {

    const pic = {
        id: req.params.id,
        animal_id: req.body.animal_id,
        img_url: req.body.img_url,
        img_id: req.body.img_id
    }
    Pictures.update(req.params.id, pic)
    .then ( pic => {
        res.status(200).json(pic)
    })
    .catch ( error => {
        res.status(500).json({message: `Error updating picture with id ${req.params.id} `})
    })
})
//add picture
router.post('/pictures', (req, res) => {

    const pic = {
        animal_id: req.body.animal_id,
        img_url: req.body.img_url,
        img_id: req.body.img_id
    }
    Pictures.add(pic) 
    .then(pic => {
        res.status(200).json(pic)
    })
    .catch (error => {
        res.status(500).json({ message: "Error getting animals", error: error.toString()})
    })
})



//get animal admin by Id
router.get('/admin/:id', validateAdminId, (req, res) => {
    AnimalAdmin.getById(req.params.id)
    .then(admin => {
        res.status(200).json(admin)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting animal admin with id ${req.params.id}`})
    })
})

//get animal admin notes of a specific animal using animal id
router.get('/:id/admin', validateAnimalId, (req, res) => {
    AnimalAdmin.getNotesByAnimalId(req.params.id)
    .then(notes=> {
        res.status(200).json(notes)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting notes of animal with id ${req.params.id}`})
    })
})




//get specific admin note of a specific animal using animal id and admin id
router.get('/:animalId/admin/:adminId', (req, res) => {
    AnimalAdmin.getByIds(req.params.animalId, req.params.adminId)
    .then(admin => {
        res.status(200).json(admin)
    })
    .catch(error => {
        res.status(500).json({message: `Error getting the note of the animal id ${req.params.animalId} and admin id ${req.params.adminId}`})
    })
})

//get a number of animals displayed for public page
router.get('/public/count/:num', (req, res) => {
    Animals.getPublicAnimals(req.params.num)
    .then(animals => {
        res.status(200).json(animals)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting animals", error: error.toString()})
    })
})


//Post animal admin notes
router.post('/:id/admin', (req, res) => {
    Animals.getById(req.params.id)
        .then(animal => {
            if(animal.id) {
                const adminNote = {
                    notes: req.body.notes,
                    animal_id: req.body.animal_id,
                    shelter_user_id: req.body.shelter_user_id
                }
                AnimalAdmin.add(adminNote)
                .then(id => {
                    res.status(200).json(id)
                })
                .catch(error => {
                    res.status(500).json({message: 'Error adding admin note', error: error.toString() })
                })
            } else {
                res.status(404).json({message: 'Animal with that Id does not exist'})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'Error', error: error.toString() })
        })
})

//Delete animal admin notes
router.delete('/:id/admin/:adminId', validateAnimalId, (req, res) => {
    Animals.getById(req.params.id)
        .then(animal => {
            if(animal.id) {
                AnimalAdmin.remove(req.params.adminId)
                .then(count => {
                    if(count > 0) {
                        res.status(200).json({message: `Admin note with Id ${req.params.id} has been deleted`})
                    } else {
                        res.status(404).json({message: `Admin note with Id ${req.params.id} does not exist`})
                    }
                })
                .catch (error => {
                    res.status(500).json({message: `Error deleting admin note with Id ${req.params.id}`, error: error.toString() })
                })
            } else {
                res.status(400).json({message: 'Animal with that Id is not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'Error deleting admin note'})
        })
})

//Update animal admin note
router.put('/:id/admin/:adminId', validateAnimalId, (req, res) => {
    Animals.getById(req.params.id)
        .then(animal => {
            if(animal.id) {
                const adminNote = {
                    notes: req.body.notes,
                    animal_id: req.body.animal_id,
                    shelter_user_id: req.body.shelter_user_id
                }
                AnimalAdmin.update(req.params.adminId, adminNote)
                .then(updated => {
                    res.status(200).json(updated)
                })
                .catch(error => {
                    res.status(500).json({message: 'Error updating admin note', error: error.toString() })
                })
            } else {
                res.status(404).json({message: 'Admin note with that Id does not exist'})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'Error updating admin note', error: error.toString() })
        })
})

//Delete Route
//This will delete animal from the animals table after going through middleware to find a match and deleting from animal meta table first.
router.delete('/:id/meta/:metaId', getMatch, deleteAnimal, (req, res) => {
    Animals.remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ message: 'deleted'})
                next()
            } else {
                res.status(400).json({message: "animal with the ID is not found"})
            }
        })
        .catch (error => {
            res.status(500).json({message: 'Error deleting animal', error: error.toString()})
        })
})

//Middleware to verify that there is animalId and metaId match
function getMatch (req, res, next) {
    Animals.findMatch(req.params.id, req.params.metaId)
    .then(match => {
        if(match) {
            next()
        } else {
            res.status(404).json({message: 'No match found'})
        }
    })
    .catch (error => {
        res.status(500).json({message: "Error accessing database", error: error.toString()})
    })
}

//Middleware to delete animal
//this will verify if the animal id exists and if it does, it will remove the animal from the animal meta table
function deleteAnimal (req, res, next) {
    Animals.getById(req.params.id)
        .then(animal => {
            if (animal) {
                AnimalMeta.remove(req.params.metaId)
                .then (count => {
                    if(count > 0) {
                        res.status(200).json({ message: 'deleted'})
                        next()
                    } else {
                        res.status(400).json({message: "animal with the ID is not found"})
                    }
                })
            } else {
                res.status(404).json ({ message: 'Animal does not exist'})
            }
        })
        .catch (error => {
            res.status(500).json({message: "Error deleting animal", error: error.toString()})
        })
}

//update animal 
//after middleware, it will then update the animal meta table
router.put('/:id/meta/:metaId', updateAnimal, (req, res) => {
    const animal_meta = {
        animal_id : req.body.animal_id,
        breed_id : req.body.breed_id,
        is_mixed : req.body.is_mixed,
        age_id : req.body.age_id,
        health : req.body.health,
        size_id : req.body.size_id,
        color : req.body.color,
        coat_length_id : req.body.coat_length_id,
        is_male : req.body.is_male,
        is_house_trained : req.body.is_house_trained,
        is_neutered_spayed : req.body.is_neutered_spayed,
        is_good_with_kids : req.body.is_good_with_kids,
        is_good_with_dogs : req.body.is_good_with_dogs,
        is_good_with_cats : req.body.is_good_with_cats,
        is_vaccinated : req.body.is_vaccinated,
        description : req.body.description
    }
    AnimalMeta.update(req.params.metaId, animal_meta)
    .then(updated => {
        console.log('animals meta update ', updated)
        res.status(200).json({updated})
    })
    .catch(error => {
        res.status(500).json({message: "Error updating animal meta", error: error.toString()})
    })
})

//middleware for update animal
//this will update the animals table first before getting to the Animal Meta table to update
function updateAnimal (req, res, next) {
    const animal = {
        name : req.body.name, 
        shelter_id : req.body.shelter_id,
        species_id : req.body.species_id,
        animal_status_id : req.body.animal_status_id,
        shelter_location_id : req.body.shelter_location_id,
        profile_img_id : req.body.profile_img_id
    }
    Animals.update(req.params.id, animal)
        .then (updated => {
            console.log('animals update ', updated)
            //res.status(200).json({updated})
            next();

        })
        .catch(error => {
            res.status(500).json({message: "Error updating animal", error: error.toString()})
        })
}

//Post animal
//After going through middleware, it will check if all required fields are given and add the animal info to the animal meta table
router.post('/', addAnimal, handlePictures, (req, res) => {
    const animal_meta = {
        animal_id: req.body.animal_id,
        breed_id: req.body.breed_id,
        is_mixed: req.body.is_mixed,
        age_id: req.body.age_id,
        health: req.body.health,
        size_id: req.body.size_id,
        color: req.body.color,
        coat_length_id: req.body.coat_length_id,
        is_male: req.body.is_male,
        is_house_trained: req.body.is_house_trained,
        is_neutered_spayed: req.body.is_neutered_spayed,
        is_good_with_kids: req.body.is_good_with_kids,
        is_good_with_dogs: req.body.is_good_with_dogs,
        is_good_with_cats: req.body.is_good_with_cats,
        is_vaccinated: req.body.is_vaccinated,
        description: req.body.description
    }

    if (req.body.animal_id &&
        req.body.breed_id &&
        req.body.is_mixed != null &&
        req.body.age_id &&
        req.body.health &&
        req.body.size_id &&
        req.body.color &&
        req.body.coat_length_id &&
        req.body.is_male != null &&
        req.body.is_house_trained != null &&
        req.body.is_neutered_spayed != null &&
        req.body.is_good_with_kids != null &&
        req.body.is_good_with_dogs != null &&
        req.body.is_good_with_cats != null &&
        req.body.is_vaccinated != null &&
        req.body.description) {
        AnimalMeta.add(animal_meta)
            .then(id => {
                res.status(201).json(req.body.animal_id)
            })
            .catch(error => {
                Animals.remove(req.body.animal_id)
                    .then(count => {
                        res.status(200).json({ message: `${count} record has been deleted` })
                    })
                    .catch(error => {
                        res.status(500).json({ message: "Error deleting animal", error: error.toString() })
                    })
                res.status(500).json({ message: "Error adding animal", error: error.toString() })
            })
    } else {
        res.status(400).json({ message: "please enter all required animal meta field" })
    }
})

function handlePictures(req, res, next) {
    if (Array.from(req.body.images).length) {
        // SL: Building in support for multiple images
        postPictures(req, res, next)
    } else {
        postPicture(req, res, next)
    }
}

function postPicture(req, res, next) {
    const pic = {
        animal_id: req.body.animal_id,
        img_url: req.body.image_url,
        img_id: req.body.profile_img_id
    }
    if (pic.animal_id && pic.img_url && pic.img_id) {
        Pictures.add(pic)
            .then(pic => {
                if (pic)
                    next();
            })
            .catch(error => {
                Animals.remove(req.body.animal_id)
                    .then(count => {
                        res.status(200).json({ message: `${count} record has been deleted` })
                    })
                    .catch(error => {
                        res.status(500).json({ message: "Error deleting animal", error: error.toString() })
                    })
                res.status(500).json({ message: "Error adding picture", error: error.toString() })
            })
    } 
    else{
        res.status(400).json({ message: "please enter all required for picture" })
    }
}

function postPictures(req, res, next) {
    console.log(req.body.images)
    req.body.images.map(image => {
        const pic = {
            animal_id: req.body.animal_id,
            img_url: image.image_url,
            img_id: image.image_id
        }
        if (pic.animal_id && pic.img_url && pic.img_id) {
            Pictures.add(pic)
                .then(pic => {
                    if (pic && pic.img_id == req.body.images[req.body.images.length -1].image_id) 
                        next();
                })
                .catch(error => {
                    Animals.remove(req.body.animal_id)
                        .then(count => {
                            res.status(200).json({ message: `${count} record has been deleted` })
                        })
                        .catch(error => {
                            res.status(500).json({ message: "Error deleting animal", error: error.toString() })
                        })
                    res.status(500).json({ message: "Error adding picture", error: error.toString() })
                })
        }
        else {
            res.status(400).json({ message: "please enter all required for picture" })
        }
    })
}

//middleware to add animal
//It will check if all required fields are given and if it is will add the animal to the Animals table
function addAnimal(req, res, next) {
    const animal = {
        name : req.body.name, 
        shelter_id : req.body.shelter_id,
        species_id : req.body.species_id,
        animal_status_id : req.body.animal_status_id,
        shelter_location_id : req.body.shelter_location_id,
        profile_img_id : req.body.profile_img_id
    }

    if(animal.name && 
        animal.shelter_id && 
        animal.species_id && 
        animal.animal_status_id && 
        animal.shelter_location_id && 
        animal.profile_img_id) {
            Animals.add(animal)
            .then( id => {
                req.body.animal_id = id[0]
                next();
            })
            .catch ( error => {
                res.status(500).json({ message: "Error adding animal", error: error.toString()})
            })
        } else {
            res.status(400).json({message: "add animal: please enter all required animal field"})
        }

}

//middleware to validate animal Id
function validateAnimalId(req, res, next) {
    if (req.params.id) {
        Animals.getById(req.params.id)
            .then(animal => {
                if (animal) {
                    next();
                } else {
                    res.status(404).json({message: "No animal by that animal id"})
                }
            })
            .catch(error => {
                res.status(500).json({ message: "Error getting valid animal", error: error.toString() })
            })
    }
}

//middleware to validate animal meta Id
function validateMetaId(req, res, next) {
    if (req.params.id) {
        AnimalMeta.getById(req.params.id)
            .then(animal => {
                if (animal) {
                    next();
                } else {
                    res.status(404).json({message: "No animal by that animal meta id"})
                }
            })
            .catch(error => {
                res.status(500).json({ message: "Error getting valid animal meta", error: error.toString() })
            })
    }
}

//middleware to validate animal admin Id
function validateAdminId(req, res, next) {
    if (req.params.id) {
        AnimalAdmin.getById(req.params.id)
            .then(admin => {
                if (admin) {
                    next();
                } else {
                    res.status(404).json({message: "No admin by that animal admin Id" })
                }
            })
            .catch(error => {
                    res.status(500).json({message: "Error getting valid admin", error: error.toString() })
            })
    }
}

//Middleware to verify that there is animalId and userId match
function getMatchAnimalUser (req, res, next) {
    AnimalFollows.findMatch(req.params.animalId, req.params.userId)
    .then(match => {
        if(match) {
            next()
        } else {
            res.status(404).json({message: 'No match found'})
        }
    })
    .catch (error => {
        res.status(500).json({message: "Error accessing database", error: error.toString()})
    })
}

//middleware to validate shelter Id
function validateShelterId (req, res, next) {
    Shelter.getById(req.params.id)
        .then(shelter => {
            if (shelter) {
                next();
            } else {
                res.status(404).json({message: "No shelter by that shelter Id exists"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error getting valid shelter id", error: error.toString() })
        })
}
module.exports = router;
