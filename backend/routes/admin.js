var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const { loggedIn, adminOnly } = require('../helper/authMiddleware');
const upload = require('../configurations/uploads');


router.get('/allUsers', loggedIn, adminOnly, adminController.allUsers);
router.get('/schedule', loggedIn, adminOnly, adminController.schedule);
router.get('/searchTeacher', loggedIn, adminOnly, adminController.searchTeacher);
router.get('/getTeacherData', loggedIn, adminOnly, adminController.getTeacherData);
router.get('/checkIfEstimateAllreadyExist', loggedIn, adminOnly, adminController.checkIfEstimateAllreadyExist);

router.post('/changeCenterData', loggedIn, adminOnly, adminController.changeCenterData);
router.post('/addNewUser', loggedIn, adminOnly, upload.single('file'), adminController.addNewUser);
router.post('/addChild', loggedIn, adminOnly, upload.single('file'), adminController.addChild);
router.post('/addChild', loggedIn, adminOnly, upload.single('file'), adminController.addChild);
router.post('/saveAndSendSchedule', loggedIn, adminOnly, adminController.saveAndSendSchedule);
router.post('/saveAndSendEstimate', loggedIn, adminOnly, adminController.saveAndSendEstimate);
router.post('/deleteEstimate', loggedIn, adminOnly, adminController.deleteEstimate);

module.exports = router;