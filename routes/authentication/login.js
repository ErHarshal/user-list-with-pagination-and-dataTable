const express = require('express');
const router = express.Router();
const registerCtr = require('../../controllers/register');

router.get('/', (req, res) => {
    return res.render('authentication/login', {
        'title': 'login',
        'layout': 'default'
    });
});

router.post('/', (req, res) => {
    registerCtr.login(req.body).then((response) => {
        console.log('Logged in successfully');
        res.json({
            'url': '/dashboard'
        });
    }).catch((err) => {
        res.json({
            'url': '/login'
        });
    })
});

router.get('/dashboard', (req, res) => {
    return res.render('authentication/dashboard', {
        'title': 'dashboard',
        'layout': 'default'
    });
});

router.post('/getUserList', (req, res) => {
    registerCtr.getUserList(req.body).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
});



module.exports = router;