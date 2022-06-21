const router = require("express").Router();
const Species = require("../../models/internal-tables/species");

router.get("/", (req, res) => {
  Species.getAll()
    .then(species => {
      res.status(200).json(species);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not get species from database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  Species.getById(req.params.id)
    .then(species => {
      res.status(200).json(species);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the species by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  Species.add(req.body)
    .then(species => {
      res.status(200).json(species);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not add species` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Species.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete species` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Species.update(req.params.id, req.body)
    .then(species => {
      res
        .status(200)
        .json({ message: `${species} record successfully updated` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update species` });
    });
});

// Middleware
function verifyId(req, res, next) {
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

  function verifyInput(req, res, next) {
    if(req.body.species) {
      next()
    } else {
      res.status(400).json({ error: `Please provide valid input`})
    }
  } 

module.exports = router;
