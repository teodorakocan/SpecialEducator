var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authenticatedController = require('../controllers/authenticatedController');
const { loggedIn } = require('../helper/authMiddleware');
const upload = require('../configurations/uploads');

router.get('/emailValidation', userController.emailValidation);
router.get('/login', userController.login);
//all authenticated user
router.get('/data', loggedIn, authenticatedController.data);
router.post('/changeData', loggedIn, authenticatedController.changeData);
router.post('/changePassword', loggedIn, authenticatedController.changePassword);
router.post('/changeImage', loggedIn, upload.single('file'), authenticatedController.changeImage);

module.exports = router;