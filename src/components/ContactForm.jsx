import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ContactForm() {
  const location = useLocation();
  const { clearCart } = useCart();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedItems: '',
    message: '',
  });

  useEffect(() => {
    if (location.state?.orderDetails) {
      setFormData(prev => ({
        ...prev,
        selectedItems: location.state.orderDetails,
        message: `Total Amount: $${location.state.totalAmount.toFixed(2)} CAD`,
      }));
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate unique order number
    const orderNumber = `RR${Date.now().toString().slice(-8)}`;
    
    // Show success popup
    setShowSuccessPopup(true);
    
    // Hide popup after 4 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 4000);
    
    // Here you would typically send this to your email
    const mailtoBody = `Order Number: ${orderNumber}%0D%0A%0D%0AName: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ASelected Items: ${formData.selectedItems}%0D%0AMessage: ${formData.message}%0D%0A%0D%0ANote: Delivery only available within Canada`;
    const mailtoLink = `mailto:ring.rink.co@gmail.com?subject=New Order from ${formData.name} - Order #${orderNumber}&body=${mailtoBody}`;
    clearCart(); // Clear the cart after submitting the order
    window.location.href = mailtoLink;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowSuccessPopup(false)}></div>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative z-10 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Order Submitted!</h3>
                <p className="text-sm text-gray-600 mt-1">
                  We'll get back to you about your order, details, and shipping
                </p>
              </div>
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="selectedItems" className="block text-sm font-medium text-gray-700 mb-1">
            Items Interested In
          </label>
          <textarea
            id="selectedItems"
            name="selectedItems"
            required
            value={formData.selectedItems}
            onChange={handleChange}
            placeholder="Example: 1x Classic T-Shirt (Size M), 2x Cozy Sweater (Size L)"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
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
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white py-3 px-4 rounded-md hover:opacity-90 transition duration-200"
          style={{ backgroundColor: '#296CAC' }}
        >
          Send Order Request
        </button>
      </form>
    </div>
  );
}