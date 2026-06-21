import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ userEmail: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName: name,
      userEmail: email,
      userPhone: phone,
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
        _id: user._id,
        name: user.userName,
        email: user.userEmail,
        phone: user.userPhone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ userEmail: email });
    if (!userExist)
      return res.status(401).json({ error: "Invalid credentials!" });
    const passCheck = await bcrypt.compare(password, userExist.password);
    if (!passCheck)
      return res.status(401).json({ error: "Invalid credentials!" });
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
        _id: userExist._id,
        name: userExist.userName,
        email: userExist.userEmail,
        phone: userExist.userPhone,
        role: userExist.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { signUp, signIn };
