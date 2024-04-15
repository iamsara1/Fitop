const router = require("express").Router();
const {inscrire, connexion} = require("../controllers/auth");


router.post("/inscrire", inscrire);
router.post("/login",connexion );

module.exports = router;
