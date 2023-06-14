const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsersModel = require('../models/Users');

// REGISTER
router.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        const model = new UsersModel({
            name, surname, email, password: hash
        });
        const promise = model.save();

        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });
});

// LOGIN
router.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
    const promise = UsersModel.findOne({ email: email }, 'email password');

    promise.then((data) => {
        if(!data)
            res.json({ message: "User not found", code: -1})
        bcrypt.compare(password, data.password).then((result) => {
            if(!result){
                res.json({ message: 'Wrong password!!!', code: -1 })
            }else{
                const payload = { email };
                const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                    expiresIn: 720
                });
                res.json({ status:true, token });
            }
        });
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;