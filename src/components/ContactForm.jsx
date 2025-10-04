import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import emailjs from '@emailjs/browser';
import SEOHead from './layout/SEOHead';
import { ROUTES } from '../utils/constants';

export default function ContactForm() {
  const location = useLocation();
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedItems: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (location.state?.orderDetails) {
      setFormData(prev => ({
        ...prev,
        selectedItems: location.state.orderDetails,
        message: `Total Amount: $${location.state.totalAmount.toFixed(2)}`,
      }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Create a well-formatted email body
    const emailBody = `
New Order Request

Customer Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Order Details:
${formData.selectedItems}

Additional Message:
${formData.message}

---
This email was sent from the Ring & Rink Co. website contact form.
    `.trim();

    // Create mailto link with proper encoding
    const subject = encodeURIComponent(`New Order from ${formData.name}`);
    const body = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:ring.rink.co@gmail.com?subject=${subject}&body=${body}`;

    try {
      // Try to open the default email client
      window.location.href = mailtoUrl;
      
      // Show success message after a brief delay
      setTimeout(() => {
        setSubmitStatus('success');
        clearCart(); // Clear the cart after submission
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          selectedItems: '',
          message: '',
        });
      }, 1000);
    } catch (error) {
      console.error('Email client failed to open:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const seoProps = {
    title: 'Contact Ring & Rink Co. - Order Ringette Apparel | Warman Saskatchewan',
    description: 'Contact Ring & Rink Co. to place orders for premium ringette apparel. Serving Warman, Saskatoon, and Saskatchewan. Email ring.rink.co@gmail.com for custom orders.',
    keywords: ['contact Ring Rink Co', 'order ringette apparel', 'Warman ringette clothing', 'Saskatchewan ringette orders'],
    path: ROUTES.CONTACT
  };

  return (
    <>
      <SEOHead page={seoProps} />
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900">Contact Us</h1>
            <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
              Ready to place an order or have questions? We'd love to hear from you!
            </p>
      
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="selectedItems" className="block text-sm font-medium text-gray-700 mb-1">
                  Items Interested In *
                </label>
                <textarea
                  id="selectedItems"
                  name="selectedItems"
                  required
                  value={formData.selectedItems}
                  onChange={handleChange}
                  placeholder="Example: 1x Center T-Shirt (Adult M, Black), 1x Defense Hoodie (Youth L, Red)"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 sm:h-28 resize-vertical"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any special requests or questions?"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 sm:h-28 resize-vertical"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700">
                  <p className="font-medium text-sm sm:text-base">Order sent successfully!</p>
                  <p className="text-xs sm:text-sm mt-1">We'll get back to you soon with details about your order.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
                  <p className="font-medium text-sm sm:text-base">Failed to send order.</p>
                  <p className="text-xs sm:text-sm mt-1">Please try again or contact us directly at ring.rink.co@gmail.com</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 sm:py-4 px-4 rounded-md text-base sm:text-lg font-semibold transition duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'hover:opacity-90 active:opacity-75'
                } text-white shadow-md hover:shadow-lg`}
                style={!isSubmitting ? { backgroundColor: '#296CAC' } : {}}
              >
                {isSubmitting ? 'Sending...' : 'Send Order Request'}
              </button>
            </form>

            {/* Alternative Contact Info */}
            <div className="mt-6 sm:mt-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-2 text-sm sm:text-base">Having trouble with the form?</p>
              <p className="text-gray-700 text-sm sm:text-base">
                Email us directly at: <strong>ring.rink.co@gmail.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}