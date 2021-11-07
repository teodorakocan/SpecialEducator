const multer = require('multer');
global.imageName = '';

const storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, './images');
    },
    filename: function(req, file, cd){
        imageName = Date.now() + '_' + file.originalname;
        cd(null, imageName);
    },
});

const upload = multer({
    storage: storage
});

module.exports = upload;