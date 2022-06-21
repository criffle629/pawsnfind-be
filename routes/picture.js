const router = require("express").Router();
const pictures = require("../models/pictures/pictures");
const animals = require("../models/animals/animals");
const formidable = require("formidable");
const fs = require("fs");
const request = require("request");

router.get("/:id", (req, res) => {
  pictures
    .getById(req.params.id)
    .then(picture => {
      if (picture) res.status(200).json(picture);
      else res.status(404).json({ message: "Image not found" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Error retrieving picture. " + error.toString() });
    });
});

router.get("/image/:id", (req, res) => {
  pictures
    .getByImgId(req.params.id)
    .then(picture => {
      if (picture) res.status(200).json(picture);
      else res.status(404).json({ message: "Image not found" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Error retrieving picture. " + error.toString() });
    });
});

router.get("/animal/:id", validateAnimalId, (req, res) => {
  pictures
    .getByAnimalId(req.params.id)
    .then(pictures => {
      if (pictures.length > 0) res.status(200).json(pictures);
      else res.status(404).json({ message: "No images found" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Error retrieving pictures. " + error.toString() });
    });
});

router.delete("/image/:id", validateImageAPI_Id, async (req, res) => {
  let formData = {
    api_key: process.env.image_api_key,
    image_id: req.params.id
  };

  await request.post(
    {
      url: process.env.delete_url,
      formData,
 
      header: { "Content-type": "application/json" }
    },
    async (err, httpResponse, body) => {
      if (err || httpResponse.statusCode === 400 || httpResponse === 500) {
        res.status(400).json(body);
        return;
      } else {
        body = JSON.parse(body);
        pictures.remove(req.params.id).then(response => {
          if (response) res.status(200).json(body);
          else res.status(400).json({ error: "Error deleting image" });
        });
      }
    }
  );
});
router.post("/", async (req, res) => {
  const form = new formidable.IncomingForm().parse(
    req,
    async (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        throw err;
      }
      const formData = {
        api_key: process.env.image_api_key,
        image: fs.createReadStream(files.image.path)
      };
      await request.post(
        {
          url: process.env.upload_url,
          formData,
          header: { "Content-type": "multipart/form-data" }
        },
        async (err, httpResponse, body) => {
          if (err || httpResponse === 400 || httpResponse === 500) {
            res.status(400).json({ error: "Error uploading image " + err });
          } else {
            body = JSON.parse(body);
            const newPic = {
          
              img_id: body.image_id,
              img_url: body.url
            };
 
              res.status(200).json(body);
        
          }
        }
      );
    }
  );
});

router.post("/animal/:id", validateAnimalId, async (req, res) => {
    const form = new formidable.IncomingForm().parse(
  req,
    async (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        throw err;
      }
      const formData = {
        api_key: process.env.image_api_key,
        image: fs.createReadStream(files.image.path)
      };
      await request.post(
        {
          url: process.env.upload_url,
          formData,
          header: { "Content-type": "multipart/form-data" }
        },
        async (err, httpResponse, body) => {
          if (err || httpResponse === 400 || httpResponse === 500) {
            res.status(400).json({ error: "Error uploading image " + err });
          } else {
            body = JSON.parse(body);
            const newPic = {
              animal_id: req.params.id,
              img_id: body.image_id,
              img_url: body.url
            };
            pictures.add(newPic).then(response => {
              if (response) res.status(200).json(body);
              else 
              res.status(400).json({ error: "Error uploading image" });
            });
          }
        }
      );
    }
  );
});



function validateAnimalId(req, res, next) {
  if (req.params.id) {
    animals
      .getById(req.params.id)
      .then(animal => {
        if (animal) next();
        else res.status(404).json({ error: "Animal not found" });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "Error getting animal " + error.message });
      });
  } else res.status(400).json({ error: "No animal id" });
}

function validateImageAPI_Id(req, res, next) {
  if (req.params.id) {
    pictures
      .getByImgId(req.params.id)
      .then(picture => {
        if (picture) {
          next();
        } else {
          res
            .status(404)
            .json({ message: `No api image found by id: ${req.params.id}` });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "Error getting api image " + error.message });
      });
  } else res.status(400).json({ error: "No api image id" });
}

module.exports = router;
