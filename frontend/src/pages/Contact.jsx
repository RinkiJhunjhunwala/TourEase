import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Use your backend URL - adjust if needed
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill all required fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to send message');
            }

            // Success
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitted(false), 3000);

        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                        Have a question or feedback? We'd love to hear from you. Our team is here to help!
                    </p>
                </div>
            </div>

            {/* Contact Info & Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <ContactInfoCard
                        icon={<Mail className="w-8 h-8" />}
                        title="Email"
                        content="support@tourease.com"
                        color="bg-blue-100 text-blue-600"
                    />
                    <ContactInfoCard
                        icon={<Phone className="w-8 h-8" />}
                        title="Phone"
                        content="+1 (555) 123-4567"
                        color="bg-green-100 text-green-600"
                    />
                    <ContactInfoCard
                        icon={<MapPin className="w-8 h-8" />}
                        title="Address"
                        content="San Francisco, CA, USA"
                        color="bg-orange-100 text-orange-600"
                    />
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Send us a Message</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Fields marked with <span className="text-red-500">*</span> are required
                    </p>

                    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl">
                        {/* Success Message */}
                        {submitted && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                ✅ Thank you! Your message has been sent successfully.
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                ❌ {error}
                            </div>
                        )}

                        {/* Name Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                placeholder="Your name"
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                placeholder="your.email@example.com"
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* Subject Field (Optional) */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Subject <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                placeholder="How can we help?"
                                disabled={loading}
                            />
                        </div>

                        {/* Message Field */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                placeholder="Tell us more about your inquiry..."
                                disabled={loading}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Rest of your existing components */}
            {/* ... */}
        </div>
    );
}

// Helper components (keep as is)
function ContactInfoCard({ icon, title, content, color }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
            <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600">{content}</p>
        </div>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="bg-white p-6 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left font-semibold text-lg hover:text-teal-600 transition flex items-center justify-between"
            >
                {question}
                <span className={`transition transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <p className="text-gray-600 mt-4">{answer}</p>}
        </div>
    );
}