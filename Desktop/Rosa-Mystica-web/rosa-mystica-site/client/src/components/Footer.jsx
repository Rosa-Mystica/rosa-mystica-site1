// Footer.jsx
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#5D001E] text-white text-center p-6 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-semibold text-lg mb-2">Rosa Mystica India</h4>
          <p className="text-sm">Crafting premium lifestyle & beverage products in Dehradun.</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Contact Info</h4>
          <p className="text-sm">Email: inforosamysticaindia@gmail.com</p>
          <p className="text-sm">Dehradun, Uttarakhand</p>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-400">© {new Date().getFullYear()} Rosa Mystica India. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
