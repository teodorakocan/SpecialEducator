var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const { loggedIn } = require('../helper/authMiddleware');
const upload = require('../configurations/uploads');

//authenticated user
router.get('/userData', loggedIn, authController.userData);
router.get('/mySchedule', loggedIn, authController.mySchedule);
router.get('/allChildren', loggedIn, authController.allChildren);
router.get('/searchChild', loggedIn, authController.searchChild);
router.get('/getChildData', loggedIn, authController.getChildData);
router.get('/allTeachers', loggedIn, authController.allTeachers);

router.post('/changeUserData', loggedIn, authController.changeUserData);
router.post('/changePassword', loggedIn, authController.changePassword);
router.post('/changeImage', loggedIn, upload.single('file'), authController.changeImage);

//center
router.get('/centerData', loggedIn, authController.centerData);
router.get('/getTeacherRole', loggedIn, authController.getTeacherRole);

//dailyReport
router.get('/listOfChildsDailyReports', loggedIn, authController.listOfChildsDailyReports)
router.get('/checkIfDailyReportAllreadyExist', loggedIn, authController.checkIfDailyReportAllreadyExist)

router.post('/sendAndSaveDailyReport', loggedIn, authController.sendAndSaveDailyReport)
router.post('/deleteDailyReport', loggedIn, authController.deleteDailyReport)
router.post('/deleteMarkedDailyReports', loggedIn, authController.deleteMarkedDailyReports)

module.exports = router;