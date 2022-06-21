const router = require("express").Router();

const shelter = require("../models/shelters/shelters.js");
const Donations = require('../models/donations/donations.js')

const bodyParser = require("body-parser");
const axios = require("axios");

function getToken(req, res, next) {
  req.data = req.body.data;
  req.body = req.body.token;
  next();
}

function getAccountID(req, res, next) {
  shelter
    .getAccountID(req.data.shelter_id)
    .then(result => {
      if (result) {
        req.account_id = result.account_id;
        next();
      } else {
        console.log("No account ", result);
        res.status(400).json({ error: "Error retrieving account id" });
      }
    })
    .catch(err => {
    console.log(err);
      res.status(500).json({ error: "Error retrieving account id" });
    });
}

router.post(
  "/donate",
  getToken,
  getAccountID,
  bodyParser.text(),
  async (req, res) => {
      const stripe = require("stripe")(process.env.stripe_secret);
    const user_id = req.data.user_id;
    const shelter_id = req.data.shelter_id;
    const amount = req.data.amount / 100;
    try {
   
      await stripe.charges
        .create({
          amount: req.data.amount,
          currency: "usd",
          description: "An example charge",
          source: req.body,
          transfer_data: {
            destination: req.account_id
          }
        })
        .then(result => {
          
          Donations.addDonation({ user_id, shelter_id, amount})
        .then(response => {
              console.log(response);
              res.status(200).json(result);
          })
        
      
        });
    } catch (err) {
      console.log(err);
      console.log(req.data);
      console.log(req.body);
      res.status(500).json({ error: "Error, could not donate" });
    }
  }
);

async function createCustomer(req, res, next) {
  const key = process.env;
  const stripe = require("stripe")(process.env.stripe_secret);

  const shelterObj = await shelter.getById(req.body.shelterID);

  try {
    stripe.customers.create(
      {
        address: {
          line1: req.body.address1,
          line2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          postal_code: req.body.zip
        },
        email: shelterObj.email,
        name: shelterObj.name,
        phone: shelterObj.phone,
        tax_exempt: "exempt"
      },
      function(err, customer) {
        if (err) {
          res.status(400).json({ error: "Error creating customer" });
          return;
        } else req.customer = customer;

        next();
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error creating customer" });
  }
}

async function createAccount(req, res, next) {
  const stripe = require("stripe")(process.env.stripe_secret);
  const shelterObj = await shelter.getById(req.body.shelterID);
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;

  try {
    stripe.accounts.create(
      {
        type: "custom",
        country: "US",
        email: shelterObj.email,
        requested_capabilities: ["card_payments"],
        business_type: "company",
        business_profile: {
          mcc: 8398,
          product_description: "Animal rescue"
        },
        company: {
          address: {
            line1: req.body.address1,
            line2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            postal_code: req.body.zip
          },
          name: shelterObj.name,
          phone: shelterObj.phone,
          tax_id: shelterObj.EIN
        },
        tos_acceptance: {
          date: Math.floor(new Date() / 1000),
          ip: ip
        }
      },
      function(err, account) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        } else {
          req.body.account = account;
          next();
          return;
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error creating account" });
  }
}

function createBankAccount(req, res, next) {
  const stripe = require("stripe")(process.env.stripe_secret);

  try {
    stripe.customers.createSource(
      req.customer.id,
      {
        source: req.body.bankToken
      },
      function(err, bank_account) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        } else {
          req.body.bank = bank_account;
          next();
          return;
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error creating account" });
  }
}

async function createPerson(req, res, next) {
  const stripe = require("stripe")(process.env.stripe_secret);

  try {
    stripe.accounts.createPerson(
      req.body.account.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: {
          line1: req.body.address1,
          line2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          postal_code: req.body.zip
        },
        email: req.body.email,
        phone: req.body.phone,
        ssn_last_4: req.body.ssn_last_4,
        relationship: {
          account_opener: true,
          owner: true,
          percent_ownership: 100,
          title: "Owner"
        },
        dob: {
          day: req.body.dob_day,
          month: req.body.dob_month,
          year: req.body.dob_year
        },
        verification: {
          document: {
            front: req.body.frontImage,
            back: req.body.backImage
          }
        }
      },
      function(err, bank_account) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        } else {
          req.body.bank = bank_account;
          next();
          return;
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error creating account" });
  }
}

async function checkShelterAccount(req, res, next) {
  await shelter
    .getAccountID(req.body.shelterID)
    .then(async result => {
      if (result) {
        await shelter
          .deleteAccount(req.body.shelterID)
          .then(result => {
            next();
          })
          .catch(err => {
            next();
          });
      }
      else
        next();
    })
    .catch(err => {
      next();
    });
}
router.post(
  "/account",
  createCustomer,
  createBankAccount,
  createAccount,
  createPerson,
  checkShelterAccount,
  async (req, res) => {
    const stripe = require("stripe")(process.env.stripe_secret);

    const shelterObj = await shelter.getById(req.body.shelterID);

    stripe.tokens.create(
      {
        bank_account: {
          country: "US",
          currency: "usd",
          routing_number: req.body.routing_number,
          account_number: req.body.account_number,
          account_holder_name: shelterObj.name,
          account_holder_type: "individual"
        }
      },
      async function(err, token) {
        try {
          await stripe.accounts.createExternalAccount(
            req.body.account.id,
            {
              external_account: token.id
            },
            async function(err, external_account) {
              if (err) {
                res.status(400).json({ error: err });
                 
              } else {
                await shelter
                  .addAccountID({
                    shelter_id: req.body.shelterID,
                    account_id: req.body.account.id
                  })
                  .then(result => {
                    if (result) 
                    res.status(200).json({ success: result.rowCount });
                    else
                      res.status(400).json({ error: "Error adding account id" });
                  })
                  .catch(err => {
                    res.status(500).json({ error: "Error adding account id" });
                  });

               
              }
            }
          );
        } catch (err) {
          res.status(500).json({ error: "Error linking bank account" });
        }
      }
    );
  }
);

router.get("/account/:shelter_id", (req, res) => {

  shelter
  .getAccountID(req.params.shelter_id)
  .then(result => {
    if (result) 
        res.status(200).json({message: 'Has a stripe account'});
      else 
        res.status(404).json({ message: "No stripe account" });
  })
  .catch(err => {
    res.status(500).json({ error: "Error retrieving account id" });
  });

});

module.exports = router;
