import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const updateQuantity = (index, qty) => {
    if (qty < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = qty;
    setCart(updatedCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-green-700">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white shadow rounded p-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600 hover:text-red-800 text-sm ml-4"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4 font-bold text-green-700 text-lg">
            Total: ₹{getTotal()}
          </div>

          <div className="text-right mt-4">
            <Link
              to="/checkout"
              className="inline-block bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
