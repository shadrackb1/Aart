
import React, { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    console.log('Form submitted:', formData);
    toast.success("Thank you for your message! We'll be in touch soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageTransition>
      <div className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-black tracking-tighter text-brand-dark sm:text-6xl">Get in Touch</h1>
              <p className="mt-6 text-xl text-gray-500">
                Have a question, a comment, or a collaboration idea? We'd love to hear from you. Drop us a line, and we'll get back to you as soon as we can.
              </p>
              <div className="mt-8 flex space-x-6">
                 {/* Re-using footer icons for consistency */}
                <a href="#" className="text-gray-400 hover:text-brand-dark transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-dark transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-dark transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input type="text" name="name" id="name" required placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" name="email" id="email" required placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition" />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea name="message" id="message" rows={5} required placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"></textarea>
                </div>
                <div>
                  <Button type="submit" size="lg" className="w-full">Send Message</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
