const router = require("express").Router();
const App = require("../models/applications/applications.js")
const Shelter = require("../models/shelters/shelters.js")
const User = require('../models/users/users.js')
const AppMeta = require("../models/application_meta/application_meta.js")
const AppAdmin = require('../models/application_admin/application_admin.js')

router.get('/', (req, res) => {
    App.getAll()
        .then(applications => {
            res.status(200).json(applications)
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting applications", error: error.toString() })
        })
})

//get prepopulated user and shelter info prior to the application process
router.get('/getMessageData/:userId/:shelterId/:animalId', (req, res) => {
    App.getUserShelterAnimalInfo(req.params.userId, req.params.shelterId, req.params.animalId)
    .then( results => {
        res.status(200).json(results)
    })
    .catch(error => {
        res.status(500).json({ message: "Error getting prePopulated data", error: error.toString() })
    })
})

//get an application
router.get('/:id', validateApplicationId, (req, res) => {

    res.status(200).json(req.application)

})

//get notes by application id
router.get('/:id/notes', validateApplicationId, (req, res) => {
    AppAdmin.getByApplicationId(req.params.id)
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting applications", error: error.toString() })
        })

})

//get notes by application id
router.get('/notes/:id', validateNoteId, (req, res) => {
    AppAdmin.getById(req.params.id)
        .then(note => {
            res.status(200).json(note)
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting applications", error: error.toString() })
        })
})

//get notes by an applications, admin id
router.get('/:id/admin/:shelterUserId', getMatch, (req, res) => {

    AppAdmin.getById(req.params.shelterUserId)
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting applications", error: error.toString() })
        })

})


router.get('/shelter/:id', validateShelterId, (req, res) => {
    App.getByShelterId(req.params.id)
        .then(applications => {
            res.status(200).json(applications)
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting applications", error: error.toString() })
        })
})

router.get('/user/:id', validateUserId, (req, res) => {
    App.getByUserId(req.params.id)
        .then(applications => {
            res.status(200).json(applications)
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting applications", error: error.toString() })
        })
})

//post notes for an application
router.post('/:id/note', validateApplicationId, (req, res) => {

    const application_admin = {
        notes: req.body.notes,
        application_id: req.params.id,
        shelter_user_id: req.body.shelter_user_id
    }

    if (application_admin.notes &&
        application_admin.shelter_user_id) {
        AppAdmin.add(application_admin)
            .then(note => {
                res.status(200).json(note)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Error adding notes", error: error.toString() })
            })
    }
    else {
        res.status(404).json({ message: 'Please enter all the required columns' })

    }

})

//update notes for an application
router.put('/note/:id', validateNoteId, (req, res) => {
    const application_admin = {
        notes: req.body.notes,

    }
    if (application_admin.notes) {

        AppAdmin.update(req.params.id, application_admin)
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(error => {
                res.status(500).json({ message: "Error updating notes", error: error.toString() })
            })
    }
    else {
        res.status(400).json({ message: 'Please enter all the required columns' })

    }
})

//delete notes for an application
router.delete('/note/:id', validateNoteId, (req, res) => {
    AppAdmin.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `Deleted ${count} row` })
            }
            else {
                res.status(404).json({ message: `Note ID ${req.params.id} not found` })

            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting notes", error: error.toString() })
        })
})

//update application status
router.put('/:id/status', validateApplicationId, (req, res) => {
    const applicationStatus = {

        application_status_id: req.body.application_status_id
    }

    if (applicationStatus.application_status_id) {
        App.update(req.params.id, applicationStatus)
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(error => {
            console.log("Middleware", error);
                res.status(500).json({ message: "Error updating application status", error: error.toString() })
            })
    }
    else {
        res.status(404).json({ message: 'Please enter all the required columns' })

    }

})

