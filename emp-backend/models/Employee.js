//Employee.js 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Employee
let Employee = new Schema({
  employee_name: {
    type: String
  },
  employee_id: {
    type: Number
  },
  pnd: {
    type: Number
  },
  eod: {
    type: Number
  },
  lnd: {
    type: Number
  },
  tc: {
    type: Number
  },
  rt: {
    type: Number
  }	
},{
    collection: 'employee'
});

module.exports = mongoose.model('Employee', Employee);