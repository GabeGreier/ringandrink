import SEOHead from './layout/SEOHead';

export default function PaymentShipping() {
  const seoProps = {
    title: 'Order & Delivery Information - Ring & Rink Co. | Shipping & Pickup',
    description: 'Learn about our shipping, pickup, payment, and return policies for ringette apparel orders. Free pickup in Warman and Saskatoon, $20 flat rate shipping.',
    keywords: ['ringette shipping', 'order info', 'payment policy', 'Saskatchewan pickup', 'delivery information'],
    path: '/order-delivery-info'
  };

  return (
    <>
      <SEOHead page={seoProps} />
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order & Delivery Info</h1>
        
        {/* Pickup Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pickup</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We offer local pickup from Warman and Saskatoon rinks.
            </p>
            <p className="text-gray-700">
              Please select your preferred location at checkout. You'll receive a notification with pickup instructions, including when and where to collect your items.
            </p>
          </div>
        </section>

        {/* Shipping Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
                            We ship via Canada Post with a flat rate of $20 CAD. Shipping is only available within Canada. We are only shipping Canada wide.
            </p>
            <p className="text-gray-700">
              Please double-check your shipping address before submitting your order. Any undeliverable packages due to incorrect address information will be reshipped at the buyer's expense. 
            </p>
          </div>
        </section>

        {/* Processing Time */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Processing Time</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700">
              Orders are processed every 2 weeks.
            </p>
          </div>
        </section>

        {/* Payment Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We accept e-transfer only.
            </p>
            <p className="text-gray-700">
              E-transfers must be sent prior to processing to:<br />
              <strong>ring.rink.co@gmail.com</strong>
            </p>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Returns</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700">
              All sales are FINAL as these are custom items made to order. We are unable to offer refunds or exchanges.
            </p>
          </div>
        </section>

        {/* Questions */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Questions?</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700">
              Send us an email at <strong>ring.rink.co@gmail.com</strong> and we'll be happy to help!
            </p>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}