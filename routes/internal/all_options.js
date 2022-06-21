const router = require("express").Router();
const AllOptions = require('../../models/internal-tables/all_options')


router.get("/:id", (req, res) => {
    AllOptions.getAllOptions(req.params.id)
      .then(options => {
        res.status(200).json(options);
      })
      .catch(error => {
        res.status(500).json({ error: `Can not access the database` });
      });
  });

  module.exports = router;

