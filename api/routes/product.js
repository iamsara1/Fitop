const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {createProduct, updateProduct, deleteProduct, getAllProducts,getProduct} = require("../controllers/products");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, createProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProducts);



module.exports = router;
