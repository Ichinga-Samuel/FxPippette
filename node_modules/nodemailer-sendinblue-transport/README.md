# Sendinblue Transport Module for Nodemailer

This module applies for [Nodemailer](http://www.nodemailer.com/) v1+ and provides a transport for [Sendinblue](https://www.sendinblue.com).

## Usage

Install with npm

    npm install nodemailer-sendinblue-transport

Require the module

```javascript
var nodemailer = require('nodemailer');
var sendinBlue = require('nodemailer-sendinblue-transport');
```

Create a Nodemailer transporter

```javascript
var transporter = nodemailer.createTransport(sendinBlue(options))
```

### Available Options

* **apiKey** - API key (required)
* **apiUrl** - API url, default <https://api.sendinblue.com/v2.0>

## License

**MIT**
