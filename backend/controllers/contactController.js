const Contact = require('../models/contact');

// Save contact form submission
exports.saveContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Create new contact
        const contact = new Contact({
            name,
            email,
            subject: subject || '',
            message
        });

        // Save to database
        await contact.save();

        // Success response
        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                createdAt: contact.createdAt
            }
        });

    } catch (error) {
        console.error('Contact save error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

