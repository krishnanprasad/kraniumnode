var express = require('express');

var router = express.Router();

const connection = mysql.createConnection({
    host: '183.82.35.159',
    port: '3306',
    user: 'tvs',
    password: 'kranium@tvs',
    database: 'global_tvs'
});

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'global'
// });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

exports.signIn = (req, res) => {
    console.log('signin');
    const userName = req.body.userName;
    const password = req.body.password;
    let sqlLog = `CALL api_login('${userName}', '${password}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (results) {
            console.log(results);
            var resultArr = [];
            for (var i = 0; i < results.length; i++) {
                resultArr = resultArr.concat(results[i]);
            }
            // const result = JSON.parse(JSON.stringify(results));
            if (resultArr[0].User_Token) {
                res.status(200).send({
                    outData: resultArr,
                    statusCode: 1,
                    msg: 'success'
                });
            } else {
                res.status(404).send({
                    outData: results,
                    statusCode: 2,
                    msg: 'no record found'
                });
            }
        }
        if (error) {
            res.status(400).send({
                outData: error,
                statusCode: 3,
                msg: 'error'
            });
        }
    });
}

exports.getPatient = (req, res) => {
    let sql = `CALL api_admitted_dr_patients('100049','2019-04-11')`;

    // router.get('/check', function(req, res) {
    connection.query(sql, (error, results, fields) => {

        // connection.end(() => {
        //     console.log('ended');
        // });

        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
};

exports.getData = (req, res) => {
    const doctorDetail = { doctorname: 'sam', age: 27, department: 'cardiotist' };
    res.status(200).send({
        outData: doctorDetail,
        statusCode: 1,
        msg: 'success'
    });
};

// exports.routes = router

// const express = require('express')
// const router = express.Router()


// router.get('/check', function (req, res) {
//   res.send('check')
// })


// Mobile services 

exports.mobileSignIn = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const locationid = req.body.locationid;

    let sqlLog = `CALL mob_signin('${username}', '${password}', '${locationid}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {

            var checkLogin = results[0][0];
            loginUserDetails = JSON.stringify(checkLogin);
            if(isEmpty(loginUserDetails)){
                res.status(404).send({
                    outData: results,
                    statusCode: 2,
                    msg: 'Invalid Credential'
                });
            } else {
                res.status(200).send({
                    outData: results,
                    statusCode: 1,
                    msg: 'success'
                });
            }
        }
    });
}

function isEmpty(obj) {
    console.log(obj);
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

exports.getLocation = (req, res) => {

    let sqlLog = `CALL mob_getlocation()`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}

exports.getAppointments = (req, res) => {
    const currentdate = req.body.date;
    const locid = req.body.locid;

    let sqlLog = `CALL mob_op('${currentdate}', '${locid}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}

exports.getEncounterDetails = (req, res) => {
    const encounterid = req.body.encounterid;

    let sqlLog = `CALL mob_encounter('${encounterid}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}

exports.servicesUsedForEncounter = (req, res) => {
    const encounterid = req.body.encounterid;

    let sqlLog = `CALL mob_services('${encounterid}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}

exports.getConsultationFee = (req, res) => {
    const encounterid = req.body.encounterid;

    let sqlLog = `CALL mob_consultation_fee('${encounterid}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}

exports.serviceConfirmation = (req, res) => {

    let sqlLog = `CALL mob_add_services()`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}

exports.searchServiceList = (req, res) => {
    const servicename = req.body.servicename;

    let sqlLog = `CALL mob_services('${servicename}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}

exports.searchPatient = (req, res) => {
    const username = req.body.username;
    const phonenumber = req.body.phonenumber;

    let sqlLog = `CALL mob_searchpatient('${username}','${phonenumber}')`;
    connection.query(sqlLog, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        if (results) {
            console.log(results);
            res.status(200).send({
                outData: results,
                statusCode: 1,
                msg: 'success'
            });
        }
    });
}