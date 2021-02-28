const express = require('express');
const router = express.Router();
const registerCtr = require('../../controllers/register');

router.get('/', (req, res) => {
        return res.render('authentication/register', {
            'title': 'register',
            'layout': 'default'
        });
});

router.post('/', (req, res) => {
    registerCtr.registerNew(req.body).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;