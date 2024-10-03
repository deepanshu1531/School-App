const mongoose = require('mongoose');

const TeacherSchema = {
    title: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    gen: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    doj: {
        type: String,
        require: true
    },
    doe: {
        type: String,
    },
    assignedTo: {
        type: String,
        require: true
    },
    section: {
        type: String,
    },
    highQualification: {
        type: String,
        require: true
    },
    passOut: {
        type: String,
        require: true
    },
    prevOrg: {
        type: String,
        require: true
    },
    workExp: {
        type: String,
        require: true
    },
    aadhar: {
        type: String,
        require: true,
        unique: true
    },
    pan: {
        type: String,
        require: true,
        unique: true
    },
    pic: {
        type: String,
        require: true
    },
    resume: {
        type: String,
        require: true
    },
    docs : {
        type: String,
    },
    add: {
        type: String,
        require: true
    },
    mob: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    isAdmin: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    teacherId: {
        type: String,
        require: true,
        unique: true
    },
    leave:{
        type: String,
        require: true
    },
    leaveBalance: {
        type: String,
        require: true
    },
    attendance: {
        type: [],
    },
}

module.exports = mongoose.model("TeacherDb", TeacherSchema)