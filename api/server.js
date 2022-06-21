const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const animalRouter = require("../routes/animals.js");
const applicationRouter = require("../routes/applications.js");
const donationRouter = require("../routes/donations.js");
const shelterRouter = require("../routes/shelters.js");
const subscriptionRouter = require("../routes/subscriptions.js");
const userRouter = require("../routes/users.js");
const authRouter = require('../routes/auth.js');
const einRouter = require('../routes/ein.js');
const dashboardRouter = require("../routes/dashboard.js")
const pictureRouter = require("../routes/picture");
const searchRouter = require("../routes/search.js");
 
const sendgridRouter = require("../routes/sendgrid.js");
 
const stripeRouter = require('../routes/stripe.js');
 

//internal routes
const iAgeRouter = require("../routes/internal/ages.js");
const iAnimalStatusRouter = require("../routes/internal/animal_status.js");
const iApplicationRouter = require("../routes/internal/application_status.js");
const iBreedsRouter = require("../routes/internal/breeds.js");
const iCoatLengthRouter = require("../routes/internal/coat_length.js");
const iRolesRouter = require("../routes/internal/roles.js");
const iSizeRouter = require("../routes/internal/size.js");
const iSpeciesRouter = require("../routes/internal/species.js");
const iStatesRouter = require("../routes/internal/states.js");
const iSubscriptionsRouter = require("../routes/internal/subscriptions.js");
const iOptionsRouter = require("../routes/internal/all_options.js")

server.use(helmet());
server.use(express.json()); 

server.use(cors());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use("/api/animals", animalRouter);
server.use("/api/applications", applicationRouter);
server.use("/api/donations", donationRouter);
server.use("/api/shelters", shelterRouter);
server.use("/api/subscriptions", subscriptionRouter);
server.use("/api/users", userRouter);

server.use("/api/auth", authRouter);
server.use("/api/ein", einRouter);
server.use('/api/dashboard', dashboardRouter)

server.use("/api/pictures", pictureRouter);
server.use("/api/search", searchRouter);
 
server.use("/api/sendgrid", sendgridRouter);
 
server.use("/api/stripe", stripeRouter);
 

//internal routes
server.use("/api/internal/paws/ages", iAgeRouter);
server.use("/api/internal/paws/animal_status", iAnimalStatusRouter);
server.use("/api/internal/paws/application_status", iApplicationRouter);
server.use("/api/internal/paws/breeds", iBreedsRouter);
server.use("/api/internal/paws/coat_length", iCoatLengthRouter);
server.use("/api/internal/paws/roles", iRolesRouter);
server.use("/api/internal/paws/size", iSizeRouter);
server.use("/api/internal/paws/species", iSpeciesRouter);
server.use("/api/internal/paws/states", iStatesRouter);
server.use("/api/internal/paws/subscriptions", iSubscriptionsRouter);
server.use("/api/internal/paws/options", iOptionsRouter)

server.get("/", (req, res) => {
  res.send("It's Working! PAWS UP!");
});

module.exports = server;
