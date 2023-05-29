const User = require("../models/user.model");
//call nodemailer here
const mailer = require("../services/mailer");

const emailValidator = require('deep-email-validator');

const {
  USERNAME_ALREADY_EXISTS_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  EMAIL_ALREADY_EXISTS_ERR,
  EMAIL_NOT_FOUND_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
} = require("../errors");

// const { checkPassword, hashPassword } = require("../utils/password.util");
const { createJwtToken } = require("../utils/token.util");

const { generateOTP } = require("../utils/otp.util");


// --------------------- create new user ---------------------------------

exports.registerUser = async (req, res, next) => {
  try {
    let { email, phone, userName, role} = req.body;


    //email validity checked on frontend

    //check duplicate email
    const userNameExist = await User.findOne({ userName });
    if (userNameExist) {
      next({ status: 400, message: USERNAME_ALREADY_EXISTS_ERR });
      return;
    }

    //check duplicate email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      next({ status: 400, message: EMAIL_ALREADY_EXISTS_ERR });
      return;
    }

    // check duplicate phone Number
    const phoneExist = await User.findOne({ phone });
    if (phoneExist) {
     return next({ status: 400, message: PHONE_ALREADY_EXISTS_ERR }); 
    }

    // create new user
    const createUser = new User({
      phone,
      userName,
      email,
      role,
    });

    // save user
    const user = await createUser.save();

    res.status(200).json({
      type: "success",
      message: "Account created",
      data: {
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};



// ----------------------login with Email OTP ---------------------

exports.loginWithEmailOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(201).json({
        status: 400,
        message: "email field is empty",
      });
      // next({ type:error, status: 400, message: "email field is empty" });
    }

    User.findOne({ email }).then(user => {
      //check if email user exists
      if (user == null) {
        return res.status(201).json({
          type: 'error',
          message: EMAIL_NOT_FOUND_ERR
      });
      }

      // generate otp
      const otp = generateOTP(6);

      // save otp to user collection
      user.emailOtp = otp;
      user.isAccountVerified = true;
      user.save();

      res.status(201).json({
        type: "success",
        message: "OTP sent to your registered Email",
        data: {
          userId: user._id,
        },
      });

      //send email
      mailer.sendEmailOtp(email, otp);
    });
  } catch (error) {
    next(error);
  }
};


//---------------- verify email OTP ---------------------------
exports.verifyEmailOtp = async (req, res, next) => {
  try {
    const { otp, userId } = req.body;
    console.log(userId)
    if (!otp) {
      return next({ status: 400, message: "OTP Field is empty" });
    }

    User.findById(userId).then(user => {
      if (user == null) {
        return next({ status: 400, message: USER_NOT_FOUND_ERR });
      }

      if (user.emailOtp !== otp) {
        return res.status(201).json({
          type: "failed",
          message: INCORRECT_OTP_ERR,
          data: {
            token: null,
            userId: null
          }
        });
      }
      const token = createJwtToken({ userId: user._id });

      user.emailOtp = "";
      user.save();

      res.status(201).json({
        type: "success",
        message: "OTP verified successfully",
        data: {
          token,
          userId: user._id,
        },
      });


    });
  } catch (error) {
    next(error);
  }
};

// --------------- fetch current user -------------------------

exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- admin access only -------------------------

exports.handleAdmin = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "Okay you are admin!!",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
