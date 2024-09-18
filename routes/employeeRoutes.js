const express = require('express');
const router = express.Router();
const controller = require('../controller/employeeControllerJsonFile');


router.get('/home', controller.getHomePage);

router.post('/getEmployee', controller.getEmployee);

router.get('/addEmployee', controller.getAddEmployee);

router.post('/addEmployee', controller.postAddEmployee);

router.get('/allEmployee', controller.getAllEmployee);

router.get('/updateEmployee', controller.getUpdateEmployee);

router.post('/updateEmployee', controller.postUpdateEmployee);

router.post('/deleteEmployee/:id', controller.postDeleteEmployee);

module.exports = router;