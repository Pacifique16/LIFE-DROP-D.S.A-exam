const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all blood requests
router.get('/', auth, async (req, res) => {
  try {
    const { status, bloodType, priority } = req.query;
    
    let query = `
      SELECT br.*, h.hospital_name, h.address
      FROM blood_requests br
      JOIN hospitals h ON br.hospital_id = h.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND br.status = $${paramCount}`;
      params.push(status);
    }

    if (bloodType) {
      paramCount++;
      query += ` AND br.blood_type = $${paramCount}`;
      params.push(bloodType);
    }

    if (priority) {
      paramCount++;
      query += ` AND br.priority = $${paramCount}`;
      params.push(priority);
    }

    query += ' ORDER BY br.created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create blood request (hospital only)
router.post('/', auth, authorize(['hospital']), [
  body('bloodType').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  body('unitsNeeded').isInt({ min: 1 }),
  body('priority').isIn(['normal', 'urgent', 'emergency']),
  body('neededBy').isISO8601(),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { bloodType, unitsNeeded, priority, neededBy, description } = req.body;

    // Get hospital ID
    const hospitalResult = await pool.query('SELECT id FROM hospitals WHERE user_id = $1', [req.user.id]);
    if (hospitalResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital profile not found' });
    }

    // Create blood request
    const result = await pool.query(`
      INSERT INTO blood_requests (hospital_id, blood_type, units_needed, priority, needed_by, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [hospitalResult.rows[0].id, bloodType, unitsNeeded, priority, neededBy, description]);

    // Notify matching donors
    const donorResult = await pool.query(`
      SELECT u.id as user_id, d.first_name, d.last_name
      FROM donors d
      JOIN users u ON d.user_id = u.id
      WHERE d.blood_type = $1 AND u.status = 'active'
    `, [bloodType]);

    const hospitalInfo = await pool.query('SELECT hospital_name FROM hospitals WHERE id = $1', [hospitalResult.rows[0].id]);

    for (const donor of donorResult.rows) {
      await pool.query(`
        INSERT INTO notifications (recipient_id, sender_id, type, title, message)
        VALUES ($1, $2, $3, $4, $5)
      `, [
        donor.user_id,
        req.user.id,
        'blood_request',
        `${priority.toUpperCase()}: ${bloodType} Blood Needed`,
        `${hospitalInfo.rows[0].hospital_name} needs ${unitsNeeded} units of ${bloodType} blood. Priority: ${priority}`
      ]);
    }

    res.status(201).json({
      success: true,
      message: 'Blood request created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update blood request status
router.put('/:id/status', auth, authorize(['hospital', 'admin']), [
  body('status').isIn(['pending', 'fulfilled', 'rejected', 'expired'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Check if user owns this request (for hospitals)
    let query = 'UPDATE blood_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    const params = [status, id];

    if (req.user.user_type === 'hospital') {
      const hospitalResult = await pool.query('SELECT id FROM hospitals WHERE user_id = $1', [req.user.id]);
      if (hospitalResult.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Hospital profile not found' });
      }
      query += ' AND hospital_id = $3';
      params.push(hospitalResult.rows[0].id);
    }

    query += ' RETURNING *';

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Blood request not found' });
    }

    res.json({
      success: true,
      message: 'Blood request status updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get blood requests for specific hospital
router.get('/hospital', auth, authorize(['hospital']), async (req, res) => {
  try {
    const hospitalResult = await pool.query('SELECT id FROM hospitals WHERE user_id = $1', [req.user.id]);
    if (hospitalResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital profile not found' });
    }

    const result = await pool.query(`
      SELECT * FROM blood_requests 
      WHERE hospital_id = $1 
      ORDER BY created_at DESC
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