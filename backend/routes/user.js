var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/emailValidation', userController.emailValidation);
router.get('/login', userController.login);
router.get('/login', userController.login);

router.post('/resetPasswordRequest', userController.resetPasswordRequest);
router.post('/resetPassword', userController.resetPassword);

router.get('/diagramMonthlyDailyReport', userController.diagramMonthlyDailyReport);
router.get('/diagramAnnualEstimate', userController.diagramAnnualEstimate);
router.get('/checkParentPassword', userController.checkParentPassword);

module.exports = router;