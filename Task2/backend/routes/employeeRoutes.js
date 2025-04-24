const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Add employee
router.post('/', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// Update employee
router.put('/:id', async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
});

// Delete employee
router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send({ message: "Employee deleted" });
});

module.exports = router;
