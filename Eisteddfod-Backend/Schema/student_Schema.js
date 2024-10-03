const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    gen: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        require: true
    },
    doa: {
        type: String,
        require: true
    },
    doe: {
        type: String,
        require: true
    },
    studentId: {
        type: Number,
        required: true,
        unique: true
    },
    mob: {
        type: Number,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    marksheet: {
        type: String,
    },
    class: {
        type: String,
        required: true
    },
    section :{
        type:String,
        required:true
    },
    age: {
        type: Number,
        required: true
    },
    aadhar: {
        type: String,
        required: true,
        unique: true
    },
    attendance: {
        type: []
    },
    motherName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    parentOccupation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    docs : {
        type: String,
    },
    password: {
        type : String
    },
    annualFee : {
        type : Number
    },
    rollNo : {
        type : String,
        unique : true
    },
    registration : {
        type : String,
        unique : true
    },
    siblings : {
        type: String
    }
})

module.exports = new mongoose.model("StudentDb", StudentSchema)