const router = require("express").Router();
const Age = require("../../models/internal-tables/ages");

router.get("/", (req, res) => {
  Age.getAll()
    .then(ages => {
      res.status(200).json(ages);
    })
    .catch(error => {
      res.status(500).json({ message: `Can not access the database`, error: error.toString()});
    });
});

router.get("/:id", verifyId, (req, res) => {
  Age.getById(req.params.id)
    .then(age => {
      res.status(200).json(age);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the age by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  Age.add(req.body)
    .then(age => {
      res.status(200).json(age);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not add age` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Age.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record has been deleted` });
    })
    .catch(error => {
      res.status(500).json({ message: `Can not delete this record`, error: error.toString()});
    });
});

router.put("/:id", verifyId, (req, res) => {

  const age = req.body

  Age.update(req.params.id, req.body)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully updated`, age });
    })
    .catch(error => {
      res.status(500).json({ message: `Can not update age`, error: error.toString() });
    });
});

// Middleware

function verifyId(req, res, next) {
  if (req.params.id) {
    Age.getById(req.params.id) 
    .then(age => {
      if (age) {
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
  if(req.body.age) {
    next()
  } else {
    res.status(400).json({ error: `Please provide valid input`})
  }
}
module.exports = router;