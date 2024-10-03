const SCHOOL_CODE = "420";
const GMAIL = "vermadeepanshu1531@gmail.com";
const GMAIL_PASSWORD = "ziciqgsshugtatim";
const STUDENT_PASSWORD = "schoolChaleHum";
const DB_URL = "mongodb://0.0.0.0:27017/Eisteddfod_DB";
const YOUTUBE_CHANNEL_ID = "UCKnZHF24IV9PT0cdSdHoWug";
const DRIVE_IMAGE_URL = "https://photos.app.goo.gl/7QbAEjNJ93QmMQ4G9";
const IMGDIR = "Uploads/ProfileImages";
const PDFDIR = "Uploads/Pdf";

//Mail Body for Attendence submission notification.................
const getTeacherAttendenceMailObject = (data)=>{
    const ATTENDENCE_MAIL_OBJECT = {
        from : '"No Reply"<noReply@gmail.com>',
        to: "",
        cc: "vermadeepanshu1531@gmail.com",
        subject: "'Attendance Request Submission Notification Email!!'",
        text: `Hi,\n\nGreetings for the Day!.\n\nYour attendance for Date ${data.date} has been submitted successfully!!\n\nThanks And Regards,\nEISTEDDFOD FAMILY`
    };
    return ATTENDENCE_MAIL_OBJECT;
}
//Mail Body for Register to eisteddfod and to give username and Password to teachers.......
const getPasswordMailObjectTeachers = (data, tempPass)=>{
    const PASSWORD_MAIL_OBJECT = {
        from : '"No Reply"<noReply@gmail.com>',
        to: `${data.email}`,
        cc: "vermadeepanshu1531@gmail.com",
        subject: "*WARM WELCOME TO EISTEDDFOD FAIMLY!!*",
        text: `Hi ${data.name},\n\nGreetings for the Day!.\n\nWe are very happy to Offer you this Job. You can start your work from ${data.doj} onward's.\n\nPlease find your DOJ, Username and default Password below for EISTEDDFOD PORTAL and upload the required documents.\n\nDate Of Joinning : ${data.doj},\nLogin ID: ${data.email},\nPassword: ${tempPass}\n\nThanks and Regards,\nEISTEDDFOD FAMILY!!`
    };
    return PASSWORD_MAIL_OBJECT;
}

//Mail Body for Register to eisteddfod and to give username and Password to students.......
const getPasswordMailObjectStudents = (data)=>{
    const PASSWORD_MAIL_OBJECT = {
        from : '"No Reply"<noReply@gmail.com>',
        to: `${data.email}`,
        cc: "vermadeepanshu1531@gmail.com",
        subject: "*WARM WELCOME TO EISTEDDFOD FAIMLY!!*",
        text: `Dear ${data.name},\n\nGreetings for the Day!.\n\nWe are very happy that you are a part of our EISTEDDFOD FAIMLY.\n\nYour Date of admission is ${data.doa}.\n\nPlease Username and default Password below for EISTEDDFOD PORTAL.\n\nDate Of admission : ${data.doa},\nLogin ID: ${data.email},\nPassword: ${data.password}\n\nThanks and Regards,\nEISTEDDFOD FAMILY!!`
    };
    return PASSWORD_MAIL_OBJECT;
}

module.exports = {SCHOOL_CODE, GMAIL, GMAIL_PASSWORD,STUDENT_PASSWORD, DB_URL, YOUTUBE_CHANNEL_ID, DRIVE_IMAGE_URL, IMGDIR, PDFDIR, getTeacherAttendenceMailObject, getPasswordMailObjectStudents, getPasswordMailObjectTeachers};