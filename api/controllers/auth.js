const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


exports.inscrire = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    lastname: req.body.lastname,
    password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
    ).toString(),
  });
  newUser.save().then((savedUser) => {
    const accessToken = jwt.sign(
        {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
    );
    res.status(201).json({...savedUser._doc,accessToken});
  })
      .catch((err) => res.status(500).json(err));
};

exports.connexion = (req, res) => {
  User.findOne({ email: req.body.email })
    .then ((user) => {
      if (!user) {
        res.status(401).json("Wrong credentials!");
      } else {
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (OriginalPassword !== req.body.password) {
          res.status(401).json("Wrong credentials!");
        } else {
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
          );
          const { password, ...others } = user._doc;
          res.status(200).json({ ...others, accessToken });
        }
      }
    })
    .catch((err) => res.status(500).json(err));
};
