const User = require("../models/user.model");
const { USER_NOT_FOUND_ERR } = require("../errors");

exports.registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const userName = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const role = req.body.role;
    // const { userName, phone, email, role } = req.body; // create a new user instance

    const user = new User({
      userName,
      email,
      phone,
      role,
    });
    user
      .save()
      .then((result) => {
        console.log(result);
        console.log("Success");
        res.status(201).json({
          message: "User created successfully",
          userId: result._id,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
  } catch (error) {
    next(error);
  }
};
//  update user
exports.updateUser = async (req, res, next) => {
  try {
    const userData = req.body;
    // console.log(userData);
    const id = req.body.id;
    //Update user in database
    User.findByIdAndUpdate(id, userData, { new: true })
      .then((updatedUser) => {
        console.log(updatedUser);
        res.json(updatedUser);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    User.findOneAndDelete({ _id: id })
      .then((resp) => {
        console.log(resp);
        res.json(resp);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    next(error);
  }
};

exports.fetchUsers = async (req, res, next) => {
  try {
    User.find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    next(error);
  }
};
exports.getUserById = (req, res, next) => {
  try {
    let id = req.params.id;

    User.findById(id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        next({ status: 400, message: USER_NOT_FOUND_ERR });
      });
  } catch (error) {
    next(error);
  }
};
