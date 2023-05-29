const nodemailer =require("nodemailer");
var fs = require('fs');
const Handlebars = require('handlebars');
// const { response } = require("express");
// const { SubscribeRulesList } = require("twilio/lib/rest/video/v1/room/roomParticipant/roomParticipantSubscribeRule");
require('dotenv').config();

let transporter;

var readHTMLFile = function(path, callback) {
	fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
		if (err) {
			callback(err);
		} else {
			callback(null, html);
		}
	});
};

transporter = nodemailer.createTransport({
    host: process.env.smtphost,
    port: parseInt(process.env.smtphost),
    secure: parseInt(process.env.secure),
    auth: {
        user: process.env.service_mail,
        pass: process.env.service_password
    }
});

module.exports.sendEmailOtp = function(recepient,otp){
    readHTMLFile(__dirname + '/mail-temp/loginVer.html', function(err,html){
        if(err){
            console.log('error reading file',err);
            return;
        }
        var template = Handlebars.compile(html);
        var replacements ={
            subject: "Login Verification",
            otp : otp
        };
        var htmlToSend = template(replacements);
        let mailoptions ={
            from: process.env.service_mail,
            to:recepient,
            subject: "login verification",
            html:htmlToSend,
            txt: ''
        };
        transporter.sendMail(mailoptions, (error, info) => {
            if (error){
                console.log(error);
                return error;
            }else{ 
                console.log("message sent : %s\n",info.response);
                return 'success';
            }
        });
    })
    
}

