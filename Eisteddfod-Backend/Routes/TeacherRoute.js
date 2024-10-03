const Schema = require('../Schema/teacher_Schema');
const routes = [];
const constants = require('../constants');
const Service = require('../Service');
const index = require('../index');

//Route to add teacher in Database...
routes.push({
    method: 'POST',
    path: '/addTeacher',
    options: {
        cors: true,
        payload: {
            maxBytes: 30485760,
            output: 'stream',
            parse: true,
            multipart: true,    // <-- this fixed the media type error
            allow: 'multipart/form-data'  // <-- and this too!
        },
        handler: async (req, reply) => {
            let savedData = false;
            try {
                let payload = req.payload;
                image = payload['image'];
                resume = payload['resume']
                docs = payload['docs']
                formDetail = JSON.parse(payload['formDetail']);
                const data = new Schema({
                    title: formDetail.title,
                    name: formDetail.name,
                    gen: formDetail.gen,
                    dob: formDetail.dob,
                    doj: formDetail.doj,
                    doe: "DD-MM-YYYY",
                    assignedTo: formDetail.assignedTo,
                    section: formDetail.section,
                    highQualification: formDetail.highQualification,
                    passOut: formDetail.passOut,
                    prevOrg: formDetail.prevOrg,
                    workExp: formDetail.workExp,
                    aadhar: formDetail.aadhar,
                    pan: formDetail.pan,
                    pic: '',
                    resume: '',
                    docs: '',
                    add: formDetail.add,
                    mob: formDetail.mob,
                    email: formDetail.email,
                    isAdmin: formDetail.isAdmin,
                    password: '',
                    teacherId: '',
                    attendance: [],
                    leave: formDetail.leave,
                    leaveBalance: formDetail.leave
                });
                data.teacherId = constants.SCHOOL_CODE + data.aadhar.slice(8);
                await Service.imageUploader(data.teacherId, image);
                data.pic = req.url.toString().replace('addTeacher', 'getTeacherImage/') + data.teacherId;
                await Service.docUploader(data.teacherId, resume, "resume");
                data.resume = req.url.toString().replace('addTeacher', 'getTeacherResume/') + data.teacherId;
                if (docs !== null && docs !== undefined) {
                    await Service.docUploader(data.teacherId, docs, "docs");
                    data.resume = req.url.toString().replace('addTeacher', 'getTeacherDocs/') + data.teacherId;
                }
                let tempPass = Service.passwordGenerator() + "A#z4";
                data.password = await Service.encryptPassword(tempPass);
                let passwordMail = constants.getPasswordMailObjectTeachers(data, tempPass);
                savedData = await data.save();
                if (savedData) {
                    const Transporter = await Service.getTransporter();
                    const str = await Transporter.sendMail(passwordMail);
                    return reply.response("Success");
                }
                else
                    return reply.response("Something went wrong.");
            } catch (error) {
                if (error.keyValue != undefined) {
                    let data = JSON.stringify(error.keyValue).replace("{", "").replace("}", "");
                    return reply.response(`${data} Already exists`);
                }
                else{
                    if(savedData){
                        return reply.response("Registration Completed.\nThere is some problem with email service.\nPlease ask user to login using forget password option in the portal. ");
                    }
                    return reply.response("Error");
                }  
            }
        }
    }
});
//Route to add Attendance of teacher.....Taking Object of attendence with email of teacher
routes.push({
    method: 'POST',
    path: '/addAttendance/{emailId}',
    handler: async (req, reply) => {
        try {
            const mailId = req.params.emailId;
            let mailBody = constants.getTeacherAttendenceMailObject(req.payload);
            mailBody.to = mailId;
            const Attendance = req.payload;
            var condition = { "email": mailId, "attendance.date": { $ne: req.payload.date } };
            var newvalues = { $addToSet: { "attendance": Attendance } };
            const data = await Schema.updateOne(condition, newvalues);
            console.log(Attendance);
            if (data.modifiedCount == 0)
                return reply.response(`"Attendance already added for ${Attendance.date} date!!"`);
            else {
                const Transporter = await Service.getTransporter();
                const str = await Transporter.sendMail(mailBody);
            }
            return reply.response("Success");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
})
//Route to get list of all teachers present in DB.....
routes.push({
    method: 'GET',
    path: '/getAllTeachers',
    handler: async (req, reply) => {
        try {
            let data = await Schema.find();
            if (data)
                return reply.response(data);
            else
                return reply.response("Error");
        } catch (error) {
            console.log(error)
            return reply.response("Error");
        }
    }
})
//Route to get teacher by ID...........
routes.push({
    method: 'GET',
    path: '/getTeacher/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let teacher = await Schema.findOne().where("teacherId").equals(id);
                if (teacher != null) {
                    return reply.response(teacher);
                }
                else {
                    return reply.response("Error");
                }
            }
            else
                return reply.response("Error");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
})
// //Route to get teacher by Email...........
// routes.push({
//     method: 'GET',
//     path: '/getTeacher/{email}',
//     handler: async (req, reply) => {
//         try {
//             let email = req.params.email;
//             if (email != null) {
//                 let teacher = await Schema.findOne().where("email").equals(email);
//                 if (teacher != null) {
//                     return reply.response("Success");
//                 }
//                 else {
//                     return reply.response("No User with this email");
//                 }
//             }
//             else
//                 return reply.response("Error");
//         } catch (error) {
//             console.log(error);
//             return reply.response("Error");
//         }
//     }
// })
//Route to Get Teacher image
routes.push({
    method: 'GET',
    path: '/getTeacherImage/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let teacher = await Schema.findOne().where("teacherId").equals(id);
                if (teacher != null) {
                    return reply.file("Uploads/ProfileImages/" + teacher.teacherId + "-image.jpg");
                }
                else {
                    return reply.response("Error");
                }
            }
            else
                return reply.response("Error");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
})

