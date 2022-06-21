const router = require("express").Router();
const Donations = require('../models/donations/donations.js')

 

router.get('/dashboardData/:id', (req, res) => {
    Donations.getDonationDashboardData(req.params.id)
    .then(donations => {
        res.status(200).json(donations)
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting donations", err: err.toString()})

    })
})

router.get('/', (req, res) => {
    Donations.getAllDonations()
    .then(donations => {
        res.status(200).json(donations)
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting donations", err: err.toString()})
    })
})

router.get('/:id', (req, res)=> {

 
    const { id } = req.params;
    if (typeof id !== 'number')
    {
        res.status(400).json({ message:'No donation id '})
    }
 
        Donations.getDonationbyId(id)
        .then(donation => {
            if (donation){
            res.status(200).json(donation)
            } else { 
                res.status(404).json({ message:'id cannot be found '})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting donation", err: err.toString() })
            })

})

router.get('/user/:id', (req, res)=> {

    const { id } = req.params;

    if (!id){
        res.status(400).json({ message:'No user id '})
    }

    Donations.getDonationsByUser(id)
    .then(donation => {
        if (donation){
            res.status(200).json(donation)
            } else { 
                res.status(404).json({ message:'id cannot be found '})
            }
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting donation", err: err.toString() })
    })
})

router.get('/shelter/:id', (req, res)=> {

    const { id } = req.params;
    if (!id){
        res.status(400).json({ message:'No shelter id '})
    }
    Donations.getDonationsByShelter(id)
    .then(donation => {
        if (donation.length > 0){
            res.status(200).json(donation)
            } else { 
                res.status(404).json({ message:'id cannot be found '})
            }
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting donation", err: err.toString() })
    })
})

router.post('/', (req, res) => {
    
    const { user_id, shelter_id, amount } = req.body

    if( req.body.user_id && req.body.shelter_id && req.body.amount){

        Donations.addDonation({ user_id, shelter_id, amount })
        .then(donation => {
            res.status(201).json({ message: "Successfully donated", donation})
        })
        .catch(err => {
            res.status(500).json({ message: "Error donating", err: err.toString() })
        })    
    } else {
        res.status(400).json({ message: 'Required fields are incomplete' })
    }
})

router.put('/:id', (req, res ) => {

    const { id } = req.params
    const { user_id, shelter_id, amount } = req.body
    
    Donations.updateDonation(id, { user_id, shelter_id, amount } )
    .then(donation => {
        if (donation){
        res.status(200).json({ message: "Successfully updated", donation})
        } else {
            res.status(404).json({ message: "id cannot be found"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting updated", err: err.toString() })
    })

})

module.exports = router;