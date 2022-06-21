const router = require("express").Router();
const Subscription = require('../models/subscriptions/subscriptions.js')
const Shelter = require('../models/shelters/shelters.js')


function shelterValidation (req, res, next) {
    if (req.params.id) {
    Shelter.getById(req.params.id)
    .then(shelter => {
        if (shelter){
            next()
        } else {
            res.status(404).json({message: 'no shelter by that id' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting valid shelter", err: err.toString() })
    })

    } else {
        res.status(400).json({ message: "no shelter id"});
    }
} 

function subscriptionValidation (req, res, next) {
    if (req.params.id) {
    Subscription.getSubscriptionbyID(req.params.id)
    .then(subscription => {
        if (subscription){
            next()
        } else {
            res.status(404).json({message: 'no subscription by that id' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting valid subscription", err: err.toString() })
    })

    } else {
        res.status(400).json({ message: "no subscription id"});
    }
} 


router.get('/', (req, res) => {
    Subscription.getAllSubscriptions()
    .then(subs => {
        if (subs.length > 0){
            res.status(200).json(subs)
        } else {
            res.status(404).json({message: 'Not found'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting subscriptions", err: err.toString()})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id){
        res.status(400).json({ message: "no subscription id"});
    }
    Subscription.getSubscriptionbyID(id)
    .then(sub => {
        if(sub) {
        res.status(200).json(sub)
        } else {
            res.status(404).json({message: 'id cannot be found'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting subscription", err: err.toString()})   
     })
})

router.get('/shelter/:id', shelterValidation, (req, res) => {
    const { id } = req.params;

    Subscription.getSubscriptionbyShelter(id)
    .then(sub => {
        res.status(200).json(sub)
    })
    .catch(err => {
        res.status(500).json({ message: "Error getting subscription", err: err.toString()})
    })

})

router.get('/level/:id', (req ,res) =>{
    const { id } = req.params;

        Subscription.getSubscriptionbyLevel(id)
        .then(sub => {
            if (sub){
                res.status(200).json(sub)
            } else {
                res.status(404).json({message: 'id cannot be found'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting subscription", err: err.toString()})
        })
    })
    
    
router.post('/', (req, res) => {
    
    const { shelter_id, subscription_id, is_active } = req.body
    
    if (shelter_id && subscription_id  && is_active){
        Subscription.addSubscription({ shelter_id, subscription_id, is_active })
        .then(sub => {
            res.status(201).json({ message: "Successfully subscribed", sub})
        })
        .catch(err => {
            res.status(500).json({ message: "Error subscribing", err: err.toString() })
        })
    } else {
        res.status(400).json({ message: 'Required fields are incomplete' })
    }
        
})

router.put('/:id', subscriptionValidation, (req, res) => {
    
    const { id } = req.params
    const { shelter_id, subscription_id, expiration_date, is_active } = req.body
      
        Subscription.updateSubscription(id, { shelter_id, subscription_id, expiration_date, is_active })
        .then(sub => {
            if (req.params.id){
            res.status(200).json({ message: "Successfully updated", sub})
            } else {
                res.status(404).json({message: 'id cannot be found'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting updated", err: err.toString() })
        })
})

module.exports = router;