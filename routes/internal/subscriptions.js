const router = require("express").Router();
const Subscriptions = require("../../models/internal-tables/subscriptions");

router.get("/", (req, res) => {
  Subscriptions.getAll()
    .then(subscriptions => {
      res.status(200).json(subscriptions);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not get subscriptions from database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  Subscriptions.getById(req.params.id)
    .then(subscription => {
      res.status(200).json(subscription);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the subscription by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  Subscriptions.add(req.body)
    .then(sub => {
      res.status(200).json(sub);
    })
    .catch(error => {
      res.status(500).json({ message: `Can not add subscription`, error: error.toString()});
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Subscriptions.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete subscription` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Subscriptions.update(req.params.id, req.body)
    .then(subscription => {
      res.status(200).json({ message: `${subscription} record successfully updated successfully` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update subscription` });
    });
});

// Middleware
function verifyId(req, res, next) {
    if (req.params.id) {
      Subscriptions.getById(req.params.id) 
      .then(subscription => {
        if (subscription) {
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
    if(req.body.subscription && req.body.subscription_duration_mo && req.body.price) {
      next()
    } else {
      res.status(400).json({ error: `Please provide valid input`})
    }
  } 
module.exports = router;

