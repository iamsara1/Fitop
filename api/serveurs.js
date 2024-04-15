const express = require("express");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const panierRoute = require("./routes/panier");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const newsLetter = require("./routes/newsLetter");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const app = express();


    app.use(cors());
    app.use(express.json());
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/products", productRoute);
    app.use("/api/panier", panierRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/checkout", stripeRoute);
    app.use("/api/newsletter", newsLetter);
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    

module.exports = app;
