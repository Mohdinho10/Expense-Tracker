import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // multer stores the file info here:
  const file = req.file;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  let profileImageUrl = null;
  if (file) {
    // Assuming your static files are served from /uploads
    profileImageUrl = `/uploads/${file.filename}`;
  }

  const user = await User.create({
    username,
    email,
    password,
    profileImageUrl,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  generateToken(res, user);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profileImageUrl: user.profileImageUrl || null,
  });
});

// @desc    Auth user & get token
// @route   POST  /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if email and password does not exists
  if (!email || !password) {
    throw new Error("Please provide email and password", 401);
  }

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImageUrl: user.profileImageUrl || null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // exclude password

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profileImageUrl: user.profileImageUrl || null,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // expires immediately
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.status(200).json({ message: "Logged out successfully" });
});
