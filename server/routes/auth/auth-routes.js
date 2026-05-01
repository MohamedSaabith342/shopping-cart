const express = require("express");
const { registerUser, loginUser } = require("../../controllers/auth/auth-controller");

const router = express.Router();
console.log("Auth router loaded");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
