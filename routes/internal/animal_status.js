const router = require("express").Router();
const Animal_status = require("../../models/internal-tables/animal_status");

router.get("/", (req, res) => {
  Animal_status.getAll()
    .then(status => {
      res.status(200).json(status);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  Animal_status.getById(req.params.id)
    .then(status => {
      res.status(200).json(status);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the status by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  Animal_status.add(req.body)
    .then(status => {
      res.status(200).json(status);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not add status` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Animal_status.update(req.params.id, req.body)
    .then(status => {
      res.status(200).json({ message: `${status} record successfully updated` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update status` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Animal_status.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete this status` });
    });
});

// Middleware
function verifyId(req, res, next) {
  if (req.params.id) {
    Animal_status.getById(req.params.id) 
    .then(status => {
      if (status) {
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
  if(req.body.animal_status) {
    next()
  } else {
    res.status(400).json({ error: `Please provide valid input`})
  }
}
module.exports = router;
