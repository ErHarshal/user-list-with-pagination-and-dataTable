const mysql = require('mysql');
const config = require('../config/config');
let connection = mysql.createConnection({
    host: config.databaseDetails.host,
    user: config.databaseDetails.user,
    password: config.databaseDetails.password,
    database: config.databaseDetails.database
});

let queries = require('./queries');

connection.query(queries.createTableUser, (fErr, fResu) => {
    if (fErr) {
        console.log('something went wroung while creating user table', fErr);
    } else {
        connection.query(queries.createTableEmployee, (fError, Fresults) => {
            if (Fresults) {
                console.log('Tables created');
            } else {
                console.log('something went wroung while creating employee table', fError);
            }
        });
    }
});

const registerNew = (data) => new Promise((resolve, reject) => {
    connection.query(queries.checkEmployeeIdExits, [parseInt(data.employeeId)], (error, resu, fields) => {
        if (resu && resu[0]) {
            resolve(resu);
        } else {
            connection.query(queries.insertIntoUserTable, [data.firstName, data.lastName, data.email, data.pwdHash], (err, results, fields) => {
                if (results) {
                    connection.query(queries.insertIntoEmployeeTable, [data.employeeId, data.orgName, results.insertId], (err1, res, fields) => {
                        if (res) {
                            resolve(res);
                        } else {
                            reject(err1)
                        }
                    });
                } else {
                    reject(err);
                }
            });
        }
    });
});

const getPassword = (email) => new Promise((resolve, reject) => {
    connection.query(queries.getPassword, [email], (error, resu, fields) => {
        if (error) {
            reject(error);
        } else {
            resolve(resu);
        }
    });
});

const getUserList = (params) => new Promise((resolve, reject) => {
    let queryString = queries.getUserList;
    let searchString = params.search ? ` where first_name like (\'%${params.search}%\') OR last_name like (\'%${params.search}%\') OR employee_id like (\'%${params.search}%\')` : ''
    let query = queryString.replace(/{{searchQuery}}/g, searchString)
    let totalRQuery = queries.getTotalRecords;
    let totalUpdateQuery = totalRQuery.replace(/{{searchQuery}}/g, searchString);
    let str = params.sort ? `order by ${params.sort} ${params.orderBy}` : '';
    let sortByQuery = query.replace(/{{orderBy}}/g, str);

    connection.query(sortByQuery, [params.length, params.start], (error, result) => {
        if (error) {
            reject(error);
        } else {
            connection.query(totalUpdateQuery, (error, total, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({result, total});
                }
            });            
        }
    });
});

module.exports = {
    registerNew,
    getPassword,
    getUserList
}