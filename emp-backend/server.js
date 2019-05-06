// server.js

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config'),
    jwt = require('./_helpers/jwt'),
	errorHandler = require('./_helpers/error-handler');
const app = express();

let Employee = require('./models/Employee');

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cors());

	// use JWT auth to secure the api
	app.use(jwt());

	// api routes
	app.use('/users', require('./users/users.controller'));

	// global error handler
	app.use(errorHandler);

	
    const employeeRoute = require('./routes/employee.route');

    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.connectionString, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    // API to get data for creating a chart.
	app.route('/view').get(function (req, res) {
	    Employee.find(function (err, employees){
	    if(err){
	      console.log(err);
	    }
	    else {
	      res.json(employees);
	    }
	  });
	});

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/employee', employeeRoute);
	const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
  	console.log('Listening on port ' + port);
	});