// client/src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-[#5D001E] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Rosa Mystica India</h4>
          <p className="text-sm text-gray-300">
            Crafting authentic lifestyle and beverage products from Dehradun, Uttarakhand.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Menu</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline text-gray-200">Home</a></li>
            <li><a href="/products" className="hover:underline text-gray-200">Products</a></li>
            <li><a href="/about" className="hover:underline">About Us</a>
</li>
            <li><a href="/cart" className="hover:underline text-gray-200">Cart</a></li>
            <li><a href="/contact" className="hover:underline text-gray-200">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Contact</h4>
          <p className="text-sm text-gray-300">
            76/1, Rajpur Road<br />
            Near Pine Hall School<br />
            Dehradun, Uttarakhand
          </p>
          <p className="mt-2 text-sm text-gray-300">
            Email: <a href="mailto:support@rosamystica.in" className="underline">support@rosamystica.in</a><br />
            Phone: +91 98765 43210
          </p>
        </div>
      </div>

      <div className="text-center text-xs mt-6 text-gray-400">
        © {new Date().getFullYear()} Rosa Mystica India. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
