const router = require("express").Router();
const Search = require('../models/search/search.js');
const zipcode = require("zipcodes");


 
router.post('/advancedSearch', getAdvancedZips, (req, res) => {
 
    const searchObj = {
        is_male : req.body.is_male,
        species_id : req.body.species_id,
        breed_id : req.body.breed_id,
        size_id : req.body.size_id,
        age_id : req.body.age_id,
        coat_length_id : req.body.coat_length_id,
        zips : req.body.zips
    }

    Search.advancedSearch(searchObj)
    .then(animals => {
        const perPage = 20
        const totalCount = Math.ceil(animals.length / perPage)
        let currentPage = parseInt(req.body.page) || 1
        const searchPageDetail = {
            animals: animals.slice(perPage * (currentPage - 1), (perPage * (currentPage  - 1) + perPage)),
            paginationDetails: {
                totalCount: totalCount || 1,
                currentPage: currentPage || 1,
            }
        }
        res.status(200).json(searchPageDetail)
    })
    .catch( error => {
        res.status(500).json({message: "Error with search", error : error.toString()})
    })
})

router.post('/initialSearch', getZips, (req,res) => {
    const searchObj = {species_id : req.body.species_id, zips : req.body.zips}
    Search.initialSearch(searchObj)
    .then(animals => {
        res.status(200).json(animals)
    })
    .catch( error => {
        res.status(500).json({message: "Error with search", error : error.toString()})
    })
})

//still need to verify for valid zipcode
function getZips( req, res, next) {
    if(req.body.zipcode) {
       const zips = zipcode.radius(req.body.zipcode, req.body.radius)
    //    zips.slice(0,100)
       req.body.zips = zips.slice(0,100) // limit to 100 zipcodes
       next();
    } else {
        res.status(400).json({message: "please provide a zipcode"})
    }
}

function getAdvancedZips( req, res, next) {
    if(req.body.zipcode) {
        const radius = req.body.radius 
        delete req.body["radius"]
        const zips = zipcode.radius(req.body.zipcode, radius)
        if(zips.length) {
            req.body.zips = zips.slice(0,100) // limit to 100 zipcodes
        } else {
            req.body.zips = [req.body.zipcode]
        }
       next();
    } else {
        req.body.zips = []
        next()
    }
}

module.exports = router;