//Route to Get Teacher resume
routes.push({
    method: 'GET',
    path: '/getTeacherResume/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let teacher = await Schema.findOne().where("teacherId").equals(id);
                if (teacher != null) {
                    return reply.file("Uploads/Pdf/" + teacher.teacherId + "-resume.pdf");
                }
                else {
                    return reply.response("Error");
                }
            }
            else
                return reply.response("Error");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
})

//Route to Get Teacher docs
routes.push({
    method: 'GET',
    path: '/getTeacherDocs/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let teacher = await Schema.findOne().where("teacherId").equals(id);
                if (teacher != null) {
                    return reply.file("Uploads/Pdf/" + teacher.teacherId + "-docs.pdf");
                }
                else {
                    return reply.response("Error");
                }
            }
            else
                return reply.response("Error");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
})

//Route to Delete teacher by ID..............
routes.push({
    method: 'DELETE',
    path: '/deleteTeacher/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            console.log(id);
            if (id != null) {
                let teacher = await Schema.findOne().where("teacherId").equals(id);
                if (teacher != null) {
                    let data = await Schema.deleteOne(teacher);
                    if (data)
                        return reply.response("Sucess");
                    else
                        return reply.response("Error");
                }
                else {
                    return reply.response("Error");
                }
            }
            else
                return reply.response("Error");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
});
//route to update teacher profile............
routes.push({
    method: 'PUT',
    path: '/updateTeacher/{id}',
    handler: async (req, reply) => {
        try {
            const id = req.params.id;
            const teacher = await Schema.updateOne({ "teacherId": id }, req.payload);
            console.log(teacher);
            if (teacher.modifiedCount != 0)
                return reply.response("Success");
            else
                return reply.response("Error");
        } catch (error) {
            if (error) {
                console.log(error);
                return reply.response("Error");
            }
        }
    }
});
//route to update teacher image............
routes.push({
    method: 'PUT',
    path: '/updateTeacherImage/{id}',
    options: {
        cors: true,
        payload: {
            maxBytes: 30485760,
            output: 'stream',
            parse: true,
            multipart: true,    // <-- this fixed the media type error
            allow: 'multipart/form-data'  // <-- and this too!
        },
        handler: async (req, reply) => {
            try {
                let payload = req.payload;
                let image = payload['image'];
                let id = req.params.id;
                await Service.imageUploader(id, image);
                let imgName = req.url.toString().replace('updateTeacherImage', 'getTeacherImage');
                let value = { "pic": imgName }
                const teacher = await Schema.updateOne({ "teacherId": id }, value);
                console.log(teacher);
                if (teacher.modifiedCount != 0)
                    return reply.response(imgName);
                else
                    return reply.response("Error");
            } catch (error) {
                if (error) {
                    console.log(error);
                    return reply.response("Error");
                }
            }
        }
    }
});
//route to update teacher resume............
routes.push({
    method: 'PUT',
    path: '/updateTeacherResume/{id}',
    options: {
        cors: true,
        payload: {
            maxBytes: 30485760,
            output: 'stream',
            parse: true,
            multipart: true,    // <-- this fixed the media type error
            allow: 'multipart/form-data'  // <-- and this too!
        },
        handler: async (req, reply) => {
            try {
                let payload = req.payload;
                let resume = payload['resume'];
                let id = req.params.id;
                await Service.docUploader(id, resume, "resume");
                let resumeName = req.url.toString().replace('updateTeacherResume', 'getTeacherResume');
                let value = { "resume": resumeName }
                const teacher = await Schema.updateOne({ "teacherId": id }, value);
                console.log(teacher);
                if (teacher.modifiedCount != 0)
                    return reply.response(resumeName);
                else
                    return reply.response("Error");
            } catch (error) {
                if (error) {
                    console.log(error);
                    return reply.response("Error");
                }
            }
        }
    }
});
//route to update teacher docs............
routes.push({
    method: 'PUT',
    path: '/updateTeacherDocs/{id}',
    options: {
        cors: true,
        payload: {
            maxBytes: 30485760,
            output: 'stream',
            parse: true,
            multipart: true,    // <-- this fixed the media type error
            allow: 'multipart/form-data'  // <-- and this too!
        },
        handler: async (req, reply) => {
            try {
                let payload = req.payload;
                let docs = payload['docs'];
                let id = req.params.id;
                await Service.docUploader(id, docs, "docs");
                let docsName = req.url.toString().replace('updateTeacherDocs', 'getTeacherDocs');
                let value = { "docs": docsName }
                const teacher = await Schema.updateOne({ "teacherId": id }, value);
                console.log(teacher);
                if (teacher.modifiedCount != 0)
                    return reply.response(docsName);
                else
                    return reply.response("Error");
            } catch (error) {
                if (error) {
                    console.log(error);
                    return reply.response("Error");
                }
            }
        }
    }
});
//Route to send forgot password otp mail............
routes.push({
    method: 'POST',
    path: '/resetPasswordOtpMail',
    handler: async (req, reply) => {
        try {
            let mail = req.payload;
            mail.from = '"No Reply" <noReply@gmail.com>';
            const teacher = await Schema.findOne().where("email").equals(req.payload.to);
            console.log(teacher);
            if (teacher != null) {
                const Transporter = await Service.getTransporter();
                const str = await Transporter.sendMail(mail);
                return reply.response("Success");
            } else
                return reply.response("ErrorEmail");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
})

//Route to validate email and password for login request.............
routes.push({
    method: "POST",
    path: '/login',
    handler: async (req, reply) => {
        try {
            const data = await Schema.findOne().where("email").equals(req.payload.email);
            const userPass = req.payload.pass;
            if (data != null && data != undefined) {
                if (Service.dcryptPassword(userPass, data.password)) {
                    return reply.response(data);
                }
                else
                    return reply.response("Wrong Password!");
            } else
                return reply.response("Email ID not exists!");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
});

routes.push({
    method: 'PUT',
    path: '/updateTeacherPassword',
    handler: async (req, reply) => {
        try {
            const id = req.payload;
            let condition = { "email": req.payload.email };
            let encPass = await Service.encryptPassword(req.payload.pass);
            let value = { "password": encPass}
            const teacher = await Schema.updateOne(condition, value);
            console.log(teacher);
            if (teacher.modifiedCount != 0)
                return reply.response("Success");
            else
                return reply.response("Error");
        } catch (error) {
            if (error) {
                console.log(error);
                return reply.response("Error");
            }
        }
    }
});

module.exports = routes;