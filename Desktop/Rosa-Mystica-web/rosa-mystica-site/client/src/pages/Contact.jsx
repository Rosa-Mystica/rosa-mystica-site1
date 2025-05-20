import { useState } from 'react';
import axios from '../utils/axios'; // adjust path as needed


function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await axios.post('http://localhost:5001/api/contact', form);
      setMsg('✅ Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setMsg('❌ Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-maroon-700 mb-4">📞 Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Got a question? Need help? Want to collaborate? We'd love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <button
            type="submit"
            className="bg-white text-red-950 border border-black px-6 py-2 rounded hover:bg-green-700 transition"
          >
            ✉️ Send Message
          </button>
          {msg && <p className="text-sm mt-2">{msg}</p>}
        </form>

        {/* Google Maps Embed */}
        <div>
          <h2 className="text-xl font-semibold text-maroon-800 mb-2">📍 Our Location</h2>
          <div className="rounded overflow-hidden shadow">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.110504622909!2d78.05204917547443!3d30.32737240377025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092908cf0b45a7%3A0x4aafc89c83b65b49!2s76%2C%201%2C%20Rajpur%20Rd%2C%20Karanpur%2C%20Dehradun%2C%20Uttarakhand%20248001!5e0!3m2!1sen!2sin!4v1716130000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
