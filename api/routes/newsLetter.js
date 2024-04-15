const router = require("express").Router();
const nodemailer = require("nodemailer");
const { addMail, getAllMail } = require("../controllers/newsletter");

router.post("/signup", addMail);

router.post("/send",getAllMail ,(req, res) => {

  members = req.mails.map(mail => mail.email).join(',');
  console.log(req.body);
  const run = async () => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: "ecomm.fitop@gmail.com", // generated ethereal user
          pass: "talbi123456789", // generated ethereal password
        },
      });

     await transporter.sendMail({
        from: "ecomm.fitop@gmail.com", // sender address
        bcc : members, // list of receivers
        subject: req.body.object, // Subject line
        text: req.body.text
      });
  };

    run()
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
