const router = require('express').Router();

const Dashboard = require('../models/dashboard/dashboard.js');
const verifyToken = require('../middleware/verifyToken.js');



//get user dashboard aggregated data

router.get('/user/:id', (req, res) => {
    Dashboard.getUserDashboard(req.params.id)
    .then( results => {
        if(results) {
                    res.status(200).json(results)
        } else {
            res.status(400).json({message: "no application found"})
        }
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting dashboard data", error: error.toString() })
    })
})



//get shelter dashboard aggregated data

router.get('/:id', (req, res) => {
        Dashboard.getDashboard(req.params.id)
        .then( count => {
            res.status(200).json(count)
        })
        .catch( error => {
            res.status(500).json({ message: "Error getting dashboard data", error: error.toString() })
        })
})



//get dog count
router.get('/:id/animalCounts', (req, res) => {
    Dashboard.getAnimalCount(req.params.id) 
    .then( count => {
        res.status(200).json(count)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting dog count", error: error.toString() })

    })
})

router.get('/:id/monthlyDonations', (req, res) => {
    Dashboard.getDonationsByMonth(req.params.id)
    .then( result => {
        res.status(200).json(result)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting donations", error: error.toString() })

    })
})

router.get('/:id/monthlyApplications', (req, res) => {
    Dashboard.getApplicationsByMonth(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting applications", error: error.toString() })

    })
})

router.get('/:id/followers', (req, res) => {
    Dashboard.getFollowerCounts(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting followers"})
    })
})

router.get('/:id/applications', (req, res) => {
    Dashboard.getRecentApplications(req.params.id) 
    .then(result => {
        res.status(200).json(result)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting applications", error: error.toString() })
    })
})

router.get('/:id/randomAnimals', (req, res) => {
    Dashboard.getAnimals(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting random animals", error: error.toString() })
    })
})

router.get('/:id/recentDonations', (req, res) => {
    Dashboard.getDonations30Days(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting recent donations", error: error.toString() })
    })
})

router.get('/:id/recentApplications', (req,res) => {
    Dashboard.getApplication30Days(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch( error => {
        res.status(500).json({ message: "Error getting applications", error: error.toString() })
    })
})

module.exports = router;