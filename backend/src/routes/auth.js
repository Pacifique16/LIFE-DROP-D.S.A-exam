const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('userType').isIn(['donor', 'hospital']),
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('hospitalName').optional().trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, userType, firstName, lastName, hospitalName, phone, bloodType, dateOfBirth, weight, country, licenseNumber, facilityType, address, contactPerson } = req.body;

    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userResult = await pool.query(
      'INSERT INTO users (email, password_hash, user_type) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, userType]
    );

    const user = userResult.rows[0];

    // Create profile based on user type
    if (userType === 'donor') {
      await pool.query(
        'INSERT INTO donors (user_id, first_name, last_name, phone, date_of_birth, blood_type, weight, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [user.id, firstName, lastName, phone, dateOfBirth, bloodType, weight, country]
      );
    } else if (userType === 'hospital') {
      await pool.query(
        'INSERT INTO hospitals (user_id, hospital_name, license_number, facility_type, address, contact_person, phone, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [user.id, hospitalName, licenseNumber, facilityType, address, contactPerson, phone, country]
      );
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, userType: user.user_type }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, userType: user.user_type }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    let profile = null;
    
    if (req.user.user_type === 'donor') {
      const result = await pool.query('SELECT * FROM donors WHERE user_id = $1', [req.user.id]);
      profile = result.rows[0];
    } else if (req.user.user_type === 'hospital') {
      const result = await pool.query('SELECT * FROM hospitals WHERE user_id = $1', [req.user.id]);
      profile = result.rows[0];
    }

    res.json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        userType: req.user.user_type,
        profile
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;