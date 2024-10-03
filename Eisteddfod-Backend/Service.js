const NodeMailer = require('nodemailer');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const imageLocation = { dest: `${constants.IMGDIR}/` };
const pdfLocation = { dest: `${constants.PDFDIR}/` };
const bcrypt = require('bcrypt');


let transporterGlobal;
//SMTP Hold Loop
const getTransporter = async () => {
    while (transporterGlobal === undefined) {
        require('deasync').runLoopOnce();
    }
    // console.log(transporterGlobal)
    return transporterGlobal;
}
//SMTP connection for email id and password..........
const email = (user, pass) => {
    transporterGlobal = NodeMailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: user,
            pass: pass
        }
    });
}

//Password generator..........
const passwordGenerator = () => {
    console.log("Password generator!")
    let length = 4;
    let charset = "@#$&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}
//Password Encrypt Logic.............
const encryptPassword =async (pass) => {
    // return CryptoJS.AES.encrypt(pass, 'secret key 123').toString();
    return await bcrypt.hash(pass,10);
}
//Password Dcrypt Logic.............
const dcryptPassword =async (userPass, encryptedPass) => {
    const result = await bcrypt.compare(userPass,encryptedPass);
    //console.log(result);
    return result;
}

//File Uploader...................
const uploader = (Id, file, options, type) => {
    if (!file) throw new Error('no file(s)');

    return _fileHandler(Id, file, options, type);
}

const _fileHandler = (Id, file, options, type) => {
    if (!file) throw new Error('no file');
    let filename = ''
    const orignalname = file.hapi.filename;
    if (orignalname.includes("pdf") || orignalname.includes("PDF") || orignalname.includes("Pdf")) {
        if (type === "resume")
            filename = Id + "-" + 'resume.pdf';
        else if (type === "docs")
            filename = Id + "-" + 'docs.pdf';
        else
            filename = Id + "-" + type +'.pdf';
    }
    else
        filename = Id + "-" + 'image.jpg';
    const path = `${options.dest}${filename}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        file.on('error', (err) => {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', (err) => {
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            }

            resolve(fileDetails);
        })
    })
}

const imageUploader = async (Id, image) => {
    if (!fs.existsSync(constants.IMGDIR)){
        let cb = (err, dir) => {
            if (err)
                return console.error(err);
            console.log('Directory created successfully!');
        }
        let dirArr = constants.IMGDIR.split("/");
        fs.mkdir(path.join(__dirname, dirArr[0]), cb);
        fs.mkdir(path.join(__dirname+"\\"+dirArr[0], dirArr[1]), cb);
    }
    else
        console.log("Already Created!!");
    const imageDetails = await uploader(Id, image, imageLocation, "");
    console.log(imageDetails.path);
}

const docUploader = async (Id, doc, type) => {
    if (!fs.existsSync(constants.PDFDIR)){
        let cb = (err) => {
            if (err)
                return console.error(err.message);
            console.log('Directory created successfully!');
        }
        let dirArr = constants.PDFDIR.split("/");
        fs.mkdir(path.join(__dirname, dirArr[0]), cb);
        fs.mkdir(path.join(__dirname+"\\"+dirArr[0], dirArr[1]), cb);
    }
    else
        console.log("Already Created!!");
    const docDetails = await uploader(Id, doc, pdfLocation, type);
    console.log(docDetails.path);
}



module.exports = { email, getTransporter, passwordGenerator, encryptPassword, dcryptPassword, imageUploader, docUploader };