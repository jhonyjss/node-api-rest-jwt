const express = require('express');
const router = express.Router();

const usersController = require("../controllers/userController/index");
const loginController = require("../controllers/loginController/index");

router.get('/users', loginController.verifyJWT, usersController.getAllUsers)
router.post('/users', usersController.createUsers)
router.put('/users/:id', usersController.updateUsers)

/* LOGIN */
router.post('/login', loginController.userLogin)

module.exports = router;