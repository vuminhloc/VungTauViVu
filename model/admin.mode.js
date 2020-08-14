const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/MyWebsite");

const AdminSchema = new mongoose.Schema({
    Name: String,
    Account : String,
    Password : String
})

const Admin = mongoose.model('Admin',AdminSchema,"Admin");

module.exports = Admin