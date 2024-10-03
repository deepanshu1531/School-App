const CryptoJS = require('crypto-js');

var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
console.log('Encrypted:'+ encrypted);

var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
console.log('Decrypted:'+ decrypted)

const encryptPassword = (pass) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pass));
}
//Password Dcrypt Logic.............
const dcryptPassword = (pass) => {
    return CryptoJS.enc.Base64.parse(pass).toString(CryptoJS.enc.Utf8);
}
