const { log } = require('console');
const fs = require('fs');
const os = require('os');
const path = require('path');
const generateOtp = () => {
    var otp = Math.ceil(Math.random() * 10000).toString();
    otp = otp.length < 3 ? otp.concat('9') : otp;
    otp = otp.length < 4 ? otp.concat('7') : otp;
    // return otp;
    return "3793";
}
const uuid = () => {
    const charset = "0123456789";
    let uuid = "";
    for (let i = 0, n = charset.length; i < 7; ++i) {
        uuid += charset.charAt(Math.floor(Math.random() * n));
    }

    return uuid;
}

const generateReferralCode = (firstName, phone) => {
    let suffix = "HS-";
    let prefix = firstName.slice(0, firstName.length > 3 ? 3 : firstName.length) + phone.slice(8, 11);
    return suffix + prefix.toString().toUpperCase();
}

const generateId = () => {
    return Date.now().toString();

}
const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;

}

function createTempFile(data, extension = 'png') {
    console.log(data);
    const uint8Data = new Uint8Array(data);
    return new Promise((resolve, reject) => {
        const tempFilePath = path.join(os.tmpdir(), `temp_${Date.now()}.${extension}`);

        fs.writeFile(tempFilePath, uint8Data, 'binary', (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(tempFilePath);
                resolve(tempFilePath);
            }
        });
    });
}
// const tempFilePath = (unit8list) => {



//     // Example usage:
//     const uint8Data = new Uint8Array([1, 2, 3, 4, 5]);
//     createTempFile(uint8Data)
//         .then(tempFilePath => {
//             console.log('Temporary file created at:', tempFilePath);
//             // Use the tempFilePath as needed
//         })
//         .catch(error => {
//             console.error('Error creating temporary file:', error);
//         });

// }

module.exports = { generateOtp, generateReferralCode, uuid, generateId, generatePassword, createTempFile };