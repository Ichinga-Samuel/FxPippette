
const verificationMail = {
    _msg: '',
    get msg(){return this._msg},
    set msg(link){
        this._msg = `<body><header style="background-color: red color: white"><h1>FxPippette Investment</h1></header> 
        <h2>Email Verification</h2>
        <h3> Welcome to Fxpippette</h3>
        <p>Follow this /auth/verify?id=${link.id} to verify your email and complete your sign up process</p>
        <footer style="align-content: center">&copy;FxPippette Investment </footer>
        </body>`
    },
    subject: 'Email Verification'};

const passwordRecovery = {
    _msg: '',
    get msg(){return this._msg},
    set msg(link){
        this._msg = `<body><header style="background-color: red color: white"><h1>FxPippette Investment</h1></header> 
        <h2>Password Recovery</h2>
        <h3>You Initiated Password Recovery</h3>
        <p>Follow this /auth/reset?s=${link.s}&id=${link.id} to reset your password</p>
        <footer style="align-content: center">&copy;FxPippette Investment </footer>
        </body>`
    },
    subject: 'Password Recovery'
};

const alert = {
    _msg: '',
    get msg(){return this._msg},
    set msg(name){ this._msg = `<body><header style="background-color: red color: white"><h1>FxPippette Investment</h1></header> 
        <h2>Alert Notification</h2>
        <h3>Congratulations ${name} your funds are available for withdrawal</h3>
        <p>Go to your dashboard to withdrawal your funds or reinvest </p>
        <footer style="align-content: center">&copy;FxPippette Investment </footer>
        </body>`
    },
    subject: 'Alert Notification'
};

module.exports = {verificationMail, alert, passwordRecovery};
