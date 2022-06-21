const router = require("express").Router();
const shelter = require('../models/shelters/shelters');

const axios = require('axios')

router.get('/validate/:ein', checkEIN, (req, res) => {

  const url = `https://projects.propublica.org/nonprofits/api/v2/organizations/${req.params.ein}.json`;
  axios
    .get(url)
     .then( response => {
      if (!response.data.organization)
          res.status(400).json({error: 'Invalid EIN'});
      else
          res.status(200).json(response.data.organization);
     })
     .catch(err => {
      res.status(400).json({error: 'Invalid EIN'});
     })
})

function checkEIN(req, res, next){

    if (!req.params.ein){
        res.status(400).json({error: 'No EIN provided'});
        return;
    }
    
    const parsed = parseInt(req.params.ein);
 
    if (isNaN(parsed) || String(parsed).length !== 9){
        res.status(400).json({error: 'Invalid EIN'});
        return;
    }
    
    shelter.getByEIN(req.params.ein)
    .then(response =>{
        if (!response)
            next();
        else
            res.status(400).json({error: 'EIN already exists'});
    })
    .catch(err =>
        {
            res.status(500).json({error: err.message});
        })
}

module.exports = router;