const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { creerPanier,majPanier,seulPanier} = require("../controllers/panier");

const router = require("express").Router();


router.post("/", creerPanier);
router.put("/:userId", majPanier);
router.get("/find/:userId", seulPanier);


module.exports = router;
