const { createUser } = require('../services/userService');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { randomNum, send2FACode } = require('../services/2faService');

const signup = (req, res) => {
    res.render('signup');
}

const signin = (req, res) => {
    res.render('signin');
}


const createUserController = async (req, res) => {
    try {

        console.log(req.body);

        if (!req.body.first_name || !req.body.last_name) {
            return res.status(400).json({ message: "user firstname or lastname is required" });
        }

        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "user email or password is required" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);

        req.body.password = hashedPassword;

        console.log(req.body);

        const user = await createUser(req.body);

        (user) ? console.log("user created successfully") : console.log("user is not created");

        res.redirect("/");

    }
    catch (err) {
        console.log(new Error(err));
    }
}

const loginController = async (req, res) => {
    try {
        console.log(req.body);

        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ message: "User email or password is required" });
        }

        // Await the result of the database query to get the actual user object
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.json({ message: "User is not signed up" });
        }

        const userPassword = user.password;
        const isMatched = await bcrypt.compare(password, userPassword);

        req.session.user = user;
        if (user && isMatched) {
            const genaratedCode = randomNum();
            req.session.twoFactorCode = genaratedCode;
            req.session.timeStamp = Date.now();
            await send2FACode(req.session.user.email, genaratedCode);
            return res.redirect("/2fa");
        }

        // req.session.user.totalFileUpload = 0;
        // console.log(req.session.user);
        // res.redirect('/file');
        res.send('Invalid Server Error');
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'An error occurred during login' });
    }
};


const twofaPage = (req, res) => {
    const email = req.session.user.email;
    res.render("2fa_page.ejs", { email: email });
}

const verify2faPage = async (req, res) => {
    try {
        console.log(req.body)
        const { code } = req.body;
        const currentTime = Date.now();
        const fiveMinute = 300000;


        console.log("session code : " + req.session.twoFactorCode + " type : " + typeof req.session.twoFactorCode);

        console.log("code " + code + " type : " + typeof code);

        if (code === req.session.twoFactorCode.toString() && ((currentTime - req.session.timeStamp) <= fiveMinute)) {
            req.session.twoFactorCode = null;
            req.session.timeStamp = null;
            return res.redirect('/file');
        }

        return res.status(401).json({ message: "error 2fa code.Please try again" });
    }
    catch (err) {
        console.log(new Error("2fa code checking problem"));
    }
}


const resendOtp = async (req, res) => {
    try {
        const email = req.session.user.email;
        const genaratedCode = randomNum();
        req.session.twoFactorCode = genaratedCode;
        req.session.timeStamp = Date.now();
        await send2FACode(email, genaratedCode);
        res.redirect('/2fa');
    }
    catch (err) {
        console.log(err);
    }
}
const homepage = async (req, res) => {
    const user = req.session.user;
    console.log(user);
    const fullname = user.first_name + ' ' + user.last_name;
    const appName = "File Uploader"
    const total = req.session.user.totalFileUpload;
    res.render('homepage.ejs', { name: fullname, appName: appName, total: total });
}

module.exports = { signup, signin, createUserController, loginController, homepage, twofaPage, verify2faPage };