var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authenticatedController = require('../controllers/authenticatedController');
const { loggedIn } = require('../helper/authMiddleware');

router.get('/emailValidation', userController.emailValidation);
router.get('/login', userController.login);
router.get('/data', loggedIn, authenticatedController.data);

module.exports = router;