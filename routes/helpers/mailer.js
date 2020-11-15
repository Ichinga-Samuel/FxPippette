const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

let accessToken;
oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token){
        accessToken = tokens.access_token;
        console.log(tokens.access_token, tokens.refresh_token, 'onevent')
}
});

const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken || process.env.ACCESS_TOKEN
    },
    tls: {
        rejectUnauthorized: false
    }
};


async function mailSender(email, input, mail){
    let transporter = nodemailer.createTransport(transport);
    mail.msg = input;
    transporter.verify(function(err, success){
        if(err){
            console.log(err, 'not valid')
        }
        else {
            console.log('ok', 'valid')
        }
    });
    try{
        let info = await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: mail.subject,
            text: `localhost:3000/auth/verify/:${input}`,
            html: mail.msg});
        console.log(info.messageId)
    }

    catch(e){
        console.log(e, 'Verified but not sent')
    }
}
module.exports = {mailSender};
