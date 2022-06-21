const router = require("express").Router();
const Size = require("../../models/internal-tables/size");

router.get("/", (req, res) => {
  Size.getAll()
    .then(sizes => {
      res.status(200).json(sizes);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not get sizes from database` });
    });
});

router.get("/:id", verifyId, (req, res) => {
  Size.getById(req.params.id)
    .then(size => {
      res.status(200).json(size);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not access the size by id` });
    });
});

router.post("/", verifyInput, (req, res) => {
  Size.add(req.body)
    .then(size => {
      res.status(200).json(size);
    })
    .catch(error => {
      res.status(500).json({ error: `Can not add size` });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Size.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not delete size` });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Size.update(req.params.id, req.body)
    .then(size => {
      res.status(200).json({ message: `${size} record successfully updated` });
    })
    .catch(error => {
      res.status(500).json({ error: `Can not update size` });
    });
});

// Middleware
function verifyId(req, res, next) {
  if (req.params.id) {
    Size.getById(req.params.id)
      .then(size => {
        if (size) {
          next();
        } else {
          res.status(404).json({ message: `No record found with this id` });
        }
      })
      .catch(error => {
        res.status(500).json({ error: `Can not access database` });
      });
  }
}

function verifyInput(req, res, next) {
  if (req.body.size) {
    next();
  } else {
    res.status(400).json({ error: `Please provide valid input` });
  }
}

module.exports = router;
