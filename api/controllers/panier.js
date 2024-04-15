const Panier = require("../models/Panier");

exports.creerPanier = (req, res) => {
    const panier = new Panier(req.body);
    panier.save().then(
        panier => res.status(200).json(panier)
    ).catch(err => res.status(500).json(err))
}


exports.majPanier = (req, res) => {
    Panier.updateOne({userId:req.params.userId}, {$set: req.body,}, {new: true}
    ).then(panier => res.status(200).json(panier)
    ).catch(err => res.status(500).json(err))
}


exports.seulPanier = (req, res) => {
    Panier.findOne({userId: req.params.userId}).then(
        panier => res.status(200).json(panier)
    ).catch(
        err => res.status(500).json(err)
    )
}

