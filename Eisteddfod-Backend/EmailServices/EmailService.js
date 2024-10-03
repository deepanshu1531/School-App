"use strict";
const NodeMailer = require('nodemailer');

const emailService = async () => {
    //connect with SMTP Server...
    const transporter=NodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vermadeepanshu1531@gmail.com',
                pass: 'ziciqgsshugtatim'
            }
        })
    transporter.sendMail({
        from: 'vermadeepanshu1531@gmail.com',
        to: 'vermadeepanshu201@gmail.com, anjalisoni155@gmail.com',
        cc: 'vermadeepanshu1531@gmail.com',
        subject: 'Attendance Request Submission Notification Email!!',
        text: 'Hi Deepanshu,\nYour attendance submitted successfully!!',
        html: "<b>Hello Deepanshu Verma!!</b>"
    }, (error, data) => {
        if (error) {
            console.log(error)
            return "Error";
        }
        else {
            string = "Email sent successfully!!!";
            console.log("else "+data);
            return string;
        }
    });
}
module.exports = emailService;