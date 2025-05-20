// client/src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      {/* Provide global cart state to the entire app */}
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          
          {/* Global Header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-grow">
            <AppRoutes />
          </main>

          {/* Global Footer */}
          <Footer />
          
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
