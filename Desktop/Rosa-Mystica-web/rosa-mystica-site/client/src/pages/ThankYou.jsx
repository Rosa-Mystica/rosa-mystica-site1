import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function ThankYou() {
  useEffect(() => {
    document.title = 'Order Confirmed | Rosa Mystica India';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md">
        <div className="text-4xl mb-4 text-green-600">✅</div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">Thank you for your order!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You’ll receive a confirmation email shortly.
        </p>
        <Link
          to="/products"
          className="inline-block bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
