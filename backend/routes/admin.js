var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const { loggedIn, adminOnly } = require('../helper/authMiddleware');
const upload = require('../configurations/uploads');

router.get('/allUsers', loggedIn, adminOnly, adminController.allUsers);
router.get('/allChildren', loggedIn, adminOnly, adminController.allChildren);

router.post('/changeCenterData', loggedIn, adminOnly, adminController.changeCenterData);
router.post('/addNewUser', loggedIn, adminOnly, upload.single('file'), adminController.addNewUser);
router.post('/addChild', loggedIn, adminOnly, upload.single('file'), adminController.addChild);
router.post('/addChild', loggedIn, adminOnly, upload.single('file'), adminController.addChild);
router.post('/saveAndSendSchedule', loggedIn, adminOnly, adminController.saveAndSendSchedule);

module.exports = router;