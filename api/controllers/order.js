const Order = require("../models/Order");


exports.createOrder = (req, res) => {
    const newOrder = new Order(req.body);
    newOrder.save().then(
        savedOrder => res.status(200).json(savedOrder)
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.updateOrder = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, {$set: req.body,}, {new: true}).then(
        updatedOrder => res.status(200).json(updatedOrder)
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(
        res.status(200).json("Order has been deleted...")
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.getOneUserOrders = (req, res) => {
    Order.find({userId: req.params.userId}).then(
        orders => res.status(200).json(orders)
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.getAllOrders = (req, res) => {
    Order.find().then(
        orders => res.status(200).json(orders)
    ).catch(
        err => res.status(500).json(err)
    )
}

exports.getMonthlyIncome = (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    Order.aggregate([
        {
            $match: {
                createdAt: {$gte: previousMonth},
                ...(productId && {
                    products: {$elemMatch: {productId}},
                }),
            },
        },
        {
            $project: {
                month: {$month: "$createdAt"},
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: {$sum: "$sales"},
            },
        },
    ]).then(
        income => res.status(200).json(income)
    ).catch(
        err => res.status(500).json(err)
    )
}