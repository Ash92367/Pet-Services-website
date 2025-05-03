import usermodel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Function to create a JWT token
const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login user function
const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = createtoken(user._id);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Server error occurred' });
  }
};

// Register user function
const registeruser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await usermodel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Enter a valid email' });
    }

    if (password.length < 10) {
      return res.status(400).json({ success: false, message: 'Enter a strong password with at least 10 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);

    const newuser = new usermodel({ name, email, password: hashedpass });
    const user = await newuser.save();

    const token = createtoken(user._id);
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Server error occurred' });
  }
};

export { registeruser, loginuser };
