const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all donors (admin only)
router.get('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.*, u.email, u.status, u.created_at as joined
      FROM donors d
      JOIN users u ON d.user_id = u.id
      ORDER BY d.created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get donor profile
router.get('/profile', auth, authorize(['donor']), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors WHERE user_id = $1', [req.user.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update donor profile
router.put('/profile', auth, authorize(['donor']), [
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('phone').optional().trim(),
  body('bloodType').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  body('weight').optional().isInt({ min: 50 }),
  body('country').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { firstName, lastName, phone, bloodType, weight, country, medicalConditions } = req.body;

    const result = await pool.query(`
      UPDATE donors 
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          phone = COALESCE($3, phone),
          blood_type = COALESCE($4, blood_type),
          weight = COALESCE($5, weight),
          country = COALESCE($6, country),
          medical_conditions = COALESCE($7, medical_conditions),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $8
      RETURNING *
    `, [firstName, lastName, phone, bloodType, weight, country, medicalConditions, req.user.id]);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Schedule donation
router.post('/schedule', auth, authorize(['donor']), [
  body('hospitalId').isUUID(),
  body('scheduledDate').isISO8601(),
  body('scheduledTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { hospitalId, scheduledDate, scheduledTime, notes } = req.body;

    // Get donor info
    const donorResult = await pool.query('SELECT * FROM donors WHERE user_id = $1', [req.user.id]);
    if (donorResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Donor profile not found' });
    }

    // Create scheduled donation
    const result = await pool.query(`
      INSERT INTO scheduled_donations (donor_id, hospital_id, scheduled_date, scheduled_time, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [donorResult.rows[0].id, hospitalId, scheduledDate, scheduledTime, notes]);

    // Create notifications for hospital and admin
    const hospitalResult = await pool.query('SELECT user_id FROM hospitals WHERE id = $1', [hospitalId]);
    const adminResult = await pool.query('SELECT id FROM users WHERE user_type = $1', ['admin']);

    if (hospitalResult.rows.length > 0) {
      await pool.query(`
        INSERT INTO notifications (recipient_id, sender_id, type, title, message)
        VALUES ($1, $2, $3, $4, $5)
      `, [
        hospitalResult.rows[0].user_id,
        req.user.id,
        'donation_scheduled',
        'New Donation Scheduled',
        `${donorResult.rows[0].first_name} ${donorResult.rows[0].last_name} has scheduled a donation for ${scheduledDate} at ${scheduledTime}`
      ]);
    }

    if (adminResult.rows.length > 0) {
      await pool.query(`
        INSERT INTO notifications (recipient_id, sender_id, type, title, message)
        VALUES ($1, $2, $3, $4, $5)
      `, [
        adminResult.rows[0].id,
        req.user.id,
        'donation_scheduled',
        'Donation Scheduled - Admin Alert',
        `Donation scheduled by ${donorResult.rows[0].first_name} ${donorResult.rows[0].last_name} at hospital for ${scheduledDate} at ${scheduledTime}`
      ]);
    }

    res.status(201).json({
      success: true,
      message: 'Donation scheduled successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get donor's scheduled donations
router.get('/scheduled', auth, authorize(['donor']), async (req, res) => {
  try {
    const donorResult = await pool.query('SELECT id FROM donors WHERE user_id = $1', [req.user.id]);
    if (donorResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Donor profile not found' });
    }

    const result = await pool.query(`
      SELECT sd.*, h.hospital_name
      FROM scheduled_donations sd
      JOIN hospitals h ON sd.hospital_id = h.id
      WHERE sd.donor_id = $1
      ORDER BY sd.scheduled_date DESC, sd.scheduled_time DESC
    `, [donorResult.rows[0].id]);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;