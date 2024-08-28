import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// login the user
export const login = async (req, res, next) => {
  try {
    // fetch data from User
    const { email, password } = req.body;

    // Check User exit or not
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// create the user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(name,email,password);

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

// get all task by userId
export const getUserAllTask = async (req, res) => {

  console.log(req.user._id);
  const user = await User.findById(req.user._id).populate(User)

  res.status(200).json({
    success: true,
    user: user,
  });
};

// get user profile
export const getMyProfile = async (req, res) => {

  console.log(req.user._id);
  const user = await User.findById(req.user._id)

  res.status(200).json({
    success: true,
    user: user,
  });
};

// logout the user
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
