import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import SEOHead from './layout/SEOHead';
import { ROUTES } from '../utils/constants';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [shippingOption, setShippingOption] = useState('pickup');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada'
  });

  const shippingCost = shippingOption === 'shipping' ? 20 : 0;
  const totalWithShipping = getCartTotal() + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone'];
    if (shippingOption === 'shipping') {
      required.push('address', 'city', 'province', 'postalCode');
    }
    
    for (let field of required) {
      if (!customerInfo[field].trim()) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;

    // Create order summary for email form
    const orderSummary = cartItems
      .map(item => {
        const colorInfo = item.colorName ? `, Color: ${item.colorName}` : '';
        return `${item.quantity}x ${item.name} (Size: ${item.size}${colorInfo}) - $${(item.price * item.quantity).toFixed(2)} CAD`;
      })
      .join('\n');

    const shippingInfo = shippingOption === 'shipping' 
      ? `\n\nSHIPPING ADDRESS:\n${customerInfo.firstName} ${customerInfo.lastName}\n${customerInfo.address}\n${customerInfo.city}, ${customerInfo.province} ${customerInfo.postalCode}\n${customerInfo.country}\n\n*Shipping only available within Canada*`
      : '\n\nPICKUP SELECTED (Free)';

    const customerDetails = `\n\nCUSTOMER INFORMATION:\nName: ${customerInfo.firstName} ${customerInfo.lastName}\nEmail: ${customerInfo.email}\nPhone: ${customerInfo.phone}`;

    const fullOrderDetails = `ORDER SUMMARY:\n${orderSummary}\n\nSubtotal: $${getCartTotal().toFixed(2)} CAD\nShipping: ${shippingOption === 'shipping' ? '$20.00 CAD' : 'Free (Pickup)'}\nTotal: $${totalWithShipping.toFixed(2)} CAD${shippingInfo}${customerDetails}`;

    // Navigate to contact form with order details
    navigate('/contact', {
      state: {
        orderDetails: fullOrderDetails,
        totalAmount: totalWithShipping,
        customerInfo: customerInfo,
        shippingOption: shippingOption
      },
    });
  };

  const seoProps = {
    title: 'Shopping Cart - Ring & Rink Co. | Review Your Order',
    description: 'Review your ringette apparel order and proceed to checkout. Secure ordering with pickup or shipping options available.',
    keywords: ['ringette cart', 'checkout ringette apparel', 'order ringette clothing'],
    path: ROUTES.CART
  };

  if (cartItems.length === 0) {
    return (
      <>
        <SEOHead page={seoProps} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Your Cart</h1>
          <p className="text-lg text-gray-600">Just like the net, your cart's wide open.</p>
          <button
            onClick={() => navigate('/store')}
            className="mt-6 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#296CAC' }}
          >
            Continue Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead page={seoProps} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Your Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Size: {item.size}</p>
                {item.colorName && (
                  <p className="text-gray-600">Color: {item.colorName}</p>
                )}
                <p className="text-gray-600">${item.price.toFixed(2)} CAD</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Customer Information Form */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={customerInfo.firstName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={customerInfo.lastName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={customerInfo.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={customerInfo.phone}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
      </div>

      {/* Shipping Options */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Delivery Method</h2>
        <div className="space-y-4 mb-6">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="shipping"
              value="pickup"
              checked={shippingOption === 'pickup'}
              onChange={(e) => setShippingOption(e.target.value)}
              className="text-blue-600"
            />
            <div>
              <div className="font-medium">Pickup (Free)</div>
              <div className="text-sm text-gray-600">Arrange pickup at our location</div>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="shipping"
              value="shipping"
              checked={shippingOption === 'shipping'}
              onChange={(e) => setShippingOption(e.target.value)}
              className="text-blue-600"
            />
            <div>
              <div className="font-medium">Shipping ($20 CAD Flat Rate)</div>
              <div className="text-sm text-gray-600">Delivered to your address (Canada only)</div>
            </div>
          </label>
        </div>

        {/* Shipping Address Form */}
        {shippingOption === 'shipping' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="address"
                placeholder="Street Address *"
                value={customerInfo.address}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="province"
                  placeholder="Province *"
                  value={customerInfo.province}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code *"
                  value={customerInfo.postalCode}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <select
                name="country"
                value={customerInfo.country}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)} CAD</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>{shippingOption === 'shipping' ? 'Shipping:' : 'Pickup:'}</span>
            <span>{shippingOption === 'shipping' ? '$20.00 CAD' : 'Free'}</span>
          </div>
          <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${totalWithShipping.toFixed(2)} CAD</span>
          </div>
        </div>
        
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => navigate('/store')}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleCheckout}
            className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#296CAC' }}
          >
            Proceed to Order
          </button>
        </div>
      </div>
      </div>
    </>
  );
}