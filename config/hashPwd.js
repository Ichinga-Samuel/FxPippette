const crypto = require('crypto');

function genPwd(pwd){
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(pwd, salt, 10000, 64, "sha512").toString("hex");
    return{
        hash: hash,
        salt: salt
    };
}

function isValid(pwd, salt, hash){
    const newHash = crypto.pbkdf2Sync(pwd, salt, 10000, 64, "sha512").toString('hex');
    return newHash === hash
}

module.exports={
    genPwd,
    isValid
};
