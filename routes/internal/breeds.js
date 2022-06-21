const router = require("express").Router();
const Breeds = require("../../models/internal-tables/breeds");
const Species = require('../../models/internal-tables/species')

router.get("/", (req, res) => {
  Breeds.getAll()
    .then(breeds => {
      res.status(200).json(breeds);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  Breeds.getById(req.params.id)
    .then(breed => {
      res.status(200).json(breed);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the breed by id` });
    });
});

router.get("/species/:id", verifySpeciesId, (req, res) => {
  Breeds.getBySpeciesId(req.params.id)
    .then(breeds => {
      res.status(200).json(breeds);
    })
    .catch(error => {
      res.status(500).json({ error: `Could not get breeds` });
    });
});

router.post("/", verifyInputs, (req, res) => {
  Breeds.add(req.body)
    .then(breed => {
      res.status(200).json(breed);
    })
    .catch(error => {
      res.status(500).json({ error: `Could not add breed` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Breeds.update(req.params.id, req.body)
    .then(breed => {
      res.status(200).json({ message: `${breed} record successfully updated` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update breed` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Breeds.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record was successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete this record` });
    });
});

// Middleware

function verifyId(req, res, next) {
  if (req.params.id) {
    Breeds.getById(req.params.id) 
    .then(breed => {
      if (breed) {
        next()
      } else {
        res.status(404).json({ message: `No record found with this id`})
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access database`})
    })
  }
}

function verifySpeciesId(req, res, next) {
  if (req.params.id) {
    Species.getById(req.params.id) 
    .then(species => {
      if (species) {
        next()
      } else {
        res.status(404).json({ message: `No record found with this id`})
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access database`})
    })
  }
}

function verifyInputs(req, res, next){
  if (req.body.species_id && req.body.breed) {
    next()
  } else {
    res.status(400).json({ error: `Please provide valid inputs`})
  }
}
module.exports = router;
