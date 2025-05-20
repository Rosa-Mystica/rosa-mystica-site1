// client/src/pages/ProductDetails.jsx
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [zoomStyle, setZoomStyle] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0] || res.data.image || '/no-image.png');
      })
      .catch(err => console.error('Error loading product:', err));
  }, [id]);

  const handleZoom = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundSize: '200%',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50">
      {/* Left side - Images */}
      <div>
        <div
          className="w-full h-80 border rounded bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage: `url(${selectedImage})`,
            ...zoomStyle,
          }}
          onMouseMove={handleZoom}
          onMouseLeave={() => setZoomStyle({})}
        />
        <div className="flex gap-2 mt-2">
          {(product.images?.length > 0 ? product.images : [product.image]).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-16 h-16 object-cover border rounded cursor-pointer ${
                selectedImage === img ? 'ring-2 ring-green-600' : ''
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right side - Info */}
      <div className="col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-green-700">{product.name}</h1>
        <div className="text-lg font-semibold text-green-800">₹{product.price}</div>
        {product.mrp && product.mrp > product.price && (
          <div className="text-sm text-gray-500 line-through">₹{product.mrp}</div>
        )}
        <button
          onClick={() => addToCart(product)}
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
        >
          🛒 Add to Cart
        </button>

        {/* Features */}
        {product.features?.length > 0 && (
          <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-700">
            {product.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        )}

        {/* Description */}
        {product.description && (
          <div className="mt-6 text-sm text-gray-600">
            <h2 className="text-lg font-semibold text-black mb-1">Description:</h2>
            <p>{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
