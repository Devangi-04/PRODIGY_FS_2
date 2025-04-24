const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  role: String,
  dateJoined: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Employee", employeeSchema);
