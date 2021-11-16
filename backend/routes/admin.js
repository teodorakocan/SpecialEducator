var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const { loggedIn, adminOnly } = require('../helper/authMiddleware');
const upload = require('../configurations/uploads');

router.post('/changeCenterData', loggedIn, adminOnly, adminController.changeCenterData);
router.post('/addNewUser', loggedIn, adminOnly, upload.single('file'), adminController.addNewUser);
router.post('/addChild', loggedIn, adminOnly, upload.single('file'), adminController.addChild);

module.exports = router;