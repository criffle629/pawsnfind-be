const router = require("express").Router();
const sgMail = require('@sendgrid/mail');

//send contact message
router.post('/', (req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'pawsnfind@gmail.com',
        from: req.body.email,
        subject: `Pawsnfind received a message from ${req.body.name}`,
        text: req.body.message,
    };

    sgMail.send(msg)
    .then( result => {
        res.status(200).json({message: "Your message was sent successfully!"})
    })
    .catch( error => {
        res.status(500).json({message: "There is an error sending your message."})
    });
})

router.post('/sendNotification', (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: req.body.shelterEmail,
        from: req.body.applicantEmail,
        subject: "You've received an application",
        text: `Hi ${req.body.shelter}! You've received an application from ${req.body.username} for ${req.body.animalName}! `
    };

    sgMail.send(msg)
    .then( result => {
        res.status(200).json({message: "message sent"})
    })
    .catch( error => {
        res.status(500).json({message: "error sending message"})
    });
})

module.exports = router;


