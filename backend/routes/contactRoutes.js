const express = require('express');
const router = express.Router();
const { saveContact } = require('../controllers/contactController');

// POST route for contact form submission
router.post('/submit', saveContact);

module.exports = router;