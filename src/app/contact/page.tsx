'use client';
import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailService from "@/services/EmailService";

const emailService = new EmailService();

const Contact = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    subject: ''
  });

  const supportEmail = process.env.NEXT_PUBLIC_MAIL_SENDER;

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);

    try {
      const contact = {
        to: supportEmail,
        email: formData.email,
        subject: formData.subject,
        text: formData.message,
      };

      const response = await emailService.sendContact(contact);
      setMessage(response);
      setFormData({ email: '', message: '', subject: '' }); // Reset form

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setMessage("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"min-h-screen"}>
      <Header />
      <div className="bg-gradient-to-br from-blue-900 via-gray-900 to-teal-900 ">
        <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12 text-white">
          <div className="flex flex-col items-center text-center mb-16">
            <section className="bg-gradient-to-r from-pink-400 to-yellow-300 p-1 rounded-xl mb-8 inline-block">
              <h1 className="text-4xl md:text-5xl font-bold bg-gray-900 px-8 py-4 rounded-lg">
                Contact Us
              </h1>
            </section>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Need help? We&#39;re here for you
            </p>

            <form onSubmit={handleSubmit}
                  className="text-black bg-gray-800 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm flex flex-col w-full text-left sm:max-w-xs md:max-w-2xl gap-y-6 mt-4 transition-all duration-300 hover:bg-opacity-60">

              {message && (
                <div className={`p-4 rounded-lg ${message.includes('Failed') ? 'bg-red-500' : 'bg-green-500'} text-white text-center transition-all duration-300`}>
                  {message}
                </div>
              )}

              <div className="relative">
                <label htmlFor="email" className="text-white text-sm mb-1 block">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              <div className="relative">
                <label htmlFor="subject" className="text-white text-sm mb-1 block">Subject</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="" disabled> Select subject</option>
                  <option value="Support">Support</option>
                  <option value="Sales">Sales</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="message" className="text-white text-sm mb-1 block">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  rows={4}
                  className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none resize-vertical"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center mx-auto disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block animate-pulse">Sending...</span>
                ) : (
                  'Send'
                )}
              </button>
            </form>

            <section className="flex flex-col text-left items-center mt-8 gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-white font-semibold">Support Email:</h3>
                <a href={`mailto:${supportEmail}`} className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  {supportEmail}
                </a>
              </div>
              <p className="text-gray-300">We respond within 24-48 hours</p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
