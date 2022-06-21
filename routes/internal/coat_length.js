const router = require("express").Router();
const Coat_length = require("../../models/internal-tables/coat_length");

router.get("/", (req, res) => {
  Coat_length.getAll()
    .then(lengths => {
      res.status(200).json(lengths);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  Coat_length.getById(req.params.id)
    .then(length => {
      res.status(200).json(length);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the coat length by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  Coat_length.add(req.body)
    .then(length => {
      res.status(200).json(length);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not add coat length` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Coat_length.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete this record` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Coat_length.update(req.params.id, req.body)
    .then(length => {
      res.status(200).json({ message: `${length} record successfully updated` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update the coat length` });
    });
});

// Middleware
function verifyId(req, res, next) {
    if (req.params.id) {
      Coat_length.getById(req.params.id) 
      .then(length => {
        if (length) {
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
    if(req.body.coat_length) {
      next()
    } else {
      res.status(400).json({ error: `Please provide valid input`})
    }
  }
module.exports = router;