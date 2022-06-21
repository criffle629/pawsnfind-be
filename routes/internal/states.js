const router = require("express").Router();
const States = require("../../models/internal-tables/states");

router.get("/", (req, res) => {
  States.getAll()
    .then(states => {
      res.status(200).json(states);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not get states from database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  States.getById(req.params.id)
    .then(state => {
      res.status(200).json(state);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the state by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  States.add(req.body)
    .then(state => {
      res.status(200).json(state);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not add state` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  States.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete state` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  States.update(req.params.id, req.body)
    .then(state => {
      res.status(200).json({ message: `${state} record successfully updated` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update state` });
    });
});

// Middleware
function verifyId(req, res, next) {
    if (req.params.id) {
      States.getById(req.params.id) 
      .then(state => {
        if (state) {
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
    if(req.body.state) {
      next()
    } else {
      res.status(400).json({ error: `Please provide valid input`})
    }
  } 

module.exports = router;
