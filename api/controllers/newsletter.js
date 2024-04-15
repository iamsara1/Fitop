const Mail = require("../models/NewsLetter");


exports.addMail = (req, res) => {
    const newMail = new Mail(req.body);

    newMail.save().then(
        savedMail => res.status(200).json(savedMail)
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.getAllMail = (req, res,next) => {

    Mail.find().then(mails =>{ 
        req.mails = mails;
        next();
    })
        .catch(err => res.status(500).json(err))
    
}