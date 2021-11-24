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

router.post('/changeUserData', loggedIn, authController.changeUserData);
router.post('/changePassword', loggedIn, authController.changePassword);
router.post('/changeImage', loggedIn, upload.single('file'), authController.changeImage);

//center
router.get('/centerData', loggedIn, authController.centerData);

module.exports = router;