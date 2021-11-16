const express = require('express');
const app = express();
const cors = require('cors');

const centerRoute = require('./routes/center');
const userRoute = require('./routes/user');
const authUserRoute = require('./routes/authUser');
const adminRoute = require('./routes/admin');

const whitelist = ['http://localhost:3000'];
const corsOptions = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions);
}

app.use(function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.statusCode = 400
        res.send({ code: err.code })
    } else if (err) {
        if (err.message === 'FILE_MISSING') {
            res.statusCode = 400
            res.send({ code: 'FILE_MISSING' })
        } else {
            res.statusCode = 500
            res.send({ code: 'GENERIC_ERROR' })
        }
    }
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static('images'));

app.use('/center', centerRoute);
app.use('/user', userRoute);
app.use('/authUser', authUserRoute);
app.use('/admin', adminRoute);

app.listen(9000, function () {
    console.log('Example app listening on port 9000!');
});