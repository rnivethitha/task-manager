const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ========================
// REGISTER
// ========================
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create user
    user = await User.create({
      name,
      email,
      password: hash
    });

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('REGISTER ERROR:', err);

    res.status(500).json({
      msg: 'Server error',
      error: err.message
    });
  }
};

// ========================
// LOGIN
// ========================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // create JWT TOKEN (IMPORTANT PART)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('LOGIN ERROR:', err);

    res.status(500).json({
      msg: 'Server error',
      error: err.message
    });
  }
};