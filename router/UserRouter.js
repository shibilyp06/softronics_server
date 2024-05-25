const express = require("express");
const router = express.Router();

const { signUp, login, accountDetails, deposit, withdrawal, checkBalance} = require("../controllers/UserControllers");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/accountDetails",accountDetails);
router.post("/deposit" , deposit)
router.post("/withdrawal" , withdrawal)
router.get("/checkBalance/:accountNumber" , checkBalance)

module.exports = router;
