import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { userName, userEmail, password, userPhone } = req.body;

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      userEmail,
      userPhone,
      password: hashPassword,
      role: "user",
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.userEmail,
        role: user.role,
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token: token,
      user: {
        id: user._id,
        name: user.userName,
        email: user.userEmail,
        phone: user.userPhone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const signIn = async (req, res) => {
  const { userEmail, password } = req.body;
  const userExist = await User.findOne({ userEmail });
  if (!userExist)
    return res.status(401).json({ message: "Invalid credential !" });
  const passCheck = await bcrypt.compare(password, userExist.password);
  if (!passCheck)
    return res.status(401).json({ message: "Invalid credential !" });
  const token = jwt.sign(
    { id: userExist._id, email: userExist.userEmail, role: userExist.role },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "7d" }
  );
  res.status(200).json({
    success: true,
    message: "Login successful!",
    token,
    user: {
      id: userExist._id,
      name: userExist.userName,
      email: userExist.userEmail,
      phone: userExist.userPhone,
      role: userExist.role,
    },
  });
};

export { signUp, signIn };
