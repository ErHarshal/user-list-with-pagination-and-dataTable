const registerLib = require('../lib/index');
const utils = require('../lib/utils');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const registerNew = (data) => new Promise((resolve, reject) => {
    utils.bcryptEncryption(data.pwd).then((hash) => {
        data.pwdHash = hash;
        registerLib.registerNew(data).then((res) => {
            if (res.length > 0) {
                resolve({ 'result': res.result, 'message': 'Employee Id alreday exits' });
            } else {
                resolve({ 'result': res.result, 'message': 'User registered successfully' });
            }
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        reject(err);
    });
});

const login = (data) => new Promise((resolve, reject) => {
    registerLib.getPassword(data.email).then((res) => {
        bcrypt.compare(data.pwd, res[0].pwd_hash, (err, response) => {
            if (err) {
                reject(err);
            } else if (response) {
                resolve(data.email);
            } else {
                reject(err);
            }
        });
    }).catch((err) => {
        reject(err);
    });
});

const getUserList = (data) => new Promise((resolve, reject) => {
    let param = {
        'draw' : parseInt(data.draw),
        'start' : data.start ? parseInt(data.start) : 0,
        'length' : data.length ? parseInt(data.length) : 0,
        'search' : data['search[value]'],
        'sort': config.sortBy[parseInt(data['order[0][column]'])],
        'orderBy': data['order[0][dir]']
    };
    
    registerLib.getUserList(param).then((res) => {
        resolve({'draw': param.draw, 'recordsFiltered': res.total[0].total, 'recordsTotal': 0, 'data': res.result});
    }).catch((err) => {
        reject(err);
    });
});

module.exports = {
    registerNew,
    login,
    getUserList
}