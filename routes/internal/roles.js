const router = require("express").Router();
const Roles = require("../../models/internal-tables/roles");

router.get("/", (req, res) => {
  Roles.getAll()
    .then(role => {
      res.status(200).json(role);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  Roles.getById(req.params.id)
    .then(role => {
      res.status(200).json(role);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the role by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  Roles.add(req.body)
    .then(role => {
      res.status(200).json(role);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not add role` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Roles.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete record` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Roles.update(req.params.id, req.body)
    .then(role => {
      res.status(200).json({ message: `${role} record successfully updated` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update role` });
    });
});

// Middleware
function verifyId(req, res, next) {
    if (req.params.id) {
      Roles.getById(req.params.id) 
      .then(role => {
        if (role) {
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
    if(req.body.role) {
      next()
    } else {
      res.status(400).json({ error: `Please provide valid input`})
    }
  } 

module.exports = router;