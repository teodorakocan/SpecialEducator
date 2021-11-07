var express = require('express');
var router = express.Router();
const centerController = require('../controllers/centerController');
const upload = require('../configurations/uploads');

router.get('/validation', centerController.validation);
router.post('/registration', upload.single('file'), centerController.registration);

module.exports = router;