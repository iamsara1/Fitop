const User = require("../models/User");
const CryptoJS = require("crypto-js");

exports.updateUser = (req, res) => {
    if (req.body.password) {req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();}

    User.findByIdAndUpdate(req.params.id, {$set: req.body,}, {new: true}
    ).then(
        updatedUser => res.status(200).json(updatedUser)
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id).catch(
        res.status(200).json("User has been deleted...")
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.getUser = (req, res) => {
    User.findById(req.params.id).then(
        user => {
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        }
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.getAllUsers = (req, res) => {
    const query = req.query.new;
    const users = query ? User.find().sort({_id: -1}).limit(5) : User.find();
    users.then(
        users => res.status(200).json(users)
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.getUserStats = (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    User.aggregate([
        {$match: {createdAt: {$gte: lastYear}}},
        {
            $project: {
                month: {$month: "$createdAt"},
            },
        },
        {
            $group: {
                _id: "$month",
                total: {$sum: 1},
            },
        },
    ]).then(
        data => res.status(200).json(data)
    ).catch(
        err => res.status(500).json(err)
    )
}