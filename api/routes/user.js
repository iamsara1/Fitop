const User = require("../models/User");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const {updateUser, deleteUser, getUser, getAllUsers, getUserStats} = require("../controllers/user");
const {getAllOrders} = require("../controllers/order");

const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin,getUserStats); 

module.exports = router;
