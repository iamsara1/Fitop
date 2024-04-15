const mongoose = require("mongoose");

const PanierSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: [
            {
                _id: {
                    type: String,
                },
                img: {
                    type: String,
                },
                title: {
                    type: String,
                },
                quantite: {
                    type: Number,
                    default: 1,
                },
                color: {
                    type: String,
                },
                size: {
                    type: String,
                },
                price: {
                    type: Number,
                },
            },
        ],
        Total: {type: Number, default: 0},
        panierQuantity: {type: Number, default: 0},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Panier", PanierSchema);
