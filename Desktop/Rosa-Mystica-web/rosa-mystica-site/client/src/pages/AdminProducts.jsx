import { useEffect, useState } from 'react';
import axios from '../utils/axios'; // adjust path as needed


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    price: '',
    mrp: '',
    category: '',
    stock: '',
    description: '',
    features: [''],
    images: ['']
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error loading products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm({ ...form, images: updated });
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };

  const addImageField = () => {
    if (form.images.length < 5) setForm({ ...form, images: [...form.images, ''] });
  };

  const addFeatureField = () => {
    if (form.features.length < 5) setForm({ ...form, features: [...form.features, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        mrp: parseFloat(form.mrp),
        stock: parseInt(form.stock),
      };
      if (isEditing && currentProductId) {
        await axios.put(`http://localhost:5001/api/products/${currentProductId}`, payload);
      } else {
        await axios.post('http://localhost:5001/api/products', payload);
      }
      setForm({ name: '', price: '', mrp: '', category: '', stock: '', description: '', features: [''], images: [''] });
      setIsEditing(false);
      setCurrentProductId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      mrp: product.mrp || '',
      category: product.category,
      stock: product.stock,
      description: product.description || '',
      features: product.features || [''],
      images: product.images || [''],
    });
    setIsEditing(true);
    setCurrentProductId(product._id);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-700">🛠 Manage Products</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setForm({ name: '', price: '', mrp: '', category: '', stock: '', description: '', features: [''], images: [''] });
            setIsEditing(false);
            setCurrentProductId(null);
          }}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          + Add Product
        </button>
      </div>

      <table className="w-full table-auto text-left border">
        <thead className="bg-green-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">₹{p.price}</td>
              <td className="p-2 border">{p.category}</td>
              <td className="p-2 border">{p.stock}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full border p-2 rounded" required />
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded" required />
              <input name="mrp" type="number" value={form.mrp} onChange={handleChange} placeholder="MRP" className="w-full border p-2 rounded" />
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded" required />
              <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock Quantity" className="w-full border p-2 rounded" required />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Long Description" className="w-full border p-2 rounded" rows={3} />

              <div>
                <label className="font-semibold">Image URLs</label>
                {form.images.map((img, i) => (
                  <input
                    key={i}
                    value={img}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    placeholder={`Image ${i + 1}`}
                    className="w-full border p-2 rounded mt-1"
                  />
                ))}
                {form.images.length < 5 && (
                  <button type="button" onClick={addImageField} className="text-sm text-green-600 mt-2">+ Add Image</button>
                )}
              </div>

              <div>
                <label className="font-semibold">Bullet Points</label>
                {form.features.map((feat, i) => (
                  <input
                    key={i}
                    value={feat}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className="w-full border p-2 rounded mt-1"
                  />
                ))}
                {form.features.length < 5 && (
                  <button type="button" onClick={addFeatureField} className="text-sm text-green-600 mt-2">+ Add Bullet Point</button>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                  Save
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="text-gray-600 hover:text-black">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
