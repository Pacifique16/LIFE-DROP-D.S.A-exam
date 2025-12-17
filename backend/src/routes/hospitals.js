const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all hospitals
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT h.*, u.email, u.status
      FROM hospitals h
      JOIN users u ON h.user_id = u.id
      WHERE u.status = 'active'
      ORDER BY h.hospital_name
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

// Get hospital profile
router.get('/profile', auth, authorize(['hospital']), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hospitals WHERE user_id = $1', [req.user.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital profile not found' });
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

// Update hospital profile
router.put('/profile', auth, authorize(['hospital']), [
  body('hospitalName').optional().trim().isLength({ min: 1 }),
  body('facilityType').optional().trim(),
  body('address').optional().trim(),
  body('contactPerson').optional().trim(),
  body('phone').optional().trim(),
  body('country').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { hospitalName, facilityType, address, contactPerson, phone, country } = req.body;

    const result = await pool.query(`
      UPDATE hospitals 
      SET hospital_name = COALESCE($1, hospital_name),
          facility_type = COALESCE($2, facility_type),
          address = COALESCE($3, address),
          contact_person = COALESCE($4, contact_person),
          phone = COALESCE($5, phone),
          country = COALESCE($6, country),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $7
      RETURNING *
    `, [hospitalName, facilityType, address, contactPerson, phone, country, req.user.id]);

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

// Get blood inventory
router.get('/inventory', auth, authorize(['hospital']), async (req, res) => {
  try {
    const hospitalResult = await pool.query('SELECT id FROM hospitals WHERE user_id = $1', [req.user.id]);
    if (hospitalResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital profile not found' });
    }

    const result = await pool.query(`
      SELECT * FROM blood_inventory 
      WHERE hospital_id = $1 
      ORDER BY blood_type, expiration_date
    `, [hospitalResult.rows[0].id]);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update blood inventory
router.post('/inventory', auth, authorize(['hospital']), [
  body('bloodType').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  body('unitsAvailable').isInt({ min: 0 }),
  body('expirationDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { bloodType, unitsAvailable, expirationDate } = req.body;

    const hospitalResult = await pool.query('SELECT id FROM hospitals WHERE user_id = $1', [req.user.id]);
    if (hospitalResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital profile not found' });
    }

    const result = await pool.query(`
      INSERT INTO blood_inventory (hospital_id, blood_type, units_available, expiration_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [hospitalResult.rows[0].id, bloodType, unitsAvailable, expirationDate]);

    res.status(201).json({
      success: true,
      message: 'Inventory updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get scheduled donations for hospital
router.get('/scheduled-donations', auth, authorize(['hospital']), async (req, res) => {
  try {
    const hospitalResult = await pool.query('SELECT id FROM hospitals WHERE user_id = $1', [req.user.id]);
    if (hospitalResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital profile not found' });
    }

    const result = await pool.query(`
      SELECT sd.*, d.first_name, d.last_name, d.blood_type, d.phone
      FROM scheduled_donations sd
      JOIN donors d ON sd.donor_id = d.id
      WHERE sd.hospital_id = $1
      ORDER BY sd.scheduled_date DESC, sd.scheduled_time DESC
    `, [hospitalResult.rows[0].id]);

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