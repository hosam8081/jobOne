const express = require("express");

const router = express.Router();
const auth = require("../middleware/authentication");
const testUser = require('../middleware/test-user');

const {login, register, updateUser} = require("../controllers/auth")
router.route('/login').post(login);
router.route('/register').post(register);
router.patch('/updateUser', auth, testUser, updateUser);


module.exports = router