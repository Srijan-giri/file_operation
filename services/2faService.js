const { transporter } = require('../config/nodemailerConfiguration');

const randomNum = () => { return Math.floor(100000 + Math.random() * 900000) };


const send2FACode = async (email, code) => {
    const mailOptions = {
        from: "srijangiri2003@gmail.com",
        to: email,
        subject: "2FA Verification Code",
        text: `Your 2FA verification code is ${code}`
    }

    await transporter.sendMail(mailOptions);
}

module.exports = { randomNum, send2FACode }
