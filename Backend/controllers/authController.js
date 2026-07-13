import userValidation from "../middleware/userMiddleware.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"
import User from "../models/userModel.js"
import RefreshToken from "../models/refreshTokenModel.js";
const ACCESS_TOKEN_EXPIRE_DATE = process.env.ACCESS_TOKEN_EXPIRE_DATE;
const REFRESH_TOKEN_EXPIRE_DATE = process.env.REFRESH_TOKEN_EXPIRE_DATE;
const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY;
const REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PEIVATE_KEY;
const REFRESH_TOKEN_PUBLIC_KEY = process.env.REFRESH_TOKEN_PUBLIC_KEY;
const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY;

const cookieOption = {
  sameSite: "lax",
  httpOnly: true,
  secure: false
};

export const signUp = async (req, res, next) => {
  try {
    const { full_name, email, password, phone, address} = req.body;
    const { error } = userValidation.validate(req.body);

    if (error) {
      const error = new Error("invalid input");
      error.statusCode = 400;
      throw error;
    }

    if (!full_name || !email || !password || !phone || !address) {
      const error = new Error("all information is  required");
      error.statusCode = 400;
      throw error;
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      const error = new Error("user has already exist");
      error.statusCode = 409;
      throw error;
    }

    if (password.length < 8) {
      const error = new Error("password is not strong");
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      full_name,
      email,
      phone,
      address,
      role:User.role || "user",
      password: hashedPassword
    });

    const accessToken = jwt.sign(
      { user_id: newUser._id },
      ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: ACCESS_TOKEN_EXPIRE_DATE }
    );

    const refreshToken = jwt.sign(
      { user_id: newUser._id },
      REFRESH_TOKEN_PRIVATE_KEY,
      { algorithm: "HS256", expiresIn: REFRESH_TOKEN_EXPIRE_DATE }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      ...cookieOption
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      ...cookieOption
    });

    const hashedRefreshToken = await crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    let expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 90);

    await RefreshToken.create({
      user_id: newUser._id,
      refreshToken: hashedRefreshToken,
      expires_at
    });

    const userObject = newUser.toObject();
    delete userObject.password;

    res.status(201).json({
      message: "successfuly signup",
      success: true,
      data: {
        accessToken,
        refreshToken,
        userObject
      }
    });
  } catch (error) {
    next(error);
  }
};
