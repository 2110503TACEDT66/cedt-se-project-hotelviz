const User = require("../models/User");

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public
exports.register = async (req, res, next) => {
  try {
    const { name, tel, email, password, role } = req.body;

    //Create user
    const user = await User.create({
      name,
      tel,
      email,
      password,
      role,
    });
    //Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ success: true, token });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    if (error.message.includes("duplicate")) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }
    //console.log(error.stack);
    return res.status(400).json({
      success: false,
      message: "Cannot create User",
    });
  }
};

exports.reset = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;

    //Validate email & password
    if (!current_password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide current password" });
    }

    //Check for user
    let user = await User.findById(req.user.id).select("+password");
    if (!(await user.changePassword(current_password, new_password))) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }
    //Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ success: true, token });
    sendTokenResponse(user, 200, res);
  } catch (error) {
    //console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot change password" });
  }
};

//@desc Login user
//@route POST /api/v1/auth/login
//@access Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email & password
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide an email and password" });
  }

  //Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, msg: "Invalid credentials" });
  }

  //Create token
  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token });
  sendTokenResponse(user, 200, res);
};

//@desc Log user out / clear cookie
//@route GET /api/v1/auth/logout
//@access Private
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
};

// Cannot update password
exports.updateUser = async (req, res, next) => {
  try {
    delete req.body.password;
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!user) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { password } = req.body;

    //Validate email & password
    if (!password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide password" });
    }

    //Check for user
    let user = await User.findById(req.user.id).select("+password");
    if (!(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }

    await user.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    //console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete user" });
  }
};

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // if (process.env.NODE_ENV === "production") {
  //   options.secure = true;
  // }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
};

//@desc Get current Logged in user
//@route POST /api/v1/auth/me
//@access Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
};
