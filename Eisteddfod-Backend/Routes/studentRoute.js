const Service = require('../Service');
const Constants = require('../constants');
const Schema = require('../Schema/student_Schema');
const routes = [];

//To add Student in database;
routes.push({
    method: 'POST',
    path: '/addStudent',
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
                // docs = payload['docs'];
                image = payload['image'];
                // marksheet = payload['marksheet']
                formDetail = JSON.parse(payload['formDetail']);
                console.log(formDetail);
                const data = new Schema({
                    name: formDetail.name,
                    gen: formDetail.gen,
                    dob: formDetail.dob,
                    doa: formDetail.doa,
                    doe: "DD-MM-YYYY",
                    age: formDetail.age,
                    class: formDetail.class,
                    section: formDetail.section,
                    aadhar: formDetail.aadhar,
                    image: '',
                    marksheet: '',
                    address: formDetail.address,
                    mob: formDetail.mob,
                    email: formDetail.email,
                    studentId: '',
                    attendance: [],
                    annualFee: formDetail.fee,
                    password: Constants.STUDENT_PASSWORD,
                    docs: '',
                    parentOccupation: formDetail.occupation,
                    fatherName: formDetail.father,
                    motherName: formDetail.mother,
                    rollNo: formDetail.rollNo,
                    registration: formDetail.registration,
                    sibling: formDetail.siblings
                });
                data.studentId = Constants.SCHOOL_CODE + data.aadhar.slice(8);
                await Service.imageUploader(data.studentId, image);
                data.image = req.url.toString().replace('addStudent', 'getStudentImage/') + data.studentId;
                // if (marksheet != null || marksheet != undefined) {
                //     await Service.docUploader(data.studentId, marksheet, 'marksheet');
                //     data.marksheet.push(req.url.toString().replace('addStudent', 'getStudentMarksheet/') + data.studentId);
                // }
                // if(docs != null || docs != undefined)
                // {
                //     await Service.docUploader(data.studentId, docs, 'docs');
                //     data.docs = req.url.toString().replace('addStudent', 'getStudentDocuments/') + data.studentId;
                // }
                let passwordMail = Constants.getPasswordMailObjectTeachers(data);
                let savedData = await data.save();
                if (savedData) {
                    const Transporter = await Service.getTransporter();
                    // const str = await Transporter.sendMail(passwordMail);
                    return reply.response("Success");
                }
                else
                    return reply.response("Error");
            } catch (error) {
                console.log(error);
                if (error.keyValue != undefined) {
                    let data = JSON.stringify(error.keyValue).replace("{", "").replace("}", "");
                    // console.log(data);
                    return reply.response(`${data} Already exists`);
                }
                else
                    return reply.response("Error");
            }
        }
    }
});

//Route to add Attendance of Student.....
routes.push({
    method: 'POST',
    path: '/addStudentAttendance/{studentId}',
    handler: async (req, reply) => {
        try {
            const id = req.params.studentId;
            console.log(id)
            const Attendance = req.payload;
            let condition = { "studentId": id, "attendance.date": { $ne: req.payload.date } };
            let newvalues = { $addToSet: { "attendance": Attendance } };
            let data = await Schema.updateOne(condition, newvalues);
            console.log(Attendance);
            if (data.modifiedCount == 0) {
                condition = { "studentId": id, "attendance.date": req.payload.date };
                newvalues = { $set: { "attendance.$.status": Attendance.status } };
                data = await Schema.updateOne(condition, newvalues);
                if (data.modifiedCount == 0)
                    return reply.response("Error");
            }
            return reply.response("Success");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
})

//Route to get student by ID...........
routes.push({
    method: 'GET',
    path: '/getStudent/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let student = await Schema.findOne().where("studentId").equals(id);
                if (student != null) {
                    return reply.response(student);
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
//Route to get list of all students present in DB.....
routes.push({
    method: 'GET',
    path: '/getAllStudents',
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
});

//Route to Get Student image
routes.push({
    method: 'GET',
    path: '/getStudentImage/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let student = await Schema.findOne().where("studentId").equals(id);
                if (student != null) {
                    return reply.file("Uploads/ProfileImages/" + student.studentId + "-image.jpg");
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

//Route to Get Student docs
routes.push({
    method: 'GET',
    path: '/getStudentDocs/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let student = await Schema.findOne().where("studentId").equals(id);
                if (student != null) {
                    return reply.file("Uploads/Pdf/" + student.studentId + "-docs.pdf");
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

//Route to Get Student marksheet
routes.push({
    method: 'GET',
    path: '/getStudentMarksheet/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            if (id != null) {
                let student = await Schema.findOne().where("studentId").equals(id);
                if (student != null) {
                    return reply.file("Uploads/Pdf/" + student.studentId + "-marksheet.pdf");
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

//Route to Delete student by ID..............
routes.push({
    method: 'DELETE',
    path: '/deleteStudent/{id}',
    handler: async (req, reply) => {
        try {
            let id = req.params.id;
            console.log(id);
            if (id != null) {
                let student = await Schema.findOne().where("studentId").equals(id);
                if (student != null) {
                    let data = await Schema.deleteOne(student);
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
//route to update student profile............
routes.push({
    method: 'PUT',
    path: '/updateStudent/{id}',
    handler: async (req, reply) => {
        try {
            const id = req.params.id;
            const student = await Schema.updateOne({ "studentId": id }, req.payload);
            console.log(student);
            if (student.modifiedCount != 0)
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
//route to update student image............
routes.push({
    method: 'PUT',
    path: '/updateStudentImage/{id}',
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
                let imgName = req.url.toString().replace('updateStudentImage', 'getStudentImage');
                let value = { "pic": imgName }
                const student = await Schema.updateOne({ "studentId": id }, value);
                console.log(student);
                if (student.modifiedCount != 0)
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

//route to update student docs............
routes.push({
    method: 'PUT',
    path: '/updateStudentDocs/{id}',
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
                let docsName = req.url.toString().replace('updateStudentDocs', 'getStudentDocs');
                let value = { "docs": docsName }
                const student = await Schema.updateOne({ "studentId": id }, value);
                console.log(student);
                if (student.modifiedCount != 0)
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

//route to update student marksheet............
routes.push({
    method: 'PUT',
    path: '/updateStudentMarksheet/{id}',
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
                let marksheet = payload['marksheet'];
                let id = req.params.id;
                await Service.docUploader(id, marksheet, "marksheet");
                let marksheetName = req.url.toString().replace('updateStudentMarksheet', 'getStudentMarksheet');
                let value = { "marksheet": marksheetName }
                const student = await Schema.updateOne({ "studentId": id }, value);
                console.log(student);
                if (student.modifiedCount != 0)
                    return reply.response(marksheetName);
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

module.exports = (routes);