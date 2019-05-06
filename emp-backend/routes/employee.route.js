//employee.route.js 

const express = require('express');
const app = express();
const employeeRoutes = express.Router();

// Require Employee model in our routes module
let Employee = require('../models/Employee');

// Defined store route
employeeRoutes.route('/add').post(function (req, res) {
  let employee = new Employee(req.body);
  employee.save()
    .then(employee => {
      res.status(200).json({'employee': 'employee is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
employeeRoutes.route('/').get(function (req, res) {
    Employee.find(function (err, employees){
    if(err){
      console.log(err);
    }
    else {
      res.json(employees);
    }
  });
});

// Defined edit route
employeeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Employee.findById(id, function (err, employee){
      res.json(employee);
  });
});

//  Defined update route
employeeRoutes.route('/update/:id').post(function (req, res) {
    Employee.findById(req.params.id, function(err, employee) {
    if (!employee)
      return next(new Error('Could not load Document'));
    else {
        employee.employee_name = req.body.employee_name;
        employee.employee_id = req.body.employee_id;
        employee.pnd = req.body.pnd;
		employee.eod = req.body.eod;
        employee.lnd = req.body.lnd;
        employee.tc = req.body.tc;
        employee.rt = req.body.rt;

        employee.save().then(employee => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});	

// Defined delete | remove | destroy route
employeeRoutes.route('/delete/:id').get(function (req, res) {
    Employee.findByIdAndRemove({_id: req.params.id}, function(err, employee){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = employeeRoutes;