import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
const { email } = typeof process.env.service === 'string' ? JSON.parse(process.env.service) : process.env.service;
const sendEmail = async (to, verifyCode) => {
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: email.email,
                pass: email.password,
            },
        }),
    );

    const mailOptions = {
        from: `"Galaxtic Store" <${email.email}>`,
        to: to,
        subject: 'Verify Email',

        html: `<b>Please press "Verify" button to verify your email.</b><div style="margin-top:20px"><a href="${email.verifyUrl}?verify_code=${verifyCode}"><button style="box-sizing:border-box;outline:currentcolor none medium;font-stretch:normal;line-height:22px;font-weight:700;display:inline-block;vertical-align:baseline;text-decoration-line:none!important;padding:15px 45px;font-style:normal;font-size:14px;line-height:14px;letter-spacing:2px;text-transform:uppercase;background:linear-gradient(180deg,#3b82f6 17.14%,#1555bd 76.68%);border-radius:15px;border:2px solid #232323;color:#ffffff"><b>Verify</b></button></a></div>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
};

const sendEmailChangePass = async (to, verifyCode) => {
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: email.email, // your email
                pass: email.password, // your email password
            },
        }),
    );

    const mailOptions = {
        from: `"Galaxtic Store" <${email.email}>`,
        to: to,
        subject: 'Change Password',

        html: `<b>Please press "Change Password" button to change your password</b><div style="margin-top:20px"><a href="${email.changePassUrl}?verify_code=${verifyCode}"><button style="box-sizing:border-box;outline:currentcolor none medium;font-stretch:normal;line-height:22px;font-weight:700;display:inline-block;vertical-align:baseline;text-decoration-line:none!important;padding:15px 45px;font-style:normal;font-size:14px;line-height:14px;letter-spacing:2px;text-transform:uppercase;background:linear-gradient(180deg,#3b82f6 17.14%,#1555bd 76.68%);border-radius:15px;border:2px solid #232323;color:#ffffff"><b>Change Password</b></button></a></div>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
};

export { sendEmail, sendEmailChangePass };