//add a new application
router.post('/', addApplication, (req, res) => {
    const application_meta = {
        application_id: req.body.application_id,
        name: req.body.name,
        street_address: req.body.street_address,
        city: req.body.city,
        state_id: req.body.state_id,
        zip: req.body.zip,
        home_phone: req.body.home_phone,
        email: req.body.email,
        cell_phone: req.body.cell_phone,
        is_over_18: req.body.is_over_18,
        is_homeowner: req.body.is_homeowner,
        is_in_agreement: req.body.is_in_agreement,
        is_homevisit_allowed: req.body.is_homevisit_allowed,
        is_fenced: req.body.is_fenced,
        ref_name_1: req.body.ref_name_1,
        ref_phone_1: req.body.ref_phone_1,
        ref_relationship_1: req.body.ref_relationship_1,
        ref_name_2: req.body.ref_name_2,
        ref_phone_2: req.body.ref_phone_2,
        ref_relationship_2: req.body.ref_relationship_2,
        is_declaration: req.body.is_declaration
    }

    AppMeta.add(application_meta)
        .then(id => {
            res.status(201).json(req.body.application_id)
        })
        .catch(error => {
            App.remove(req.body.application_id)
                .then(count => {
                    res.status(200).json({ message: `${count} record has been deleted` })
                })
                .catch(error => {
                    res.status(500).json({ message: "Error deleting applications", error: error.toString() })
                })
            res.status(500).json({ message: "Error getting applications", error: error.toString() })
        })
})

// if (req.body.application_id &&
//     req.body.name &&
//     req.body.street_address &&
//     req.body.city &&
//     req.body.state_id &&
//     req.body.zip &&
//     req.body.home_phone &&
//     req.body.email &&
//     req.body.is_over_18 &&
//     req.body.is_homeowner &&
//     req.body.is_in_agreement &&
//     req.body.is_homevisit_allowed &&
//     req.body.is_fenced &&
//     req.body.ref_name_1 &&
//     req.body.ref_phone_1 &&
//     req.body.ref_relationship_1 &&
//     req.body.ref_name_2 &&
//     req.body.ref_phone_2 &&
// req.body.ref_relationship_2 &&
//     req.body.is_declaration ) {
//         AppMeta.add(application_meta)
//         .then( id => {
//             res.status(201).json(id)
//         })
//         .catch( error => {
//             res.status(500).json({ message: "Error getting applications", error: error.toString()})
//         })
//     } else {
//         res.status(400).json({message: "please enter all required META field"})
//     }

// })



//middleware 

function addApplication(req, res, next) {
    const application = {
        animal_id: req.body.animal_id,
        shelter_id: req.body.shelter_id,
        application_status_id: req.body.application_status_id,
        user_id: req.body.user_id
    }
    if (application.animal_id && application.shelter_id && application.application_status_id && application.user_id) {
        App.add(application)
            .then(id => {
                req.body.application_id = id[0]
                next();
            })
            .catch(error => {
                res.status(500).json({ message: "Error getting applications", error: error.toString() })
            })
    } else {
        res.status(400).json({ message: "please enter all required APPLICATION field" })
    }

}

function validateApplicationId(req, res, next) {
    if (req.params.id && req.params.id !== "shelter" && req.params.id !== "user") {
        App.getById(req.params.id)
            .then(application => {
                if (application) {
                    req.application = application
                    next();
                } else {
                    res.status(404).json({ message: "Application not found" })
                }
            })
    } else {
        const subRoute = req.params.id === "shelter" ? "shelter" : req.params.id === "user" ? "user" : null
        res.status(500).json({ message: `no ${subRoute} id provided` })
    }
}

function validateShelterId(req, res, next) {
    console.log(req.params.id)
    if (req.params.id) {
        Shelter.getById(req.params.id)
            .then(shelter => {
                if (shelter) {
                    next();
                } else {
                    res.status(404).json({ message: "No shelter by that  shelter id" })
                }
            })
            .catch(error => {
                res.status(500).json({ message: "Error getting valid shelter with application", error: error.toString() })
            })
    } else {
        res.status(500).json({ message: "no shelter id", error: error.toString() })
    }
}

function validateUserId(req, res, next) {
    if (req.params.id) {
        User.getUserById(req.params.id)
            .then(user => {
                if (user) {
                    next();
                } else {
                    res.status(404).json({ message: "No user by that user id" })
                }
            })
            .catch(error => {
                res.status(500).json({ message: "Error getting valid shelter with application", error: error.toString() })
            })
    }

}

function validateNoteId(req, res, next) {
    if (req.params.id) {
        AppAdmin.getById(req.params.id)
            .then(note => {
                if (note) {
                    next()
                }
                else {
                    res.status(404).json({ message: "Note does not exists" })
                }
            })
            .catch(error => {
                res.status(500).json({ message: "Error getting valid note for the application", error: error.toString() })
            })
    }
}


function getMatch(req, res, next) {
    AppAdmin.findMatch(req.params.id, req.params.shelterUserId)
        .then(match => {
            if (match) {
                next()
            }
            else {
                res.status(404).json({ message: "No match found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error accessing the database", error: error.toString() })
        })
}

module.exports = router;
